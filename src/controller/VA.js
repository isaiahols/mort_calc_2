const dataLookUp = require('./DataLookUp');
const Maths = require('./Maths');


const va = {
    vaData(rate, years, state, county) {
        const r = Maths.rateConverter(rate);
        const n = Maths.nperConverter(years);
        const taxRate = dataLookUp.findTaxRate(state, county);
        const insRate = dataLookUp.findInsuranceRate(state);

        const dataPoints = {
            r,
            n,
            insRate,
            taxRate,
            years,
            state,
            county,
        }
        return dataPoints
    },
    // limitsCheck: (state, county, downPmt, data, max) => {
    //     const countyLimit = dataLookUp.findCountyLimit(state, county, 'VA');
    //     const maxValueDP = Maths.maxLoanDPFHA(downPmt);
    //     const maxValueRatio = Maths.pv(data.r, data.n, max);

    //     const maxValue = Math.min(maxValueRatio, countyLimit, maxValueDP);
    // },
    vaFundingFee(vetType, vetUse, ltv, vetDisability, maxPV) {
        let ltvText = ''
        if (ltv > 95) {
            ltvText = ">95"
        } else if (ltv > 90) {
            ltvText = "90.01-95"
        } else {
            ltvText = "<=90"
        }

        const fundingFeeRate = dataLookUp.findVAFundingFee(vetType, vetUse, ltvText)
        const fundingFee = (fundingFeeRate / 100) * maxPV
        // console.log('MAX PV: ', fundingFee)
        return vetDisability ? 0 : fundingFee

    },
    vaCalc2(pv, dp, data, count = 0) {
        // console.log({ pv, dp, data, count })
        const { taxRate, insRate, pmt, hoa, state, county, r, n, vetType, vetUse, vetDisability } = data

        //ltv
        const ltv = dataLookUp.findVaLTV(pv, dp);

        //tax
        let tax = (pv + dp) * taxRate / 12; //Needs Testing

        //ins
        let ins = (pv + dp) * insRate / 12; //Needs Testing

        //Max pAndI
        const pmtNew = pmt - tax - ins - hoa

        const countyLimit = dataLookUp.findCountyLimit(state, county, 'VA');
        // console.log({ countyLimit })
        pv = Maths.pv(r, n, pmtNew)
        // console.log({ pv })
        pv = pv >= countyLimit ? countyLimit : pv;
        // console.log({ pv })

        // BASE CASE //
        if (count > 3) {
            const fundingFee = va.vaFundingFee(vetType, vetUse, ltv, vetDisability, (pv + dp))
            const maxValue = (pv + dp - fundingFee < dp) ? dp : pv + dp - fundingFee
            const monthly = pmtNew + tax + ins + hoa;

            const returnData = {
                maxHomeValue: Math.round(maxValue),
                pAndI: Math.round(pmtNew),
                mortgageInsurance: 0,
                homeInsurance: Math.round(ins),
                tax: Math.round(tax),
                hoa: Math.round(hoa),
                monthly: Math.round(monthly),
            }
            return returnData
        }



        count++
        return va.vaCalc2(pv, dp, data, count)
    },
    async startVACalc(req, res) {
        const {
            years,
            state,
            county,
            credit,
            income,
            debts,
            alimony,
            childSupport,
            childCare,
            hoa,
            downPmt,
            vetType,
            vetUse,
            vetDisability,
        } = req.body
        const { rate } = req.params
        const hoaMonthly = hoa / 12
        const max = Maths.maxPmt(income, debts, alimony, childSupport, childCare, hoaMonthly, 'VA')
        // console.log({ max })
        const data = va.vaData(rate, years, state, county)
        data.credit = credit;
        data.pmt = max;
        data.vetType = vetType;
        data.vetUse = vetUse;
        data.vetDisability = vetDisability;
        data.hoa = hoaMonthly;

        const countyLimit = dataLookUp.findCountyLimit(state, county, 'VA');
        // const maxValueDP = Maths.maxLoanDPVA(downPmt);
        const maxValueRatio = Maths.pv(data.r, data.n, max);

        const maxValue = Math.min(maxValueRatio, countyLimit);

        const result = va.vaCalc2(maxValue, downPmt, data)

        // console.log({ result })
        res.status(200).send({ result })

    }

}



module.exports = va
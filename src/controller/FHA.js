const dataLookUp = require('./DataLookUp');
const Maths = require('./Maths');


const FHA = {
    FHAData(rate, years, state, county) {
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
    //     const countyLimit = dataLookUp.findCountyLimit(state, county, 'FHA');
    //     const maxValueDP = Maths.maxLoanDPFHA(downPmt);
    //     const maxValueRatio = Maths.pv(data.r, data.n, max);

    //     const maxValue = Math.min(maxValueRatio, countyLimit, maxValueDP);
    // },
    FHACalc2(pv, dp, data, count = 0) {

        //ltv
        const ltv = dataLookUp.findLTV(pv, dp);

        //tax
        let tax = (pv + dp) * data.taxRate / 12; //Needs Testing

        //ins
        let ins = (pv + dp) * data.insRate / 12; //Needs Testing

        const foundMI = dataLookUp.findFHAMI(ltv, data.years);
        const mi = (pv * foundMI / 12); // Needs Testing

        //Max pAndI
        const pmtNew = data.pmt - tax - ins - mi - data.hoa

        const countyLimit = dataLookUp.findCountyLimit(data.state, data.county, 'FHA');
        // console.log({ countyLimit })
        pv = Maths.pv(data.r, data.n, pmtNew)
        // console.log({ pv })
        pv = pv >= countyLimit ? countyLimit : pv;
        // console.log({ pv })

        // BASE CASE //
        if (count > 3) {
            const fundingFee = (pv + dp) * .0175
            // console.log(fundingFee)
            const maxValue = (pv + dp - fundingFee < dp) ? dp : pv + dp - fundingFee
            const monthly = pmtNew + tax + mi + ins + data.hoa;

            const returnData = {
                maxHomeValue: maxValue,
                pAndI: Math.round(pmtNew),
                mortgageInsurance: Math.round(mi),
                homeInsurance: Math.round(ins),
                tax: Math.round(tax),
                hoa: Math.round(data.hoa),
                monthly: Math.round(monthly),
            }
            // console.log('end of count', count)
            // console.log('results', maxValue, pv, dp)
            return returnData
        }



        count++
        return FHA.FHACalc2(pv, dp, data, count)
    },
    async startFHACalc(req, res) {
        const {
            years,
            state,
            county,
            credit,
            income,
            debts,
            alimony,
            childSupport,
            childCare = 0,
            hoa,
            downPmt,
        } = req.body
        const { rate } = req.params
        const hoaMonthly = hoa / 12
        const max = Maths.maxPmt(income, debts, alimony, childSupport, childCare, hoaMonthly, 'FHA')
        const data = FHA.FHAData(rate, years, state, county)
        data.credit = credit
        data.pmt = max
        data.hoa = hoaMonthly;

        const countyLimit = dataLookUp.findCountyLimit(state, county, 'FHA');
        const maxValueDP = Maths.maxLoanDPFHA(downPmt);
        const maxValueRatio = Maths.pv(data.r, data.n, max);

        const maxValue = Math.min(maxValueRatio, countyLimit, maxValueDP);

        const result = FHA.FHACalc2(maxValue, downPmt, data)

        // console.log({ result })
        res.status(200).send({ result })

    }

}



module.exports = FHA
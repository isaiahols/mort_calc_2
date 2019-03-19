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
        }
        return dataPoints
    },

    FHACalc2(pv, dp, data, count = 0) {
        console.log({ pv, dp, data, count })

        //ltv
        const ltv = dataLookUp.findLTV(pv, dp);

        //tax
        let tax = (pv + dp) * data.taxRate / 12; //Needs Testing

        //ins
        let ins = (pv + dp) * data.insRate / 12; //Needs Testing

        const foundMI = dataLookUp.findFHAMI(ltv, data.years);
        constmi = (pv * foundMI / 12); // Needs Testing

        //Max P&I
        const pmtNew = data.pmt - tax - ins - mi

        pv = Maths.pv(data.r, data.n, pmtNew)
        console.log({ pv })

        // BASE CASE //
        if (count > 3) {
            const fundingFee = (pv + dp) * .0175
            const maxValue = pv + dp - fundingFee > dp ? dp : pv + dp - fundingFee

            const returnData = {
                maxHomeValue: maxValue,
                'p&i': pmtNew,
                tax,
                mortgageInsurance: mi,
                homeInsurance: ins,
            }
            console.log('end of count', count)
            console.log('results', maxValue, pv, dp)
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
            childCareVA,
            hoa,
            downPmt,
        } = req.body
        const { rate } = req.params
        const max = Maths.maxPmt(income, debts, alimony, childSupport, childCareVA, hoa, 'Conv.')
        const data = FHA.FHAData(rate, years, state, county)
        data.credit = credit
        data.pmt = max

        const countyLimit = dataLookUp.findCountyLimit(state, county, 'Conv.');
        const maxValueDP = Maths.maxLoanDPFHA(downPmt);
        const maxValueRatio = Maths.pv(data.r, data.n, max);

        const maxValue = Math.min(maxValueRatio, countyLimit, maxValueDP);

        const result = FHA.FHACalc2(maxValue, downPmt, data)

        console.log({ result })
        res.status(200).send({ result })

    }

}



module.exports = FHA
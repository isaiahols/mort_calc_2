const dataLookUp = require('./DataLookUp');
const Maths = require('./Maths');


const conventional = {
    convData(rate, years, state, county) {
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

    convCalc2(pv, dp, data, count = 0) {
        console.log({ pv, dp, data, count })

        //ltv
        const ltv = dataLookUp.findLTV(pv, dp); // Needs Testing

        //tax
        let tax = (pv + dp) * data.taxRate / 12; //Needs Testing

        //ins
        let ins = (pv + dp) * data.insRate / 12; //Needs Testing

        //mi?
        let mi = 0
        if (ltv > 80) {
            const foundMI = dataLookUp.findConvMI(data.credit, ltv, data.years);

            mi = (pv * foundMI / 12); // Needs Testing
        }

        //Max P&I
        const pmtNew = data.pmt - tax - ins - mi - data.hoa

        pv = Maths.pv(data.r, data.n, pmtNew)
        console.log({ pv })

        // BASE CASE //
        if (count > 3) {
            const monthly = pmtNew + tax + mi + ins + data.hoa;
            const returnData = {
                maxHomeValue: pv + dp,
                'p&i': pmtNew,
                tax,
                mortgageInsurance: mi,
                homeInsurance: ins,
                hoa: data.hoa,
                monthly,
            }
            console.log('end of count', count)
            console.log('results', pv + dp, pv, dp)
            return returnData
        }



        count++
        return conventional.convCalc2(pv, dp, data, count)
    },
    findMaxPossible() {

    },
    async startConvCalc(req, res) {



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
        const hoaMonthly = hoa / 12

        const max = Maths.maxPmt(income, debts, alimony, childSupport, childCareVA, hoaMonthly, 'Conv.')
        const data = conventional.convData(rate, years, state, county)
        data.credit = credit
        data.pmt = max
        data.hoa = hoaMonthly;
        

        const countyLimit = dataLookUp.findCountyLimit(state, county, 'Conv.');
        const maxValueDP = Maths.maxLoanDP(downPmt);
        const maxValueRatio = Maths.pv(data.r, data.n, max);
        // const pv = Maths.pv(data.r, data.n, max);
        // console.log({ countyLimit, maxValueDP, maxValueRatio, pv })

        const maxValue = Math.min(maxValueRatio, countyLimit, maxValueDP);

        // console.log({ maxValue })


        const result = await conventional.convCalc2(maxValue, downPmt, data)

        console.log({ result })
        res.status(200).send({ result })

    }

}

module.exports = conventional
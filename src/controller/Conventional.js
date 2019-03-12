const dataLookUp = require('./dataLookUp');
const Maths = require('./Maths');


module.exports = {
    convCalc: (rate, years, pv, max, extra, count = 0) => {
        // rate is integer ex. 4
        const r = Maths.rateConverter(rate);
        // years is integer ex. 12
        // n is months 
        const n = Maths.nperConverter(years);
        let mi = 0;

        // const pay = Maths.pmt(r, n, pv)


        const ltv = logic.findLTV(pv, extra.downPmt);
        extra.ltv = ltv;

        if (extra.ltv > 80) {
            extra.miRate = logic.findMI(extra.credit, ltv, extra.years, extra.loanType);
            // console.log("MI rate", extra.miRate)

            mi = (extra.miRate * (pv / 12));
            // console.log("ltv", ltv)
        }


        let tax = (pv + extra.downPmt) * extra.taxRate / 12;
        let insurance = (pv + extra.downPmt) * extra.insureRate / 12;
        let pim = 0;

    },
    convData: (rate, years, state) => {
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

    convCalc2: (pv, dp, data, count) => {

        //ltv
        const ltv = dataLookUp.findLTV(pv, dp); // Needs Testing

        //tax
        let tax = (pv + dp) * data.taxRate / 12; //Needs Testing

        //ins
        let ins = (pv + dp) * data.insRate / 12; //Needs Testing

        //mi?
        let mi = 0
        if (extra.ltv > 80) {
            const foundMI = data.findMI(data.credit, ltv, data.years);

            mi = (pv * foundMI / 12); // Needs Testing
        }

        //Max P&I
        data.pmt = data.pmt - tax - ins - mi

        pv = Maths.pv(r, n, data.pmt)

        // BASE CASE //
        if (count < 3) {
            return pv + dp
        }



        count++
        convCalc2(pv, dp, data, count)
    },
    startConvCalc: async (req, res) => {

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
        } = req.body
        const { rate } = req.params
        const data = convDate(rate, years, state, county)
        data.credit = credit

        const max = Maths.maxPmt(income, debts, alimony, childSupport, childCareVA, hoa, 'Conv.')
        const pv = Maths.pv(data.r, data.n, max);


        const result = Conventional.convCalc2(pv)
        res.status(200).send(result)

    }

}
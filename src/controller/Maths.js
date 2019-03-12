
module.exports = {
    // Tested 
    pv: (rate, nper, pmt) => {
        console.log('rate', rate)
        let r = (rate / 100) / 12
        let n = nper * 12
        let pValue = (pmt * (1 - Math.pow(1 + r, -n))) / r;
        return pValue;
    },
    // Tested
    pmt: (r, n, pv) => {
        return ((pv * r) / (1 - Math.pow(1 + r, -n)))
    },

    maxLoanDP: (dp) => {
        return (dp / .03) - dp
    },
    rateConverter: (rate) => {
        return (rate / 100) / 12
    },

    nperConverter: (nper) => {
        return nper * 12
    },

    maxPmt: (income, debts, alimony, childSupport, childCareVA, hoa, type) => {
        let combinedRatio = .45;
        switch (type) {
            case "FHA":
                combinedRatio = .49
                break;
            case "VA":
                combinedRatio = .48
                break;
            default:
                combinedRatio = .45
                break;
        }
        const maxPayment = (combinedRatio * income) - (debts + alimony + childSupport + childCareVA + hoa);
        return maxPayment;
    }

}
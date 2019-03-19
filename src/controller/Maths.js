
const Maths = {
    // Tested
    pv: (r, n, pmt) => {
        let pValue = (pmt * (1 - Math.pow(1 + r, -n))) / r;
        pValue = Math.round(pValue)
        return pValue;
    },
    // Tested
    pmt: (r, n, pv) => {
        let pmt = ((pv * r) / (1 - Math.pow(1 + r, -n)))
        return Math.round(pmt)
    },
    //
    maxLoanDP: (dp) => {
        return (dp / .03) - dp
    },
    maxLoanDPFHA: (dp) => {
        return (dp / .035) - dp
    },
    // Jest Tested
    rateConverter: (rate) => {
        let r = (rate / 100) / 12
        r = Math.round(r * 100000) / 100000
        return r
    },
    // Jest Tested
    nperConverter: (nper) => {
        let n = nper * 12
        return n
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

module.exports=Maths

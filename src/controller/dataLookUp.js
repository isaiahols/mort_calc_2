const miTable = require('../dataTables/miTable.json');
const taxInsurance = require('../dataTables/taxInsurance.json');
const loanLimits = require('../dataTables/loanLimits.json');
const fhaMiTable = require('../dataTables/fhaMiTable.json');

module.exports = {
    findInsuranceRate: (state = 'Utah') => {
        const stateFiltered = taxInsurance.find(e => {
            return e.State === state
        })

        const insuranceRate = stateFiltered.Insurance.slice(0, 4) / 100

        return insuranceRate || 0
    },
    findTaxRate: (state) => {
        const stateFiltered = taxInsurance.find(e => {
            return e.State === state
        })

        const taxRate = stateFiltered.Tax.slice(0, 4) / 100

        return taxRate
    },
    findCountyLimit: (state, county, type) => {
        const searchTerm = `${state} - ${county.toUpperCase()}`;
        const foundCounty = loanLimits.find(e => {

            return e.County === searchTerm
        })
        if (type === 'Conv.') {
            type = 'Conforming'
        }

        let limit = foundCounty[type] * 1

        return limit
    },
    // Jest Tested
    findLTV: (maxValue, downPmt) => {
        let ltv = maxValue / (maxValue + (downPmt * 1));

        ltv = +(ltv * 100).toFixed(2)
        if (ltv > 97) {
            console.log('LTV is too high', ltv);
            return NaN
        }

        return ltv
    },
    findConvMI: (credit, ltv, years) => {
        const creditFiltered = miTable.filter(e => {

            if (e.Credit.slice(0, 3) === credit.slice(0, 3)) {
                return e
            }
        })

        // finds specific rate based on LTV range
        const ltvFiltered = creditFiltered.find(e => {
            const ltvRange = e["LTV Range"].split('');

            let upperLimit = ltvRange.slice(6).join('') * 1;
            let lowerLimit = ltvRange.slice(0, 5).join('') * 1;

            // console.log({ ltv, upperLimit, lowerLimit })
            if (ltv <= upperLimit && ltv >= lowerLimit) {
                return e
            }
        })
        // console.log({ ltvFiltered })

        // get rate based on length of loan
        let rate = years <= 20 ? ltvFiltered["<= 20 yr"] : ltvFiltered["> 20 yr"];
        rate = rate.slice(0, 4) / 100
        return rate
    },
    findFHAMI: (ltv, years) => {
        const yearRange = years <= 15 ? '<=15' : '>15';
        const yearFiltered = fhaMiTable.find((el) => el.years === yearRange)

        let ltvRange = ""
        if (years > 15) {
            ltvRange = ltv > 95 ? '>95' : '<=95'
        } else {
            ltvRange = ltv > 90 ? '>90' : '<=90'
        }

        const rate = yearFiltered.ltv[ltvRange] * 100 / 10000
        return rate
    }
}
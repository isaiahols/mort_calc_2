const DLU = require('../src/controller/DataLookUp');

describe('Testing Find Insurance Rate Function', () => {
    test('returns a number', () => {
        const state = 'Utah'
        expect(typeof DLU.findInsuranceRate(state)).toBe('number')
    })
    test('returns correct rate for State: Utah', () => {
        const state = 'Utah'
        expect(DLU.findInsuranceRate(state)).toBe(0.0027)
    })
    test('returns correct rate for State: Idaho', () => {
        const state = 'Idaho'
        expect(DLU.findInsuranceRate(state)).toBe(0.0027)
    })
    test('returns correct rate for State: Colorado', () => {
        const state = 'Colorado'
        expect(DLU.findInsuranceRate(state)).toBe(0.006)
    })
    test('returns correct rate for State: Missouri', () => {
        const state = 'Missouri'
        expect(DLU.findInsuranceRate(state)).toBe(0.0075)
    })
    test('returns correct rate for State: Kansas', () => {
        const state = 'Kansas'
        expect(DLU.findInsuranceRate(state)).toBe(0.008)
    })
    test('returns correct rate for State: Oregon', () => {
        const state = 'Oregon'
        expect(DLU.findInsuranceRate(state)).toBe(0.0027)
    })
    test('returns rate of Utah as default if nothing is passed in', () => {
        const state = 'Utah'
        expect(DLU.findInsuranceRate()).toBe(0.0027)
    })
})

describe('Testing Find Tax Rate Function', () => {
    test('returns a number', () => {
        const state = 'Utah'
        expect(typeof DLU.findTaxRate(state)).toBe('number')
    })
    test('returns correct rate for State: Utah', () => {
        const state = 'Utah'
        expect(DLU.findTaxRate(state)).toBe(0.008)
    })
    test('returns correct rate for State: Idaho', () => {
        const state = 'Idaho'
        expect(DLU.findTaxRate(state)).toBe(0.0077)
    })
    test('returns correct rate for State: Colorado', () => {
        const state = 'Colorado'
        expect(DLU.findTaxRate(state)).toBe(0.0057)
    })
    test('returns correct rate for State: Missouri', () => {
        const state = 'Missouri'
        expect(DLU.findTaxRate(state)).toBe(0.01)
    })
    test('returns correct rate for State: Kansas', () => {
        const state = 'Kansas'
        expect(DLU.findTaxRate(state)).toBe(0.014)
    })
    test('returns correct rate for State: Oregon', () => {
        const state = 'Oregon'
        expect(DLU.findTaxRate(state)).toBe(0.008)
    })
    test('returns rate of Utah as default if nothing is passed in', () => {
        const state = 'Utah'
        expect(DLU.findTaxRate()).toBe(0.008)
    })
})

describe('Test County Limit finding function', () => {
    test('should return number', () => {
        const state = 'Utah';
        const county = 'Salt Lake';
        const type = 'Conv.';
        expect(typeof DLU.findCountyLimit(state, county, type)).toBe('number')
    })
    test('should return correct result conv.', () => {
        const state = 'Utah';
        const county = 'Salt Lake';
        const type = 'Conv.';
        expect(DLU.findCountyLimit(state, county, type)).toBe(600300)
    })
    test('should return correct result conv.', () => {
        const state = 'Idaho';
        const county = 'ADAMS';
        const type = 'Conv.';
        expect(DLU.findCountyLimit(state, county, type)).toBe(453100)
    })
    test('should return number', () => {
        const state = 'Utah';
        const county = 'Salt Lake';
        const type = 'FHA';
        expect(typeof DLU.findCountyLimit(state, county, type)).toBe('number')
    })
    test('should return correct result FHA', () => {
        const state = 'Utah';
        const county = 'Salt Lake';
        const type = 'FHA';
        expect(DLU.findCountyLimit(state, county, type)).toBe(356500)
    })
    test('should return correct result FHA', () => {
        const state = 'Idaho';
        const county = 'ADAMS';
        const type = 'FHA';
        expect(DLU.findCountyLimit(state, county, type)).toBe(294515)
    })
    test('should return number', () => {
        const state = 'Utah';
        const county = 'Salt Lake';
        const type = 'VA';
        expect(typeof DLU.findCountyLimit(state, county, type)).toBe('number')
    })
    test('should return correct result VA', () => {
        const state = 'Utah';
        const county = 'Salt Lake';
        const type = 'VA';
        expect(DLU.findCountyLimit(state, county, type)).toBe(600300)
    })
    test('should return correct result VA', () => {
        const state = 'Idaho';
        const county = 'ADAMS';
        const type = 'VA';
        expect(DLU.findCountyLimit(state, county, type)).toBe(453100)
    })
    test('should return number', () => {
        const state = 'Utah';
        const county = 'Salt Lake';
        const type = 'Jumbo';
        expect(typeof DLU.findCountyLimit(state, county, type)).toBe('number')
    })
    test('should return correct result Jumbo', () => {
        const state = 'Utah';
        const county = 'Salt Lake';
        const type = 'Jumbo';
        expect(DLU.findCountyLimit(state, county, type)).toBe(1000000)
    })
    test('should return correct result Jumbo', () => {
        const state = 'Idaho';
        const county = 'ADAMS';
        const type = 'Jumbo';
        expect(DLU.findCountyLimit(state, county, type)).toBe(1000000)
    })

})

describe('Testing LTV Finding Function', () => {
    test('returns a number', () => {
        const maxValue = 500000;
        const downPmt = 25000
        expect(typeof DLU.findLTV(maxValue, downPmt)).toBe('number')
    })
    test('returns NaN if LTV too high', () => {
        const maxValue = 500000;
        const downPmt = 2000
        expect(Number.isNaN(DLU.findLTV(maxValue, downPmt))).toBe(true)
    })
    test('returns correct LTV', () => {
        const maxValue = 500000;
        const downPmt = 25000
        expect(DLU.findLTV(maxValue, downPmt)).toBe(95.24)
    })
    test('returns correct LTV', () => {
        const maxValue = 250000;
        const downPmt = 8750
        expect(DLU.findLTV(maxValue, downPmt)).toBe(96.62)
    })
})

describe('Testing VA LTV Finding Function', () => {
    test('returns a number', () => {
        const maxValue = 500000;
        const downPmt = 25000
        expect(typeof DLU.findVaLTV(maxValue, downPmt)).toBe('number')
    })
    test('returns NaN if LTV too high', () => {
        const maxValue = 500000;
        const downPmt = -2000
        expect(Number.isNaN(DLU.findVaLTV(maxValue, downPmt))).toBe(true)
    })
    test('returns correct LTV', () => {
        const maxValue = 500000;
        const downPmt = 25000
        expect(DLU.findVaLTV(maxValue, downPmt)).toBe(95.24)
    })
    test('returns correct LTV', () => {
        const maxValue = 250000;
        const downPmt = 8750
        expect(DLU.findVaLTV(maxValue, downPmt)).toBe(96.62)
    })
})

describe('Testing Conv MI Function', () => {
    test('returns a number', () => {
        const credit = "620-639"
        const ltv = 88
        const years = 30
        expect(typeof DLU.findConvMI(credit, ltv, years)).toBe('number')
    })
    test('returns correct number for credit: 630, ltv: 88, years: 30', () => {
        const credit = "620-639"
        const ltv = 88
        const years = 30
        expect(DLU.findConvMI(credit, ltv, years)).toBe(.0094)
    })
    test('returns correct number for credit: 750 ltv: 96 years: 30', () => {
        const credit = "740-759"
        const ltv = 96
        const years = 30
        expect(DLU.findConvMI(credit,ltv, years)).toBe(.007)
    })
            test('returns correct number for credit: 740 ltv: 92 years: 30', () => {
                const credit = "740-759"
                const ltv = 73.1
                const years = 30
                expect(DLU.findConvMI(credit, ltv, years)).toBe(.002)
            })
    test('returns correct number for credit: 765, ltv: 83, years: 15', () => {
        const credit = ">=760"
        const ltv = 83
        const years = 15
        expect(DLU.findConvMI(credit ,ltv, years)).toBe(.0014)
    })
})

describe('Testing FHA MI Function', () => {
    test('returns a number', () => {
        const ltv = 88
        const years = 30
        expect(typeof DLU.findFHAMI(ltv, years)).toBe('number')
    })
    test('returns correct number for ltv: 88 years:30', () => {
        const ltv = 88
        const years = 30
        expect(DLU.findFHAMI(ltv, years)).toBe(.0080)
    })
    test('returns correct number for ltv: 96 years:30', () => {
        const ltv = 96
        const years = 30
        expect(DLU.findFHAMI(ltv, years)).toBe(.0085)
    })
    test('returns correct number for ltv: 76 years:10', () => {
        const ltv = 76
        const years = 10
        expect(DLU.findFHAMI(ltv, years)).toBe(.0045)
    })
    test('returns correct number for ltv: 92 years:10', () => {
        const ltv = 92
        const years = 10
        expect(DLU.findFHAMI(ltv, years)).toBe(.0070)
    })
})

describe('Testing VA Funding Fee Finding Function', () => {
    test('returns a number', () => {
        const vetType = "Regular Military"
        const vetUse = "first"
        const ltvType = "90.01-95"

        expect(typeof DLU.findVAFundingFee(vetType, vetUse, ltvType)).toBe('number')
    })
    test('returns correct VA Fee for type: reg, use: first', () => {
        const vetType = "Regular Military"
        const vetUse = "first"
        const ltvType = "90.01-95"

        expect(DLU.findVAFundingFee(vetType, vetUse, ltvType)).toBe(1.50)
    })
    test('returns correct VA Fee for type: reg, use: second', () => {
        const vetType = "Regular Military"
        const vetUse = "second+"
        const ltvType = "<=90"

        expect(DLU.findVAFundingFee(vetType, vetUse, ltvType)).toBe(1.25)
    })
    test('returns correct VA Fee for type: reserve, use: first', () => {
        const vetType = "Reserves/Guard"
        const vetUse = "first"
        const ltvType = "90.01-95"

        expect(DLU.findVAFundingFee(vetType, vetUse, ltvType)).toBe(1.75)
    })
    test('returns correct VA Fee for type: reserve, use: second', () => {
        const vetType = "Reserves/Guard"
        const vetUse = "second+"
        const ltvType = ">95"

        expect(DLU.findVAFundingFee(vetType, vetUse, ltvType)).toBe(3.3)
    })
})

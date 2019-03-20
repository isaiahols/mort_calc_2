const DLU = require('../src/controller/DataLookUp');

describe('Testing Find Insurance Rate Function', () => {
    test('returns a number', () => {
        const state = 'Utah'
        expect(typeof DLU.findInsuranceRate(state)).toBe('number')
    })
    // test('returns a 0 if passed data is wrong', () => {
    //     const state = 'Utah'
    //     expect(DLU.findInsuranceRate()).toBe(0)
    // })
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

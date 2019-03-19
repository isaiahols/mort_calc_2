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
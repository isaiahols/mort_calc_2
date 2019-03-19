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


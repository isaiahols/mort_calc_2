const Maths = require('../src/controller/Maths')


describe('testing Converters', ()=>{
    test(`rate Converter is accurate for rate:4`, () => {
        expect(Maths.rateConverter(4)).toBe(0.00333)
    })
    test(`rate Converter is accurate for rate:3`, () => {
        expect(Maths.rateConverter(3)).toBe(0.00250)
    })
    test(`nper converter is accurate`, () => {
        expect(Maths.nperConverter(10)).toBe(120)
    })
})

describe('Testing Present Value', ()=>{
    test(`pv returns a positive value`, () => {
        let r = Maths.rateConverter(4)
        let n = Maths.nperConverter(10)
        expect(Maths.pv(r, n, 1300)).toBeGreaterThan(0)
    })
    test(`returns accurate value for rate: 4, years:10, pmt:2900`, () => {
        let r = Maths.rateConverter(4)
        let n = Maths.nperConverter(10)
        expect(Maths.pv(r, n, 2900)).toBe(286487)
    })
    test(`returns accurate value for rate: 3, years:15, pmt:1500`, () => {
        let r = Maths.rateConverter(3)
        let n = Maths.nperConverter(15)
        expect(Maths.pv(r, n, 1500)).toBe(217208)
    })
    // test(`returns accurate value for rate: 7, years:45, pmt:5000`, () => {
    //     let r = Maths.rateConverter(7)
    //     let n = Maths.nperConverter(45)
    //     expect(Maths.pv(r, n, 5000)).toBe(829974)
    // })
})

describe('Testing PMT', ()=>{
    test(`returns a number`, () => {
        let r = Maths.rateConverter(4)
        let n = Maths.nperConverter(10)
        expect(typeof Maths.pmt(r, n, 286972)).toBe('number')
    })
    // test(`pmt is accurate`, () => {
    //     let r = Maths.rateConverter(4)
    //     let n = Maths.nperConverter(10)
    //     expect(Maths.pmt(r, n, 286972)).toBeCloseTo(2900,0)
    // })
    // test(`pmt is accurate`, () => {
    //     let r = Maths.rateConverter(4)
    //     let n = Maths.nperConverter(10)
    //     expect(Maths.pmt(r, n, 286972)).toBeCloseTo(2900,0)
    // })
})


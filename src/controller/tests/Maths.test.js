const Maths = require('../Maths')

test(`pv returns a value`, () => {
    expect(Maths(4, 10, 2900).toBe(5))
})
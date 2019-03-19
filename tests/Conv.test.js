const conv = require('../src/controller/Conventional')

describe('ConvData Tests', () => {
    test(`returns a truthy value`, () => {
        expect(conv.convData(3, 10, 'Utah', "Salt Lake")).toBeTruthy()
    })
    test(`returns object with r on it`, () => {
        expect(conv.convData(3, 10, 'Utah', "Salt Lake").r).toBeTruthy()
    })
})
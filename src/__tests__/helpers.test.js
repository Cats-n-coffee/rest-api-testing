const { randomId } = require('../helpers/other');

test('Two generated id should not be equal', () => {
    expect(randomId()).not.toBe(randomId())
})
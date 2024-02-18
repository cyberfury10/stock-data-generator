const {
    randomIntFromInterval,
    generateRandomSplit
} = require("../util")

describe("Util tests", () => {

    test("Test randomIntFromInterval between 100 and 1000", () => {
        const min = 100
        const max = 1000

        for (let i = 0; i < 1000; i++) {
            const randomNumber = randomIntFromInterval(min, max, 0)
            expect(randomNumber).toBeLessThanOrEqual(max)
            expect(randomNumber).toBeGreaterThanOrEqual(min)
        }
    })


    test("Test randomIntFromInterval between 10.5 and 20.5", () => {
        const min = 10.5
        const max = 20.5

        let decimalsCounts = 0
        for (let i = 0; i < 1000; i++) {
            const randomNumber = randomIntFromInterval(min, max)

            const hasDecimal = randomNumber.toString().includes(".")
            if (hasDecimal) {
                decimalsCounts++
            }

            expect(randomNumber).toBeLessThanOrEqual(max)
            expect(randomNumber).toBeGreaterThanOrEqual(min)
        }
        expect(decimalsCounts > 10).toBe(true)
    })
})


describe("generateRandomSplit tests", () => {

    test("Test generateRandomSplit with invalid inputs", () => {
        expect(generateRandomSplit(-1, 5)).toBeUndefined()
        expect(generateRandomSplit(5, -1)).toBeUndefined()
    })

    test("Test generateRandomSplit with valid inputs", () => {
        const number = 500
        const length = 10

        for (let i = 0; i < 10; i++) {
            const result = generateRandomSplit(number, length)

            // Check if the length of the returned array matches the input length
            expect(result.length).toBe(length)

            // Check if the sum of the elements in the returned array matches the input number
            const sum = result.reduce((a, b) => a + b, 0)
            expect(sum).toBe(number)
        }
    })

    test("Test generateRandomSplit returns non-negative numbers", () => {
        const number = 500
        const length = 10

        const result = generateRandomSplit(number, length)

        // Check if all elements in the returned array are non-negative
        for (let i = 0; i < result.length; i++) {
            expect(result[i]).toBeGreaterThanOrEqual(0)
        }
    })

    test("Test generateRandomSplit returns different results for different calls", () => {
        const number = 500
        const length = 10

        const result1 = generateRandomSplit(number, length)
        const result2 = generateRandomSplit(number, length)

        // Check if the results of two different calls are not the same
        expect(result1).not.toEqual(result2)
    })
})
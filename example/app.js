const { generateRandomFlatData, generateCandleStickData } = require("../index")

const config = {
  startDateTime: "2000-01-01T09:15:00.000Z",
  startPrice: 180, // start price of the stock
  noOfDays: 3, // Number of days
  tradeHoursPerDay: 6,
  changeBy: 0.05, // share's minimum price change
  maxDailyChangePercent: {
    min: 1.5,
    max: 3.5,
  }, // Daily percentage of stock, in this case share price can vary from 1.5% to 3.5%
}

// accepted interval = 1m, 5m 15m 30m 1h 1d
const result = generateCandleStickData(config, "5m")

// prints the candle stick data with given interval
console.log(result)

// sample output
// [
//   {
//     dateTime: '2000-01-01T11:14:59.000Z',
//     open: 180.1,
//     close: 180.15,
//     high: 182.15,
//     low: 179.65,
//     change: 1.37
//   },
//   ...
// ]


const randomFlatData = generateRandomFlatData(config)
// prints seconds wise price change
console.log(randomFlatData)

// Sample output
// [
//   { date: 2000-01-01T09:15:00.000Z, price: 180 },
//   { date: 2000-01-01T09:15:01.000Z, price: 179.95 },
//   { date: 2000-01-01T09:15:02.000Z, price: 179.9 },
//   { date: 2000-01-01T09:15:03.000Z, price: 179.9 },
//   { date: 2000-01-01T09:15:04.000Z, price: 179.9 },
//   { date: 2000-01-01T09:15:05.000Z, price: 179.95 },
//   ...
// ]
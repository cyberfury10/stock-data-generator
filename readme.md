<span style="color:red"> **Note - This is just a program which generates random price data based on the parameters provided. Real-world stock market data is much more complex and involves many more factors than just random fluctuations. Use it at your own discretion** </span>

This library exposes Two methods

|Method |
| --- | 
| generateRandomFlatData(config) |
| generateCandleStickData(config, interval, flatData (optional)) |

Config

| Key |  sample value |value | required|
| --- | --- | --- | --- |
|startDateTime | "2000-01-01T09:15:00.000Z" |Date string | required|
| startPrice | 180|start price of the stock | required|
| noOfDays | 8 | Number of days |required|
| tradeHoursPerDay| 6 | Number of trading hours | required|
| changeBy| 0.05 |Share's minimum price change | required|
|maxDailyChangePercent|  { min: 1.5, max: 3.5} | Expects a range, between which, a day's change would be picked by random, with sample value a day's change would be something like 1.6%, 2.4%, 3.1% etc., | optional (when skipped range becomes random) |

More Description

| Key |  sample value |value |
| --- | --- | --- |
| changeBy| 0.05 |  This is kind of minimum step change, lets say if price is $10 considering 0.05 sample value $10.05, $10.10 are valid increments and decrements | 
| maxDailyChangePercent | { min: 1.5, max: 3.5} | Expects a range, between which day's change would be picked by random |

Interval param for  ``` generateCandleStickData(config, interval) ```

| Interval | Description|
| --- | --- |
| 1m | 1 minute |
| 5m | 5 minute |
| 15m | 15 minute |
| 30m | 30 minute |
| 1h | 1 hour |
| 1d | 1 day |

Example:

```
const { generateRandomFlatData, generateCandleStickData } = require("mock-stock-data")

// sample config object
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
```

// accepted interval = 1m, 5m 15m 30m 1h 1d
const result = generateCandleStickData(config, "5m")
or
const result = generateCandleStickData(config, "5m", randomFlatData)

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
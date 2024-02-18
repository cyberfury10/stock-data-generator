const {
  p,
  differenceByPercentage,
  getRandomStep,
  randomIntFromInterval,
  generateRandomSplit,
  validateConfig,
  isNil,
} = require("./util")

/**
 * Just pass in the config and generates seconds wise data for entire duration
 */
function generateRandomFlatData(config) {
  validateConfig(config)
  const {
    maxDailyChangePercent = undefined,
    noOfDays,
    changeBy = 0.05,
    startDateTime,
    startPrice,
    tradeHoursPerDay,
  } = config

  const result = []
  const perDayEpoch = 86400
  let randomDailyPercent = 0

  const startTimeInEpoch = new Date(startDateTime).getTime() / 1000
  const upTo = startTimeInEpoch + tradeHoursPerDay * 60 * 60
  let price = startPrice
  for (let day = 1; day <= noOfDays; day++) {
    const daysCountInEpoch = day * perDayEpoch - perDayEpoch

    let [low, high] = [price, price]

    if (maxDailyChangePercent) {
      randomDailyPercent = randomIntFromInterval(maxDailyChangePercent.min, maxDailyChangePercent.max)
    }

    for (let i = startTimeInEpoch; i < upTo; i++) {
      const time = (i + daysCountInEpoch) * 1000
      const iterationDate = new Date(time)

      let isOutOfRange = false

      low = Math.min(low, price)
      high = Math.max(high, price)
      const differencePercent = 100 - (low / high) * 100
      isOutOfRange = differencePercent > randomDailyPercent

      const randomStep = getRandomStep()
      if (randomStep === 1) {
        price += changeBy
        if (isOutOfRange && price > high) {
          price += -changeBy
        }
      } else if (randomStep === 2) {
        price += -changeBy
        if ((isOutOfRange && price < low) || price === 0) {
          price += changeBy
        }
      }
      result.push({
        date: iterationDate,
        price: p(price),
      })
    }
  }
  return result
}

/**
 * 1m
 * 5m
 * 15m
 * 30m
 * 1h
 * 1d
 */
function generateCandleStickData(config, interval = "1m", flatData = undefined) {
  const hasVolumeConfig = !isNil(config.volumeRange)
  if (flatData === undefined) {
    flatData = generateRandomFlatData(config)
  }
  let perDayChunk = 0
  let durationInSeconds = 0
  switch (interval) {
    case "1m":
      durationInSeconds = 60
      perDayChunk = config.tradeHoursPerDay * 60
      break
    case "5m":
      durationInSeconds = 60 * 5
      perDayChunk = config.tradeHoursPerDay * 12
      break
    case "15m":
      durationInSeconds = 60 * 15
      perDayChunk = config.tradeHoursPerDay * 4
      break
    case "30m":
      durationInSeconds = 60 * 30
      perDayChunk = config.tradeHoursPerDay * 2
      break
    case "1h":
      durationInSeconds = 60 * 60
      perDayChunk = config.tradeHoursPerDay
      break
    case "1d":
      durationInSeconds = 60 * 60 * config.tradeHoursPerDay
      perDayChunk = 1
      break
    default:
      durationInSeconds = 60
      perDayChunk = config.tradeHoursPerDay / 60
  }

  let chunkSize = durationInSeconds
  perDayChunk *= chunkSize

  if (flatData.length < durationInSeconds) {
    chunkSize = flatData.length
  }

  let volumes = null
  let dailyVolume = null
  const candleStickData = []
  for (let i = 0, j = 0; i < flatData.length; i += chunkSize) {


    const chunk = flatData.slice(i, i + chunkSize)
    const data = constructCandleStickData(chunk)

    // if chunkSize is greater than perDayChunk then reset the j
    // so that we can generate new volume for the next day
    if ((j * chunkSize) === perDayChunk) {
      j = 0
    }
    if (hasVolumeConfig) {
      if (j === 0) {
        dailyVolume = randomIntFromInterval(config.volumeRange.min, config.volumeRange.max, 0)
        volumes = generateRandomSplit(dailyVolume, perDayChunk / chunkSize)
      }
      data.volume = volumes[j]
      j++
    }

    candleStickData.push(data)
  }
  return candleStickData
}

function constructCandleStickData(flatData) {
  let high = Number.MIN_VALUE
  let low = Number.MAX_VALUE
  for (const data of flatData) {
    low = Math.min(data.price, low)
    high = Math.max(data.price, high)
  }
  return {
    dateTime: flatData[flatData.length - 1].date,
    open: flatData[0].price,
    close: flatData[flatData.length - 1].price,
    high: high,
    low: low,
    change: differenceByPercentage(low, high),
  }
}

module.exports = {
  generateRandomFlatData,
  generateCandleStickData,
}

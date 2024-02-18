const { generateRandomFlatData, generateCandleStickData } = require("../index")

const config = {
  startDateTime: "2000-01-01T09:15:00.000Z",
  startPrice: 180, // price
  noOfDays: 3, // days
  tradeHoursPerDay: 6,
  changeBy: 0.05, // share's minimum price change
  maxDailyChangePercent: {
    min: 1.5,
    max: 3.5,
  }, // percentage
}

const configWithVolume = {
  startDateTime: "2000-01-01T09:15:00.000Z",
  startPrice: 180, // price
  noOfDays: 3, // days
  tradeHoursPerDay: 6,
  changeBy: 0.05, // share's minimum price change
  maxDailyChangePercent: {
    min: 1.5,
    max: 3.5,
  }, // percentage
  volumeRange: {
    min: 30000,
    max: 31000
  }
}

describe("Running tests for generateRandomFlatData", () => {
  const result = generateRandomFlatData(config)

  test("Test count", () => {
    const count = config.tradeHoursPerDay * 60 * 60 * config.noOfDays
    expect(result.length).toBe(count)
  })
})

describe("Running tests for generateCandleStickData count", () => {
  function assertLength(candleStickData, duration) {
    const count = (60 / duration) * configWithVolume.tradeHoursPerDay * configWithVolume.noOfDays
    expect(candleStickData.length).toBe(count)
  }
  test("Test count for 1m", () => {
    const result = generateCandleStickData(config, "1m")
    assertLength(result, 1)
  })
  test("Test count for 5m", () => {
    const result = generateCandleStickData(config, "5m")
    assertLength(result, 5)
  })
  test("Test count for 15m", () => {
    const result = generateCandleStickData(config, "15m")
    assertLength(result, 15)
  })
  test("Test count for 30m", () => {
    const result = generateCandleStickData(config, "30m")
    assertLength(result, 30)
  })
  test("Test count for 1h", () => {
    const result = generateCandleStickData(config, "1h")
    assertLength(result, 60)
  })
  test("Test count for 1d", () => {
    const result = generateCandleStickData(config, "1d")
    const count = config.noOfDays
    expect(result.length).toBe(count)
  })
})

describe("Running tests for generateCandleStickData with volumes", () => {
  function assertVolumeCount(candleStickData) {
    const volumeCount = getDateWiseVolumeCount(candleStickData)
    for (const date in volumeCount) {
      expect(volumeCount[date]).toBeLessThanOrEqual(configWithVolume.volumeRange.max)
      expect(volumeCount[date]).toBeGreaterThanOrEqual(configWithVolume.volumeRange.min)
    }
  }

  function assertLength(candleStickData, duration) {
    const count = (60 / duration) * configWithVolume.tradeHoursPerDay * configWithVolume.noOfDays
    expect(candleStickData.length).toBe(count)
  }

  test("Test count for 1m", () => {
    const result = generateCandleStickData(configWithVolume, "1m")
    assertLength(result, 1)
    assertVolumeCount(result)
  })
  test("Test count for 5m", () => {
    const result = generateCandleStickData(configWithVolume, "5m")
    assertLength(result, 5)
    assertVolumeCount(result)
  })
  test("Test count for 15m", () => {
    const result = generateCandleStickData(configWithVolume, "15m")
    assertLength(result, 15)
    assertVolumeCount(result)
  })
  test("Test count for 30m", () => {
    const result = generateCandleStickData(configWithVolume, "30m")
    assertLength(result, 30)
    assertVolumeCount(result)
  })
  test("Test count for 1h", () => {
    const result = generateCandleStickData(configWithVolume, "1h")
    assertLength(result, 60)
    assertVolumeCount(result)
  })
  test("Test count for 1d", () => {
    const result = generateCandleStickData(configWithVolume, "1d")
    const count = configWithVolume.noOfDays
    expect(result.length).toBe(count)
  })
})

describe("Test date in generateCandleStickData", () => {
  test("Check dates generated", () => {
    const result = generateCandleStickData(config, "1h")
    const dateSet = new Set()
    for (const item of result) {
      dateSet.add(new Date(item.dateTime).toISOString().split("T")[0])
    }
    const count = config.noOfDays
    expect(dateSet.size).toBe(count)

    const expectedDates = ["2000-01-01", "2000-01-02", "2000-01-03"]
    let i = 0
    for (const date of dateSet.values()) {
      expect(date).toBe(expectedDates[i++])
    }
  })
})

describe("Test validation", () => {
  test("check noOfDays", () => {
    try {
      const config = {
        startDateTime: "2000-01-01T09:15:00.000Z",
        startPrice: 180, // price
        tradeHoursPerDay: 6,
        noOfDays: 0, // days
        changeBy: 0.05, // share's minimum price change
        maxDailyChangePercent: {
          min: 1.5,
          max: 3.5,
        }, // percentage
      }
      generateCandleStickData(config, "1h")
      expect(true).toBe(false)
    } catch (e) {
      expect(e.message).toBe("Number of days cannnot be 0 or undefined")
    }
  })

  test("Precision cannnot be 0", () => {
    try {
      const config = {
        startDateTime: "2000-01-01T09:15:00.000Z",
        startPrice: 180, // price
        noOfDays: 3, // days
        tradeHoursPerDay: 6,
        changeBy: 0, // share's minimum price change
        maxDailyChangePercent: {
          min: 1.5,
          max: 3.5,
        }, // percentage
      }
      generateCandleStickData(config, "1h")
      expect(true).toBe(false)
    } catch (e) {
      expect(e.message).toBe("precision cannnot be 0 or undefined")
    }
  })

  test("startPrice cannnot be 0", () => {
    try {
      const config = {
        startDateTime: "2000-01-01T09:15:00.000Z",
        startPrice: 0, // price
        tradeHoursPerDay: 6,
        noOfDays: 3, // days
        changeBy: 0.05, // share's minimum price change
        maxDailyChangePercent: {
          min: 1.5,
          max: 3.5,
        }, // percentage
      }
      generateCandleStickData(config, "1h")
      expect(true).toBe(false)
    } catch (e) {
      expect(e.message).toBe("startPrice cannnot be 0 or undefined")
    }
  })
})

describe("Test date in generateCandleStickData", () => {
  test("Check dates generated", () => {
    const result = generateCandleStickData(config, "1h")
    const dateSet = new Set()
    for (const item of result) {
      dateSet.add(new Date(item.dateTime).toISOString().split("T")[0])
    }
    const count = config.noOfDays
    expect(dateSet.size).toBe(count)

    const expectedDates = ["2000-01-01", "2000-01-02", "2000-01-03"]
    let i = 0
    for (const date of dateSet.values()) {
      expect(date).toBe(expectedDates[i++])
    }
  })
})

describe("Test date in generateCandleStickData", () => {
  test("Validate % of percentage throw error", () => {
    const config = {
      startDateTime: "2000-01-01T09:15:00.000Z",
      startPrice: 180, // price
      noOfDays: 3, // days
      tradeHoursPerDay: 6,
      changeBy: 0.05, // share's minimum price change
    }
    try {
      const result = generateCandleStickData(config, "1h")
      const change = 3.5 - 1.5 + config.changeBy * 2
      for (const item of result) {
        if (item.change > change) {
          throw Error("expected")
        }
      }
    } catch (err) {
      expect(err.message).toBe("expected")
    }
  })

  test("Validate % of percentage change", () => {
    const result = generateCandleStickData(config, "1d")

    for (const item of result) {
      expect(item.change).toBeLessThan(3.51)
      expect(item.change).toBeGreaterThan(1.49)
    }
  })
})


describe("Running tests for generateCandleStickData with flatData", () => {
  const flatData = generateRandomFlatData(config)
  const result = generateCandleStickData(config, "1m", flatData)

  test("Test count", () => {
    const count = (60 / 1) * config.tradeHoursPerDay * config.noOfDays
    expect(result.length).toBe(count)
  })
})

function getDateWiseVolumeCount(candleStickData) {
  const volumeCount = {}
  for (const item of candleStickData) {
    const date = item.dateTime.toISOString().substring(0, 10)
    if (volumeCount[date] === undefined) {
      volumeCount[date] = 0
    }
    volumeCount[date] += item.volume
  }
  return volumeCount
}
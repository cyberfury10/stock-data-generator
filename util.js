function p(num, decimalPlaces = 2) {
  return +num.toFixed(decimalPlaces)
}

function differenceByPercentage(num1, num2) {
  const min = Math.min(num1, num2)
  const max = Math.max(num1, num2)
  return p(100 - (min / max) * 100)
}

function getRandomStep() {
  const min = Math.ceil(1);
  const max = Math.floor(3);
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// min and max included
function randomIntFromInterval(min, max, precision = 2) {
  if (max < min) {
    throw Error("max should be greater than min")
  }
  const interval = max - min
  const randomNumber = Math.random() * interval
  return p(min + randomNumber, precision)
}

function generateRandomSplit(number, length) {
  if (number <= 0 || length < 0) {
    console.log("Invalid input. M must be greater than zero and N must be non-negative.");
    return;
  }
  let summation = 0
  let result = new Array(length);
  // Fill the array of length with random numbers below 100 to start with
  for (let i = 0; i < result.length; i++) {
    result[i] = Math.floor((Math.random() * 100));
    summation += result[i]
  }

  for (; ;) {
    const randomIndex = Math.floor((Math.random() * length))
    const randomIncrement = Math.floor((Math.random() * (number / length)))
    if (result[randomIndex] !== 0) {
      summation -= result[randomIndex]
    }

    result[randomIndex] += randomIncrement;
    summation += result[randomIndex]

    // if summation exceed the number, then reduce the random number
    if (summation >= number) {
      return matchToSummation(result, number, summation)
    }
  }
}

function decrement(number) {
  const decrementedNumber = number - 1
  return decrementedNumber < 0 ? 0 : decrementedNumber
}

function matchToSummation(result, expectedSum, currentSum) {
  for (; ;) {
    // if summation exceed the number, then reduce the random number
    if (currentSum <= expectedSum) {
      return result
    }

    const randomIndex = Math.floor((Math.random() * result.length))
    if (result[randomIndex] !== 0) {
      result[randomIndex] = decrement(result[randomIndex])
      currentSum = decrement(currentSum)
    }
  }
}

function validateConfig({ noOfDays, changeBy, startPrice, volumeRange }) {
  if (noOfDays === 0 || noOfDays === undefined) {
    throw new Error("Number of days cannnot be 0 or undefined")
  }
  if (changeBy === 0 || changeBy === undefined) {
    throw new Error("precision cannnot be 0 or undefined")
  }
  if (startPrice === 0 || startPrice === undefined) {
    throw new Error("startPrice cannnot be 0 or undefined")
  }
  if (!isNil(volumeRange)) {
    if (!("min" in volumeRange) && !("max" in volumeRange))
      throw new Error("volumeRange mix max is missing undefined")
    if (volumeRange.min <= 1000 && volumeRange.max <= 1000)
      throw new Error("min and max volumeRange should be greater than 1000")
  }
}

function isNil(obj) {
  return obj === undefined || obj === null
}

function isNilOrEmpty(arr) {
  if (arr === undefined) {
    return true
  }
  if (arr === null) {
    return true
  }
  if (arr.length === 0) {
    return true
  }
  return false
}

module.exports = {
  p,
  differenceByPercentage,
  getRandomStep,
  randomIntFromInterval,
  validateConfig,
  isNilOrEmpty,
  generateRandomSplit,
  isNil
}

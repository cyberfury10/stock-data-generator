function p(num, noOfDigits = 2) {
  return +num.toFixed(noOfDigits)
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
  const interval = max - min
  const randomNumber = Math.random()
  const decimalCorrection = Math.pow(10, precision)
  return p( min + ((randomNumber * decimalCorrection) % interval))
}

function validateConfig({ noOfDays, changeBy, startPrice }) {
  if (noOfDays === 0 || noOfDays === undefined) {
    throw new Error("Number of days cannnot be 0 or undefined")
  }
  if (changeBy === 0 || changeBy === undefined) {
    throw new Error("precision cannnot be 0 or undefined")
  }
  if (startPrice === 0 || startPrice === undefined) {
    throw new Error("startPrice cannnot be 0 or undefined")
  }
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
}

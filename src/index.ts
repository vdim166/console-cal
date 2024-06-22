import readlineSync from "readline-sync"
import Calculator from "./calculator"

const calculator = new Calculator()

const expression = readlineSync.question("Type equation: ")
try {
  const result = calculator.evaluate(expression)
  console.log(`Result: ${result}`)
} catch (error) {
  console.error(`Error: ${(error as Error).message}`)
}

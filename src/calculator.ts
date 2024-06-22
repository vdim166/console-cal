import Parser from "./parser"

class Calculator {
  private parser: Parser

  constructor() {
    this.parser = new Parser()
  }

  public evaluate(expression: string) {
    const tokens = this.parser.parse(expression)
    return this.calculate(tokens)
  }

  private calculate(tokens: (number | string)[]) {
    const outputQueue: (number | string)[] = []
    const operatorStack: string[] = []

    tokens.forEach((token) => {
      if (typeof token === "number") {
        outputQueue.push(token)
      } else if (this.parser.isOperator(token)) {
        while (
          operatorStack.length &&
          this.parser.isOperator(operatorStack[operatorStack.length - 1]) &&
          this.parser.getPrecedence(token) <=
            this.parser.getPrecedence(operatorStack[operatorStack.length - 1])
        ) {
          outputQueue.push(operatorStack.pop()!)
        }
        operatorStack.push(token)
      } else if (token === "(") {
        operatorStack.push(token)
      } else if (token === ")") {
        while (
          operatorStack.length &&
          operatorStack[operatorStack.length - 1] !== "("
        ) {
          outputQueue.push(operatorStack.pop()!)
        }
        operatorStack.pop()
      }
    })

    while (operatorStack.length) {
      outputQueue.push(operatorStack.pop()!)
    }

    const resultStack: number[] = []
    outputQueue.forEach((token) => {
      if (typeof token === "number") {
        resultStack.push(token)
      } else {
        const b = resultStack.pop()!
        const a = resultStack.pop()!
        resultStack.push(this.parser.applyOperator(token, a, b))
      }
    })

    return resultStack.pop()!
  }
}

export default Calculator

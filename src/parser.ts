interface Operator {
  precedence: number
  associativity: "Left" | "Right"
  func: (a: number, b: number) => number
}

class Parser {
  private operators: { [key: string]: Operator }

  constructor() {
    this.operators = {
      "+": { precedence: 1, associativity: "Left", func: (a, b) => a + b },
      "-": { precedence: 1, associativity: "Left", func: (a, b) => a - b },
      "*": { precedence: 2, associativity: "Left", func: (a, b) => a * b },
      "/": { precedence: 2, associativity: "Left", func: (a, b) => a / b },
    }
  }

  public parse(expression: string) {
    const tokens: (number | string)[] = []
    let numberBuffer = ""

    for (let i = 0; i < expression.length; i++) {
      const char = expression[i]

      if (/\d/.test(char) || char === ".") {
        numberBuffer += char
      } else {
        if (numberBuffer) {
          tokens.push(parseFloat(numberBuffer))
          numberBuffer = ""
        }

        if (char in this.operators || char === "(" || char === ")") {
          tokens.push(char)
        }
      }
    }

    if (numberBuffer) {
      tokens.push(parseFloat(numberBuffer))
    }

    return tokens
  }

  public isOperator(token: string) {
    return token in this.operators
  }

  public getPrecedence(operator: string) {
    return this.operators[operator].precedence
  }

  public applyOperator(operator: string, a: number, b: number) {
    return this.operators[operator].func(a, b)
  }
}

export default Parser

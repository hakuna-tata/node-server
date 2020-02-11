const { MyValidator, Rule } = require("../app/utils/myValidator")

const MV = new MyValidator()

describe("接口的params", () => {
  test("", () => {
    expect(0 + 10).toBe(10)
  })
  test("", () => {
    expect(10 + 10).toBe(20)
  })
})

describe("接口的query", () => {
  test("", () => {
    expect(0 + 10).toBe(10)
  })
})

describe("接口的body", () => {
  test("", () => {
    expect(0 + 10).toBe(10)
  })
})

describe("接口的header", () => {
  test("", () => {
    expect(0 + 10).toBe(10)
  })
})
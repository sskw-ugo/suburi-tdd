import { assert } from "node:console";

class TestCase {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  run(result: TestResult = new TestResult()) {
    result.testStarted();
    this.setUp();
    try {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      const method = (this as any)[this.name] as () => void;
      method.call(this);
    } catch {
      result.testFailed();
    }

    this.tearDown();
    return result;
  }

  setUp() {
    // do nothing
  }

  tearDown() {
    // do nothing
  }
}

class WasRun extends TestCase {
  log = "";

  testMethod() {
    this.log += "testMethod ";
  }

  testBrokenMethod() {
    throw new Error();
  }

  override setUp() {
    this.log = "setUp ";
  }

  override tearDown(): void {
    this.log += "tearDown ";
  }
}

class TestResult {
  runCount = 0;
  errorCount = 0;

  testStarted() {
    this.runCount += 1;
  }

  testFailed() {
    this.errorCount += 1;
  }

  summary() {
    return `${this.runCount} run, ${this.errorCount} failed`;
  }
}

class TestCaseTest extends TestCase {
  testTemplateMethod() {
    const test = new WasRun("testMethod");
    test.run();
    assert("setUp testMethod tearDown " === test.log);
  }

  testResult() {
    const test = new WasRun("testMethod");
    const result = test.run();
    assert("1 run, 0 failed" === result.summary());
  }

  testFailedResult() {
    const test = new WasRun("testBrokenMethod");
    const result = test.run();
    assert("1 run, 1 failed" === result.summary());
  }

  testFailedResultFormatting() {
    const result = new TestResult();
    result.testStarted();
    result.testFailed();
    assert("1 run, 1 failed" === result.summary());
  }

  testSuite() {
    const suite = new TestSuite();
    suite.add(new WasRun("testMethod"));
    suite.add(new WasRun("testBrokenMethod"));
    const result = suite.run();
    assert("2 run, 1 failed" === result.summary());
  }
}

class TestSuite {
  tests: TestCase[] = [];

  add(test: TestCase) {
    this.tests.push(test);
  }

  run() {
    const result = new TestResult();
    for (const test of this.tests) {
      test.run(result);
    }
    return result;
  }
}

console.log(new TestCaseTest("testTemplateMethod").run().summary());
console.log(new TestCaseTest("testResult").run().summary());
console.log(new TestCaseTest("testFailedResult").run().summary());
console.log(new TestCaseTest("testFailedResultFormatting").run().summary());

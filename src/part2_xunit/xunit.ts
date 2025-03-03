import { assert } from "node:console";

class TestCase {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  run() {
    this.setUp();
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const method = (this as any)[this.name] as () => void;
    method.call(this);
  }

  setUp() {
    // do nothing
  }
}

class WasRun extends TestCase {
  wasRun = false;
  wasSetUp = false;

  testMethod() {
    this.wasRun = true;
  }

  override setUp() {
    this.wasRun = false;
    this.wasSetUp = true;
  }
}

class TestCaseTest extends TestCase {
  test?: WasRun;

  override setUp() {
    this.test = new WasRun("testMethod");
  }
  testRunning() {
    this.test?.run();
    assert(this.test?.wasRun);
  }

  testSetUp() {
    this.test?.run();
    assert(this.test?.wasSetUp);
  }
}

new TestCaseTest("testRunning").run();
new TestCaseTest("testSetUp").run();

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

    this.tearDown();
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

  override setUp() {
    this.log = "setUp ";
  }

  override tearDown(): void {
    this.log += "tearDown ";
  }
}

class TestCaseTest extends TestCase {
  testTemplateMethod() {
    const test = new WasRun("testMethod");
    test.run();
    assert("setUp testMethod tearDown " === test.log);
  }
}

new TestCaseTest("testTemplateMethod").run();

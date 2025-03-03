import { assert } from "node:console";

class TestCase {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  run() {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const method = (this as any)[this.name] as () => void;
    method.call(this);
  }
}

class WasRun extends TestCase {
  wasRun: boolean;

  constructor(name: string) {
    super(name);
    this.wasRun = false
  }

  testMethod() {
    this.wasRun = true;
  }
}

class TestCaseTest extends TestCase {
  testRunning() {
    const test = new WasRun("testMethod");
    assert(!test.wasRun);
    test.run();
    assert(test.wasRun);
  }
}

const test = new TestCaseTest("testRunning");
test.run();
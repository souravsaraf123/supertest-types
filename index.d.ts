import superagent = require("superagent");
import stAgent = require("./lib/agent");
import STest = require("./lib/test");
import { AgentOptions as STAgentOptions, App } from "./types";

interface CustomApiResponse<T> {
  code: string;
  message: string;
  data?: T;
  error?: any;
}

declare const supertest: supertest.SuperTestStatic;

declare namespace supertest {
  interface Response<T> extends superagent.Response {
    body: CustomApiResponse<T>;
  }

  type Request = superagent.SuperAgentRequest;

  type CallbackHandler = superagent.CallbackHandler;

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Test extends STest {}

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Agent extends stAgent {}

  interface Options {
    http2?: boolean;
  }

  type AgentOptions = STAgentOptions;

  type SuperTest<Req extends Test = Test> = superagent.SuperAgent<Req>;

  type SuperAgentTest = SuperTest<Test>;

  interface SuperTestStatic {
    (app: App, options?: STAgentOptions): stAgent;
    Test: typeof STest;
    agent: typeof stAgent &
      ((app?: App, options?: STAgentOptions) => InstanceType<typeof stAgent>);
  }
}

export = supertest;

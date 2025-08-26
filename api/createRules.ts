import {APIRequestContext, request, expect } from "@playwright/test";
import urlPath from '../data/urlPath.json';

export class createRules {
  constructor(private context: APIRequestContext) {}

  async createRuleValidData(data: any): Promise<any> {
    const response = await this.context.post(`${urlPath.BaseURL_API}/create`, {
    data: data.valid
});
    const body = await response.json();
    expect(response.status()).toBe(200);
    expect(body.statusCode).toBe("0");
    expect(body.statusDescription).toBe("Success");
    expect(body.data).toHaveProperty("ruleId");
    expect(body.data).toHaveProperty("ruleCode");
    console.log('Response:', body);

    return body.data;
  }

  async createRuleInvalidData_rulesPriorityNull(data: any): Promise<any> {
    const response = await this.context.post(`${urlPath.BaseURL_API}/create`, {
      data: data.inValid_priorityNull
    });
    const body = await response.json();
    expect(response.status()).toBe(400);
    expect(body.statusCode).toBe("1");
    expect(body.statusDescription).toBe("rulePriority must not be null");
    console.log('Response:', body);

    return body.data;
  }

  async createRuleInvalidData_rulesNameIsNullorEmpty(data: any): Promise<any> {
    const response = await this.context.post(`${urlPath.BaseURL_API}/create`, {
      data: data.inValid_nameIsNullorEmpty
    });
    const body = await response.json();
    expect(response.status()).toBe(400);
    expect(body.statusCode).toBe("1");
    expect(body.statusDescription).toBe("ruleName must not be blank");
    console.log('Response:', body);

    return body.data;
  }

  async createRuleInvalidData_ruleCriteriaIsEmpty(data: any): Promise<any> {
    const response = await this.context.post(`${urlPath.BaseURL_API}/create`, {
      data: data.inValid_ruleCriteriaIsEmpty
    });
    const body = await response.json();
    expect(response.status()).toBe(400);
    expect(body.statusCode).toBe("1");
    expect(body.statusDescription).toBe("ruleCriteriaList must not be empty");
    console.log('Response:', body);

    return body.data;
  }
}
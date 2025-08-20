import { expect, test } from "@playwright/test";
import data from '../data/data.json';
const baseURL = 'https://crmssp-devsales1.ttbbank.local/rule-management/rules';

test.describe('Create Rule API', () => {
    test('Create rule with API Success', async ({ request }) => {
    const response = await request.post(`${baseURL}/create`, {
        data: data.valid
});

    // For checking response status
    expect(response.status()).toBe(200);

    // For reading response body
    const body = await response.json();
    console.log('Response:', body);

    // For checking values within response
    expect(body.statusCode).toBe("0");
    expect(body.statusDescription).toBe("Success");
    expect(body.data).toHaveProperty("ruleId");
    expect(body.data).toHaveProperty("ruleCode");

    });

    test('Create rule with API Fail Because of Null Priority', async ({ request }) => {
    const response = await request.post(`${baseURL}/create`, {
        data: data.priorityNull
});

    // For checking response status
    expect(response.status()).toBe(400);

    // For reading response body
    const body = await response.json();
    console.log('Response:', body);

    // For checking values within response
    expect(body.data).toBeNull();
    expect(body.statusCode).toBe("1");
    expect(body.statusDescription).toBe("rulePriority must not be null");
    });

});
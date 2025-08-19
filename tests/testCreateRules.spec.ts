import { expect, test } from "@playwright/test";

test('Create rule with API', async ({ request }) => {
    const baseURL = 'https://crmssp-devsales1.ttbbank.local/rule-management/rules';

    const response = await request.post(`${baseURL}/create`, {
        data: {
    "statusCode": "inactive",
    "rulePriority": 11,
    "ruleName": "Test rule action bug",
    "ruleTriggers": [
        "Lead was created"
    ],
    "leadOriginations": [
        "System Initiate",
        "User Initiate",
        "Customer Initiate"
    ],
    "ruleCriteriaList": [
        {
            "sequence": 0,
            "criteria": "assignRuleModel",
            "criteriaOperator": "equal",
            "values": [
                "ruleStatusActive"
            ]
        }
    ],
    "ruleActionList": [
        {
            "ruleActionType": "Assignment",
            "ruleActionLevel": "to User (by Emp ID/Name)",
            // "ruleActionMethod":
            "ruleActionValueList": [
                {
                    "ruleActionValue": "15151",
                    "priority": 1
                }
            ]
        }
    ],
    "employeeId": "system"
    }
});

    expect(response.status()).toBe(200);

    // อ่าน response body
    const body = await response.json();
    console.log('Response:', body);

    // ตรวจสอบค่าภายใน response
    expect(body.statusCode).toBe("0");
    expect(body.statusDescription).toBe("Success");
    expect(body.data).toHaveProperty("ruleId");
    expect(body.data).toHaveProperty("ruleCode");

});
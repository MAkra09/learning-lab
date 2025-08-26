import { expect, test } from "@playwright/test";
import { createRules } from "../../api/createRules";
import data from "../../data/Create Rules/valid-data-detail.json";


test.describe('Create Rule API', () => {
    let createRule: createRules;

    test.beforeEach(({ request }) => {
        createRule = new createRules(request);
    });

    test('Create rule with Valid Data', async () => {
        const response = await createRule.createRuleValidData(data);
    });

    test('Create rule with Invalid Data in Rules Priority Null', async () => {
        const response = await createRule.createRuleInvalidData_rulesPriorityNull(data);
    });

    test('Create rule with Invalid Data in Rules Name is Null or Empty', async () => {
        const response = await createRule.createRuleInvalidData_rulesNameIsNullorEmpty(data);
    });

    test('Create rule with Invalid Data in Rules Criteria is Empty', async () => {
        const response = await createRule.createRuleInvalidData_ruleCriteriaIsEmpty(data);
    });
});

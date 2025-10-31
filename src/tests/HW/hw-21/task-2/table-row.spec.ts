import test, { expect, Page } from "@playwright/test";
import expectedTable from "./test-data";

async function getTableRow(page: Page, email: string){
  const table = page.locator("#table2");

  const headerText = await table.locator("th").allInnerTexts();
  headerText.pop();

  const tableRows = table.locator("tbody tr");
  const rowLocator = tableRows.filter({ has: page.locator("td") }).filter({ hasText: email });

  const cells = await rowLocator.locator("td").filter({ hasNot: page.locator("a") }).allInnerTexts();

  const rowData = headerText.reduce<Record<string, string>>((result, header, i) => {
    result[header] = cells[i] ?? "";
    return result;
  }, {});

  return rowData;
}

test.describe("[Heroku App] Table 2", () => {
  test("Test getTableRow() with all emails from Table 2", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/tables");

    for (const expectedRow of expectedTable) {
      const rowFromTable = await getTableRow(page, expectedRow.Email ?? "");
      console.log(`Result for ${expectedRow.Email}:`, rowFromTable);

      expect.soft(rowFromTable).toEqual(expectedRow);
    }
  });
});

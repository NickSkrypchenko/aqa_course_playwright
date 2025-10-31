/*
Разработать тест со следующими шагами:
  - открыть https://the-internet.herokuapp.com/
  - перейти на страницу Dynamic Controls
  - Дождаться появления кнопки Remove
  - Завалидировать текста в заголовке страницы
  - Чекнуть чекбокс
  - Кликнуть по кнопке Remove
  - Дождаться исчезновения чекбокса
  - Проверить наличие кнопки Add
  - Завалидировать текст It's gone!
  - Кликнуть на кнопку Add
  - Дождаться появления чекбокса
  - Завалидировать текст It's back!
*/

import { test, expect } from "@playwright/test";

test.describe("[Heroku App] Dynamic Controls", () => {
  test("Remove and Add checkbox", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/");

    const dynamicControlsLink = page.getByRole("link", { name: "Dynamic Controls" });
    await dynamicControlsLink.click();
    const removeButton = page.getByRole("button", { name: "Remove" });
    await expect(removeButton, "Remove button is displayed").toBeVisible();
    const heading = page.getByRole("heading", { name: "Dynamic Controls" });
    await expect(heading, "Title is displayed").toBeVisible();
    const description = page.locator("div.example > p");
    await expect(description, "Description text is correct").toHaveText(
      "This example demonstrates when elements (e.g., checkbox, input field, etc.) are changed asynchronously."
    );
    const checkbox = page.getByRole("checkbox");
    await expect(checkbox, "Checkbox is displayed").toBeVisible();
    await checkbox.check();
    await expect(checkbox, "Checkbox is checked").toBeChecked();
    await removeButton.click();
    await expect(checkbox, "Checkbox is not displayed").toBeVisible({ visible: false, timeout: 10000 });
    const addButton = page.getByRole("button", { name: "Add" });
    await expect(addButton, "Add button is displayed").toBeVisible();
    const message = page.locator("#message");
    await expect(message, "Check message 'It's gone!'").toHaveText("It's gone!");
    await addButton.click();
    await expect(checkbox, "Checkbox is displayed again").toBeVisible({ timeout: 10000 });
    await expect(message, "Check message 'It's back!'").toHaveText("It's back!");
  });
});
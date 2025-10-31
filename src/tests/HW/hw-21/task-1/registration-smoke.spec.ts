/*
Разработайте смоук тест-сьют с тестами на REGISTER на странице 
https://anatoly-karpovich.github.io/demo-login-form/

Требования:
Страница регистрации:
  • Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы, 
    как и имя состоящее из одних пробелов
  • Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и 
    нижнем регистрах, пароль из одних пробелов запрещен

Страница логина:
  • Username: обязательное
  • Password: обязательное
*/

import test, { expect } from "@playwright/test";
import testData from "./test-data";

test.describe("[DEMO REGISTER PAGE] [SMOKE]", () => {
  const url = "https://anatoly-karpovich.github.io/demo-login-form/";

  test.beforeEach(async ({ page }) => {
    await page.goto(url);
    const registerButton = page.locator("#registerOnLogin");
    await registerButton.click();
  });

  for (const { title, credentials, errorMessage } of testData) {
    test(title, async ({ page }) => {
      const usernameInput = page.locator("#userNameOnRegister");
      const passwordInput = page.locator("#passwordOnRegister");
      const registerButton = page.locator("#register");
      const notification = page.locator("#errorMessageOnRegister");

      const { username, password } = credentials;
      await usernameInput.fill(username);
      await passwordInput.fill(password);
      await registerButton.click();

      await expect(notification).toHaveText(errorMessage);
    });
  }
});

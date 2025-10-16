/*
Разработайте смоук тест-сьют с тестами на REGISTER на странице https://anatoly-karpovich.github.io/demo-login-form/
Требования:
Страница регистрации:
	•	Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
	•	Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен

Страница логина:
	•	Username: обязательное
	•	Password: обязательное
*/


import { test, expect } from "@playwright/test";

interface ICredentials {
  username: string;
  password: string;
}

enum NOTIFICATIONS {
  REGISTER_SUCCESS = "Successfully registered! Please, click Back to return on login page",
  BLANK_USERNAME_AND_PASSWORD = "Please, provide valid data",
  BLANK_USERNAME = "Username is required",
  BLANK_PASSWORD = "Password is required",
  SHORT_USERNAME = "Username should contain at least 3 characters",
  SHORT_PASSWORD = "Password should contain at least 8 characters",
  SPACES_USERNAME = "Prefix and postfix spaces are not allowed in username",
}


test.describe("[DEMO REGISTER PAGE] [SMOKE]", () => {

	const validCredentials: ICredentials = {
	username: "testuser",
	password: "Qwerty1234",
  };

  	const invalidCredentials: readonly ICredentials[] = [
	{
	  username: "",
	  password: "",
	},
	{
	  username: "",
	  password: validCredentials.password,
	},
	{
	  username: validCredentials.username,
	  password: "",
	},
	{
	  username: "qw",
	  password: validCredentials.password,
	},
	{
	  username: validCredentials.username,
	  password: "Qwerty",
	},
	{
	  username: "          ",
	  password: validCredentials.password,
	},
	{ username: " testuser ",
	  password: validCredentials.password }
  ];

    test.beforeEach(async ({ page }) => {
    	const url = 'https://anatoly-karpovich.github.io/demo-login-form/';
        const registerButton = page.locator('#registerOnLogin');

        await page.goto(url);
        await registerButton.click();
  });

 test("Should register successfully with valid credentials", async ({ page }) => {

	const usernameInput = page.locator("#userNameOnRegister");
	const passwordInput = page.locator("#passwordOnRegister");
	const registerButton = page.locator("#register");
	await usernameInput.fill(validCredentials.username);
	await passwordInput.fill(validCredentials.password);
	await registerButton.click();
	const notification = page.locator("#errorMessageOnRegister");
	await expect(notification).toHaveText(NOTIFICATIONS.REGISTER_SUCCESS);
  });

  test("Fail register with blank credentials", async ({ page }) => {

	const usernameInput = page.locator("#userNameOnRegister");
	const passwordInput = page.locator("#passwordOnRegister");
	const registerButton = page.locator("#register");
	const notification = page.locator("#errorMessageOnRegister");
	const { username, password } = invalidCredentials[0]!;
	await usernameInput.fill(username);
	await passwordInput.fill(password);
	await registerButton.click();
	await expect(notification).toHaveText(NOTIFICATIONS.BLANK_USERNAME_AND_PASSWORD);
  });

  test("Fail register with blank username", async ({ page }) => {

	const usernameInput = page.locator("#userNameOnRegister");
	const passwordInput = page.locator("#passwordOnRegister");
	const registerButton = page.locator("#register");
	const notification = page.locator("#errorMessageOnRegister");
	const { username, password } = invalidCredentials[1]!;
	await usernameInput.fill(username);
	await passwordInput.fill(password);
	await registerButton.click();
	await expect(notification).toHaveText(NOTIFICATIONS.BLANK_USERNAME);
  });

  test("Fail register with blank password", async ({ page }) => {

	const usernameInput = page.locator("#userNameOnRegister");
	const passwordInput = page.locator("#passwordOnRegister");
	const registerButton = page.locator("#register");
	const notification = page.locator("#errorMessageOnRegister");
	const { username, password } = invalidCredentials[2]!;
	await usernameInput.fill(username);
	await passwordInput.fill(password);
	await registerButton.click();
	await expect(notification).toHaveText(NOTIFICATIONS.BLANK_PASSWORD);
  });

  test("Fail register with short username", async ({ page }) => {

	const usernameInput = page.locator("#userNameOnRegister");
	const passwordInput = page.locator("#passwordOnRegister");
	const registerButton = page.locator("#register");
	const notification = page.locator("#errorMessageOnRegister");
	const { username, password } = invalidCredentials[3]!;
	await usernameInput.fill(username);
	await passwordInput.fill(password);
	await registerButton.click();
	await expect(notification).toHaveText(NOTIFICATIONS.SHORT_USERNAME);
  });

  test("Fail register with short password", async ({ page }) => {

	const usernameInput = page.locator("#userNameOnRegister");
	const passwordInput = page.locator("#passwordOnRegister");
	const registerButton = page.locator("#register");
	const notification = page.locator("#errorMessageOnRegister");
	const { username, password } = invalidCredentials[4]!;
	await usernameInput.fill(username);
	await passwordInput.fill(password);
	await registerButton.click();
	await expect(notification).toHaveText(NOTIFICATIONS.SHORT_PASSWORD);
  });

  test("Fail register with username containing only spaces", async ({ page }) => {

	const usernameInput = page.locator("#userNameOnRegister");
	const passwordInput = page.locator("#passwordOnRegister");
	const registerButton = page.locator("#register");
	const notification = page.locator("#errorMessageOnRegister");
	const { username, password } = invalidCredentials[5]!;
	await usernameInput.fill(username);
	await passwordInput.fill(password);
	await registerButton.click();
	await expect(notification).toHaveText(NOTIFICATIONS.SPACES_USERNAME);
  });

  test("Fail register with username containing prefix and postfix spaces", async ({ page }) => {

	const usernameInput = page.locator("#userNameOnRegister");
	const passwordInput = page.locator("#passwordOnRegister");
	const registerButton = page.locator("#register");
	const notification = page.locator("#errorMessageOnRegister");
	const { username, password } = invalidCredentials[6]!;
	await usernameInput.fill(username);
	await passwordInput.fill(password);
	await registerButton.click();
	await expect(notification).toHaveText(NOTIFICATIONS.SPACES_USERNAME);
  });
});
/*
Создайте ОДИН смоук тест со следующими шагами:
Переход на страницу https://anatoly-karpovich.github.io/demo-registration-form/
Заполните форму регистрации
Проверьте, что пользователь успешно зарегистрирован
*/

import { test, expect } from "@playwright/test";

type Country = "USA" | "Canada" | "UK";
type Gender = "male" | "female";
type Hobbies = "Travelling" | "Movies" | "Sports" | "Gaming" | "Dancing";
type Skill = "JavaScript" | "Python" | "Java" | "C++" | "Ruby";
type Month = "January" | "February" | "March" | "April" | "May" | "June" | "July" | "August" | "September" | "October" | "November" | "December";

interface IRegistrationData {
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  email: string;
  country: Country;
  sex: Gender;
  hobbies: Hobbies[];
  language: string;
  skills: Skill[];
  birthdayYear: string;
  birthdayMonth: Month;
  birthdayDay: string;
  password: string;
}

test.describe("[DEMO REGISTRATION FORM] [SMOKE]", () => {
  const baseUrl = "https://anatoly-karpovich.github.io/demo-registration-form/";

  const registrationData: IRegistrationData = {
    firstName: "Anna",
    lastName: "Smith",
    address: "123 Main Street, Los Angeles, CA",
    phone: "+1234567890",
    email: "anna.smith@test.com",
    country: "Canada",
    sex: "female",
    hobbies: ["Movies", "Dancing"],
    language: "French",
    skills: ["Python", "Java"],
    birthdayYear: "1995",
    birthdayMonth: "March",
    birthdayDay: "15",
    password: "TestPassword123",
  };

  test("Should successfully register a user with valid data", async ({ page }) => {
    await page.goto(baseUrl);

    const firstNameInput = page.locator('#firstName');
    const lastNameInput = page.locator('#lastName');
    const addressInput = page.locator('#address');
    const emailInput = page.locator('#email');
    const phoneInput = page.locator('#phone');
    const countrySelector = page.locator('#country');
    const maleGenderRadio = page.locator('input[value="male"]');
    const femaleGenderRadio = page.locator('input[value="female"]');
    const hobbiesCheckbox = (hobby: Hobbies) => page.locator(`input[value="${hobby}"]`);
    const languageInput = page.locator('#language');
    const skillSelector = page.locator('#skills');
    const birthdayYearSelector = page.locator('#year');
    const birthdayMonthSelector = page.locator('#month');
    const birthdayDaySelector = page.locator('#day');
    const passwordInput = page.locator('#password');
    const confirmPasswordInput = page.locator('#password-confirm');
    const submitButton = page.locator('button[type="submit"]');
    const registrationDetails = page.locator('h2.text-center');

    await firstNameInput.fill(registrationData.firstName);
    await lastNameInput.fill(registrationData.lastName);
    await addressInput.fill(registrationData.address);
    await emailInput.fill(registrationData.email);
    await phoneInput.fill(registrationData.phone);
    await countrySelector.selectOption(registrationData.country);
    registrationData.sex === "male" ? await maleGenderRadio.check() : await femaleGenderRadio.check();
    for (const hobby of registrationData.hobbies) {
      await hobbiesCheckbox(hobby).check();
    }
    await languageInput.fill(registrationData.language);
    await skillSelector.selectOption(registrationData.skills);
    await birthdayYearSelector.selectOption(registrationData.birthdayYear);
    await birthdayMonthSelector.selectOption(registrationData.birthdayMonth);
    await birthdayDaySelector.selectOption(registrationData.birthdayDay);
    await passwordInput.fill(registrationData.password);
    await confirmPasswordInput.fill(registrationData.password);
    await submitButton.click();

    await expect(registrationDetails).toHaveText("Registration Details");
  });
});


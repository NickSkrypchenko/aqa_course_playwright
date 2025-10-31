interface ICredentials {
  username: string;
  password: string;
}

interface ITestData {
  title: string;
  credentials: ICredentials;
  errorMessage: string;
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

const validCredentials: ICredentials = {
  username: "testuser",
  password: "Qwerty1234",
};

const testData: ITestData[] = [
  {
    credentials: { username: "testuser", password: "Qwerty1234" },
    errorMessage: NOTIFICATIONS.REGISTER_SUCCESS,
    title: "Success register with valid credentials",
  },
  {
    credentials: { username: "", password: "" },
    errorMessage: NOTIFICATIONS.BLANK_USERNAME_AND_PASSWORD,
    title: "Fail register with blank credentials",
  },
  {
    credentials: { username: "", password: validCredentials.password },
    errorMessage: NOTIFICATIONS.BLANK_USERNAME,
    title: "Fail register with blank username",
  },
  {
    credentials: { username: validCredentials.username, password: "" },
    errorMessage: NOTIFICATIONS.BLANK_PASSWORD,
    title: "Fail register with blank password",
  },
  {
    credentials: { username: "qw", password: validCredentials.password },
    errorMessage: NOTIFICATIONS.SHORT_USERNAME,
    title: "Fail register with short username",
  },
  {
    credentials: { username: validCredentials.username, password: "Qwerty" },
    errorMessage: NOTIFICATIONS.SHORT_PASSWORD,
    title: "Fail register with short password",
  },
  {
    credentials: { username: "          ", password: validCredentials.password },
    errorMessage: NOTIFICATIONS.SPACES_USERNAME,
    title: "Fail register with username containing only spaces",
  },
  {
    credentials: { username: " testuser ", password: validCredentials.password },
    errorMessage: NOTIFICATIONS.SPACES_USERNAME,
    title: "Fail register with username containing prefix and postfix spaces",
  },
];

export default testData;

import { validateName, validateEmail, validatePassword } from "../utilities/validate.js";
import { API_BASE_URL } from "../utilities/consts.js";
const regSuccess = document.querySelector(".reg-success");

function displayError(fieldId, errorMessage) {
  const errorElement = document.getElementById(`${fieldId}-error`);
  if (errorElement) {
    errorElement.textContent = errorMessage;
    errorElement.style.display = errorMessage ? "block" : "none";
  }
}

async function registerUser(url, userData) {
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData),
    };

    const response = await fetch(url, postData);
    const json = await response.json();
    console.log(json);

    if (response.status >= 200 && response.status <= 299) {

      document.querySelector("#reg-name").value = "";
      document.querySelector("#reg-email").value = "";
      document.querySelector("#reg-password").value = "";

      regSuccess.style.display = "block";
      console.log("Registration successful!");
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function loginUser(url, userData) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData),
    });

    const json = await response.json();
    console.log(json);

    if (response.status >= 200 && response.status <= 299) {
      console.log("Login successful!");
      const accessToken = json.accessToken;

      // Store the access token in localStorage for future use
      localStorage.setItem("accessToken", accessToken);

      // Redirect to the feed page
      window.location.href = "./feed/index.html";
    } else {
      console.log("Login failed!");
    }
  } catch (error) {
    console.log(error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const registrationForm = document.getElementById("registration-form");

  registrationForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.querySelector("#reg-name").value;
    const email = document.querySelector("#reg-email").value;
    const password = document.querySelector("#reg-password").value;

    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    displayError("name", isNameValid ? "" : "Username cannot contain symbols apart from underscore");
    displayError("email", isEmailValid ? "" : "Email must be a valid stud.noroff.no or noroff.no email address");
    displayError("password", isPasswordValid ? "" : "Must be 8 characters long");

    if (isNameValid && isEmailValid && isPasswordValid) {
      const userToRegister = {
        name,
        email,
        password,
      };

      const registerURL = `${API_BASE_URL}/api/v1/social/auth/register`;

      try {
        await registerUser(registerURL, userToRegister);
      } catch (error) {
        console.log(error.message);
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.querySelector("#email-login").value;
    const password = document.querySelector("#password-login").value;

    const userToLogin = {
      email,
      password,
    };

    const loginURL = `${API_BASE_URL}/api/v1/social/auth/login`;

    try {
      await loginUser(loginURL, userToLogin);
    } catch (error) {
      console.log(error.message);
    }
  });
});







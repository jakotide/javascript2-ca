// import { validateEmail } from "../utilities/validate";

const API_BASE_URL = "https://api.noroff.dev";






async function registerUser(userData) {
  try {
    const registerURL = `${API_BASE_URL}/api/v1/social/auth/register`;

    const response = await fetch(registerURL, {
      method: "POST",
      body: JSON.stringify(userData), 
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response)
    const json = await response.json();
    if (response.status >= 200 && response.status <= 299) {
      localStorage.setItem("loggedInUser", userData.name);
      console.log("Success!");
    } else {
      console.log("Registration failed!");
    }
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const registrationForm = document.getElementById("registration-form");

  registrationForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("reg-name").value;
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;

    const userData = {
      name,
      email,
      password,
    };

    console.log("userData:", userData);

    await registerUser(userData);
  });
});


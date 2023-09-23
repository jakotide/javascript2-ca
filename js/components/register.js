  
// const API_BASE_URL = "https://api.noroff.dev";

// async function registerUser(userData) {
//   try {
//     const registerURL = `${API_BASE_URL}/api/v1/social/auth/register`;

//     const response = await fetch(registerURL, {
//       method: "POST",
//       body: JSON.stringify(userData),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     console.log(response);
//     const json = await response.json();
//     if (response.status >= 200 && response.status <= 299) {
//       // Store the registered user data in local storage
//       localStorage.setItem("registeredUserData", JSON.stringify(userData));
//       console.log("Registration successful!");
//     } else {
//       console.log("Registration failed!");
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

// document.addEventListener("DOMContentLoaded", function () {
//   const registrationForm = document.getElementById("registration-form");

//   registrationForm.addEventListener("submit", async (event) => {
//     event.preventDefault();

//     const name = document.getElementById("reg-name").value;
//     const email = document.getElementById("reg-email").value;
//     const password = document.getElementById("reg-password").value;

//     const userData = {
//       name,
//       email,
//       password,
//     };

//     console.log("userData:", userData);

//     await registerUser(userData);
//   });
// });

// // LOGIN

// document.addEventListener("DOMContentLoaded", function () {
//   const loginForm = document.getElementById("login-form");

//   loginForm.addEventListener("submit", async (event) => {
//     event.preventDefault();

//     // Retrieve the registered user data from local storage
//     const registeredUserData = JSON.parse(localStorage.getItem("registeredUserData"));

//     if (registeredUserData) {
//       // Use the registered user data to log in
//       await loginUser(loginURL, registeredUserData);
//     } else {
//       console.log("No registered user data found.");
//     }
//   });
// });

// async function loginUser(url, userData) {
//   try {
//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userData),
//     });

//     const json = await response.json();
//     console.log(json);

//     if (response.status >= 200 && response.status <= 299) {
//       console.log("Login successful!");

//       const accessToken = json.accessToken;
//       localStorage.setItem("accessToken", accessToken);
//     } else {
//       console.log("Login failed!");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

// const loginURL = `${API_BASE_URL}/api/v1/social/auth/login`;

// const API_BASE_URL = "https://api.noroff.dev";

// async function registerUser(url, userData) {
//   try {
//     const postData = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(userData),
//     }
//     const response = await fetch(url, postData);
//     const json = await response.json();
//     console.log(json)
//   } catch(error) {
//     console.log(error)
//   }
// }

// document.addEventListener("DOMContentLoaded", function () {
//   const registrationForm = document.getElementById("registration-form");
  
//   registrationForm.addEventListener("submit", async (event) => {
//     event.preventDefault();

//     // Get the form field values inside the submit event handler
//     const name = document.querySelector("#reg-name").value;
//     const email = document.querySelector("#reg-email").value;
//     const password = document.querySelector("#reg-password").value;

//     const userToRegister = {
//       name,
//       email,
//       password,
//     };

//     const registerURL = `${API_BASE_URL}/api/v1/social/auth/register`;

//     try {
//       await registerUser(registerURL, userToRegister);
//     } catch (error) {
//       console.log(error);
//     }
//   });
// });
const API_BASE_URL = "https://api.noroff.dev";

function validateName(name) {
  // Use a regular expression to check if the name contains only alphanumeric characters and underscores
  return /^[a-zA-Z0-9_]+$/.test(name);
}

function validateEmail(email) {
  const noroffEmail = /@noroff\.no$/;
  const studEmail = /@stud\.noroff\.no$/;

  return noroffEmail.test(email) || studEmail.test(email);
}

function validatePassword(password) {
  return password.length >= 8;
}

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
  } catch (error) {
    console.log(error.message);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const registrationForm = document.getElementById("registration-form");

  registrationForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.querySelector("#reg-name").value;
    const email = document.querySelector("#reg-email").value;
    const password = document.querySelector("#reg-password").value;

    // Validate the input fields and display error messages
    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    displayError("name", isNameValid ? "" : "Username can not contain symbols apart from underscore");
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




// LOGIN 





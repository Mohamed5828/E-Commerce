import {handleSignUp, handleSignIn} from "../utils/handleAuthentication.js";

document.getElementById("signin-tab").addEventListener("click", switchTabSignIn)
document.getElementById("signup-tab").addEventListener("click", switchTabSignUp)
document.getElementById("signin-form").addEventListener("submit", handleSignIn)
document.getElementById("signup-form").addEventListener("submit", handleSignUp)


/**
 * Switches the tab to the sign-in view by modifying the classes and title.
 */
function switchTabSignIn() {
  document.getElementById("signin-div").classList.replace("hidden-container", "shown-container")
  document.getElementById("signup-div").classList.replace("shown-container", "hidden-container")
  document.title = "Sign in"
  document.getElementById("auth-err-msg-signin").style.display = "none"
  document.getElementById("signin-tab").classList.add("selected-tab")
  document.getElementById("signup-tab").classList.remove("selected-tab")
}

/**
 * Switches the tab to the sign-up view by modifying the classes and title.
 */
function switchTabSignUp() {
  document.getElementById("signin-div").classList.replace("shown-container", "hidden-container")
  document.getElementById("signup-div").classList.replace("hidden-container", "shown-container")
  document.title = "Sign up"
  document.getElementById("auth-err-msg-signup").style.display = "none"
  document.getElementById("signup-tab").classList.add("selected-tab")
  document.getElementById("signin-tab").classList.remove("selected-tab")

}

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }


// Uncomment the following code to use placeholder users
// localStorage.setItem("auth-users", `[
// {"id":0,"name":"John Doe","email":"johndoe@example.com","salt":"85b8900359bea6e3bbc948525a2f6ece","hashed_password":"9284fee6a249dae70848c8287be857612661ef6fa09908a390ceafeb8b80bee6"},
// {"id":1,"name":"Jane Smith","email":"janesmith@example.com","salt":"93b0b8dc2cdeb5e68b89a1f6155c618c","hashed_password":"ae92a16cfb2e7372ae6290f86e58c98d85d1ea4d46bd11cd76da46bc399345d1"},
// {"id":2,"name":"Michael Brown","email":"michaelbrown@example.com","salt":"f1793f9363496cc76b0d0e743e803ec8","hashed_password":"0810ed6d4faa7ff952044ccb1de2f2e59dd76df046b5ffa8eb5853ad6c7f2e7f"}
// ]`);
// localStorage.setItem("auth-user-id-counter", "3");
//_______________________________________________________
// LEAVE COMMENTED
// =================
// placeholder users:
// [
//   {
//     "id": 0
//     "name": "John Doe",
//     "email": "johndoe@example.com",
//     "password": "Password1"
//   },
//   {
//     "id": 1,
//     "name": "Jane Smith",
//     "email": "janesmith@example.com",
//     "password": "SecurePass123"
//   },
//   {
//     "id": 2,
//     "name": "Michael Brown",
//     "email": "michaelbrown@example.com",
//     "password": "Passw0rd!"
//   }
// ]



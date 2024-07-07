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

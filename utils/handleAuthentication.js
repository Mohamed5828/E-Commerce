import { fetchUsers, putUsers } from "./HandleAPI.js";

/**
 * Generates a random HEX salt of the specified byte length.
 *
 * @param {int} length - The byte length of the salt.
 * @return {string} A randomly generated salt.
 */
function generateRandomSalt(length) {
  return CryptoJS.lib.WordArray.random(length).toString();
}

/**
 * Hashes the password using SHA256 algorithm with the provided salt.
 *
 * @param {string} password - The password to be hashed.
 * @param {string} salt - The salt to be combined with the password for hashing.
 * @return {string} The hashed password.
 */
function hashPassword(password, salt) {
  return CryptoJS.SHA256(password + salt).toString();
}

/**
 * Handles the sign-in process by retrieving the email, and password from the form,
 * fetching the "auth-users" data from JSON server, and comparing the form data with the auth-users
 * @param event
 * @returns {Promise<void>}
 */
export async function handleSignIn(event) {
  let form = event.target
  event.preventDefault()

  let email = (form.email.value).toLowerCase()
  let password = form.password.value
  let remMe = form["rem-me"].checked
  try {
    let users = await fetchUsers()
    console.log(users[0])
    console.log(hashPassword(password, users[0].salt))
    let user = users.find(user => user.email === email && user.hashed_password === hashPassword(password, user.salt))
    if (user) {
      if (remMe) {
        localStorage.setItem("auth-user", user.id)
      } else {
        sessionStorage.setItem("auth-user", user.id)
      }
      form.submit()
    } else {
      document.getElementById("auth-err-msg-signin").style.display = "inline"
      form.reset()
    }
  } catch (e) {
    console.error(e)
    alert(e)
  }

}

/**
 * Handles the sign-up process by retrieving the name, email, and password from the form,
 * fetching the "auth-users" data from JSON server, and send the updated "auth-users" data back to JSON server.
 *
 * @return {void} This function does not return anything.
 * @param event
 */
export async function handleSignUp(event) {
  let form = event.target
  event.preventDefault()

  let user_id_counter = await fetchUsers().then((users) => users.length)
  let name = form.uname.value
  let email = (form.email.value).toLowerCase()
  let password = form.password.value
  try {
    let users = await fetchUsers()
    let salt = generateRandomSalt(16)
    let user = {
      id: user_id_counter,
      name: name,
      email: email,
      salt: salt,
      hashed_password: hashPassword(password, salt),
      orders: []
    }
    if (users.find(user => user.email === email)) {
      document.getElementById("auth-err-msg-signup").style.display = "inline"
      form.reset()
    } else {
      document.getElementById("auth-err-msg-signup").style.display = "none"
      users.push(user)
      // localStorage.setItem("auth-users", JSON.stringify(users))
      await putUsers(users)
      // localStorage.setItem("auth-user-id-counter", user_id_counter + 1)
      form.submit()
    }
  } catch (e) {
    console.error(e)
    alert(e)
  }

}

/**
 * Retrieves the ID of the currently logged-in user from either localStorage or sessionStorage.
 *
 * @return {int} The ID of the currently logged-in user, or -1 if no user is logged in.
 */
export function getLoggedInUserId() {
  return parseInt(localStorage.getItem("auth-user") ?? sessionStorage.getItem("auth-user") ?? -1)
}

/**
 * Logs out the currently logged-in user by removing their ID from localStorage and redirecting to home
 *
 * @return {void} This function does not return anything.
 */
export function logout() {
  localStorage.removeItem("auth-user")
  sessionStorage.removeItem("auth-user")
  location.href = `../index.html`
}

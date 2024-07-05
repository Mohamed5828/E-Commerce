/**
 * Generates a random salt of the specified length.
 *
 * @param {int} length - The length of the salt.
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
 * Handles the sign-in process by retrieving the email and password from the form,
 * parsing the "auth-users" data from localStorage, and storing the retrieved email and password.
 *
 * @return {void} This function does not return anything.
 * @param event
 */
export function handleSignIn(event) {
  let form = event.target
  event.preventDefault()

  let email = form.email.value
  let password = form.password.value
  let remMe = form["rem-me"].checked
  let users = JSON.parse(localStorage.getItem("auth-users")) ?? []
  let user = users.find(user => user.email === email && user.hashed_password === hashPassword(password, user.salt))
  if (user) {
    if (remMe) {
      localStorage.setItem("auth-user", user.id)
    } else {
      sessionStorage.setItem("auth-user", user.id)
    }
    form.submit()
  } else {
    document.getElementById("auth-err-msg-signin").style.display = "block"
    form.reset()
  }
}

/**
 * Handles the sign-up process by retrieving the name, email, and password from the form,
 * parsing the "auth-users" data from localStorage, and storing the retrieved name, email, and password.
 *
 * @return {void} This function does not return anything.
 * @param event
 */
export function handleSignUp(event) {
  let form = event.target
  event.preventDefault()

  let user_id_counter = JSON.parse(localStorage.getItem("auth-user-id-counter")) ?? 0
  let name = form.uname.value
  let email = form.email.value
  let password = form.password.value
  let users = JSON.parse(localStorage.getItem("auth-users")) ?? []
  let salt = generateRandomSalt(16)
  let user = {
    id: user_id_counter, name: name, email: email, salt: salt, hashed_password: hashPassword(password, salt)
  }
  if (users.find(user => user.email === email)) {
    document.getElementById("auth-err-msg-signup").style.display = "block"
    form.reset()
  } else {
    document.getElementById("auth-err-msg-signup").style.display = "none"
    users.push(user)
    localStorage.setItem("auth-users", JSON.stringify(users))
    localStorage.setItem("auth-user-id-counter", user_id_counter + 1)
    form.submit()
  }
}

export function getLoggedInUserId() {
  return parseInt(localStorage.getItem("auth-user")) ?? parseInt(sessionStorage.getItem("auth-user")) ?? -1
}

export function logout() {
  localStorage.removeItem("auth-user")
  sessionStorage.removeItem("auth-user")
}
/**
 * GitHub Repo Token
 */
const token = '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';
/**
 * GitHub API Server URL
 */
const serverUrl = `https://api.github.com/repos/Ahmed-Rushdi/json-page-test/contents/auth_users.json`;

/**
 * Generates a random HEX salt of the specified byte length.
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

export async function handleSignIn(event) {
  let form = event.target
  event.preventDefault()

  let email = (form.email.value).toLowerCase()
  let password = form.password.value
  let remMe = form["rem-me"].checked

  let users = await retrieveUsers()

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
}

/**
 * Handles the sign-up process by retrieving the name, email, and password from the form,
 * parsing the "auth-users" data from localStorage, and storing the retrieved name, email, and password.
 *
 * @return {void} This function does not return anything.
 * @param event
 */
export async function handleSignUp(event) {
  let form = event.target
  event.preventDefault()

  let user_id_counter = JSON.parse(localStorage.getItem("auth-user-id-counter")) ?? 0
  let name = form.uname.value
  let email = (form.email.value).toLowerCase()
  let password = form.password.value
  try {
    let users = await retrieveUsers()
    let salt = generateRandomSalt(16)
    let user = {
      id: user_id_counter, name: name, email: email, salt: salt, hashed_password: hashPassword(password, salt)
    }
    if (users.find(user => user.email === email)) {
      document.getElementById("auth-err-msg-signup").style.display = "inline"
      form.reset()
    } else {
      document.getElementById("auth-err-msg-signup").style.display = "none"
      users.push(user)
      // localStorage.setItem("auth-users", JSON.stringify(users))
      await updateJsonServer(await getSHA(), users)
      localStorage.setItem("auth-user-id-counter", user_id_counter + 1)
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
  return parseInt(localStorage.getItem("auth-user")) ?? parseInt(sessionStorage.getItem("auth-user")) ?? -1
}

/**
 * Logs out the currently logged-in user by removing their ID from localStorage and redirecting to the login page.
 *
 * @return {void} This function does not return anything.
 */
export function logout() {
  localStorage.removeItem("auth-user")
  sessionStorage.removeItem("auth-user")
}

async function getSHA() {

  const response = await fetch(serverUrl, {
    method: 'GET',
    headers: {
      'Authorization': `token ${token}`
    }
  });
  if (!response.ok) {
    throw new Error(`Network Error During Get SHA: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();
  return data.sha;

}

async function updateJsonServer(sha, newContent) {
  const body = {
    message: "Update DB",
    content: btoa(JSON.stringify(newContent)),
    sha: sha
  };

  const response = await fetch(serverUrl, {
    method: 'PUT',
    headers: {
      'Authorization': `token ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  if (!response.ok) {
    throw new Error(`Network Error During PUT Users Data: ${response.status} ${response.statusText}`);
  }
}

async function fetchJsonServer() {
  const response = await fetch(serverUrl, {
    method: 'GET',
    headers: {
      'Authorization': `token ${token}`
    }
  });
  if (!response.ok) {
    throw new Error(`Network Error During GET Users Data: ${response.status} ${response.statusText}`);
  }
  return await response.json();
}

async function retrieveUsers() {
  return JSON.parse(
      atob((await fetchJsonServer()).content)
  ) ?? []
}

// getSHA().then(sha => updateJsonServer(sha)).catch(error => console.error('Error:', error));

/**
 * GitHub Repo Token
 */
const token = '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';
/**
 * GitHub API Server URL
 */
const serverRootUrl = `https://api.github.com/repos/Ahmed-Rushdi/json-page-test/contents/`;
const usersUrl = serverRootUrl + "auth_users.json"
const cartUrl = serverRootUrl + "user-carts.json"

/**
 * retrieve sha of JSON server file to be updated
 * @param url url of json server
 * @returns {Promise<*>} sha
 */
async function getSHA(url) {

  const response = await fetch(url, {
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

/**
 * Update the JSON server using GH API
 * https://docs.github.com/en/rest/repos/contents?apiVersion=2022-11-28#update-a-file
 * @param url url of json server
 * @param sha sha of JSON server file to be updated
 * @param newContent JSON of new content to update file
 * @returns {Promise<void>}
 */
async function updateJsonServer(url, sha, newContent) {
  const body = {
    message: "Update DB",
    content: btoa(JSON.stringify(newContent)),
    sha: sha
  };

  const response = await fetch(url, {
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

/**
 * Get the JSON server data using GH API
 * https://docs.github.com/en/rest/repos/contents?apiVersion=2022-11-28#get-repository-content
 * @param {string} url - The URL of the JSON server.
 * @returns {Promise<any>} - A promise that resolves with the JSON data from the server.
 */
async function fetchJsonServer(url) {
  const response = await fetch(url, {
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
/**
 * Fetches users from the server and returns them as an array.
 * If the fetch fails, an error is thrown
 *
 * @returns {Promise<Array>} - A promise that resolves to an array of users.
 */
export async function fetchUsers() {
  return JSON.parse(
      atob((await fetchJsonServer(usersUrl)).content)
  ) ?? []
}

/**
 * Fetches carts from the server and returns them as one JSON object.
 * If the fetch fails, an error is thrown
 *
 * @returns {Promise<Array>} - A promise that resolves to JSON data of carts.
 */
export async function fetchCarts() {
  return JSON.parse(
      atob((await fetchJsonServer(cartUrl)).content)
  ) ?? []
}
/**
 * Update users data on the server.
 *
 * @param {Array} users - The array of user objects to update on the server.
 * @returns {Promise<void>}
 */
export async function putUsers(users) {
  await updateJsonServer(usersUrl, await getSHA(usersUrl), users)
}
/**
 * Update carts data on the server.
 *
 * @param {Array} carts - The array of user objects to update on the server.
 * @returns {Promise<void>}
 */
export async function putCarts(carts) {
  await updateJsonServer(cartUrl, await getSHA(cartUrl), carts)
}


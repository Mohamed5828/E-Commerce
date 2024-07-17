import { getLoggedInUserId } from "./handleAuthentication.js";

/**
 * GitHub Repo Token
 */
const token = "";
/**
 * GitHub API Server URL
 */
const serverRootUrl = `https://api.github.com/repos/Ahmed-Rushdi/json-page-test/contents/`;
const usersUrl = serverRootUrl + "auth_users.json";
const cartUrl = serverRootUrl + "user-carts.json";

/**
 * retrieve sha of JSON server file to be updated
 * @param url url of json server
 * @returns {Promise<*>} sha
 */
async function getSHA(url) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `token ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(
      `Network Error During Get SHA: ${response.status} ${response.statusText}`
    );
  }
  const data = await response.json();
  return data.sha;
}

let putJsonServerLock = Promise.resolve();

// let counter = 0

/**
 * Update the JSON server using GH API PUT
 * This function is locked until the previous update is done
 * https://docs.github.com/en/rest/repos/contents?apiVersion=2022-11-28#update-a-file
 * @param url url of json server
 * @param newContent JSON of new content to update file
 * @returns {Promise<void>}
 */
async function putJsonServer(url, newContent) {
  const body = {
    message: "Update DB",
    content: btoa(JSON.stringify(newContent)),
    sha: "",
  };

  putJsonServerLock = putJsonServerLock.then(async () => {
    try {
      console.log("Acquiring SHA for", url);
      body.sha = await getSHA(url);
      console.log("SHA acquired:", body.sha);
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(
          `Error ${url} Data: ${response.status} ${response.statusText}`
        );
      }
      console.log("PUT request completed with status", response.status);
    } catch (error) {
      console.error("Error during PUT request:", error);
    }
  });
  return putJsonServerLock;
}

/**
 * Get the JSON server data using GH API
 * https://docs.github.com/en/rest/repos/contents?apiVersion=2022-11-28#get-repository-content
 * @param {string} url - The URL of the JSON server.
 * @returns {Promise<any>} - A promise that resolves with the JSON data from the server.
 */
async function fetchJsonServer(url) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `token ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(
      `Network Error During GET Users Data: ${response.status} ${response.statusText}`
    );
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
  return JSON.parse(atob((await fetchJsonServer(usersUrl)).content)) ?? [];
}

/**
 * Fetches carts from the server and returns them as one JSON object.
 * If the fetch fails, an error is thrown
 *
 * @returns {Promise<Array>} - A promise that resolves to JSON data of carts.
 */
export async function fetchCarts() {
  return JSON.parse(atob((await fetchJsonServer(cartUrl)).content)) ?? [];
}

/**
 * Update users data on the server.
 *
 * @param {Array} users - The array of user objects to update on the server.
 * @returns {Promise<void>}
 */
export async function putUsers(users) {
  await putJsonServer(usersUrl, users);
}

/**
 * Update carts data on the server.
 *
 * @param {Array} carts - The array of cart objects to update on the server.
 * @returns {Promise<void>}
 */
export async function putCarts(carts) {
  await putJsonServer(cartUrl, carts);
}

/**
 * Update the user's cart data if it exists or create a new cart with the data.
 *
 * @param {Object} cart - The cart object to update or create.
 * @return {Promise<void>} A promise that resolves once the cart data is updated on the server.
 */
export async function putUserCart(cart) {
  const user_id = getLoggedInUserId();
  const carts = await fetchCarts();
  const index = carts.findIndex((c) => c.user_id === user_id);
  if (index !== -1) {
    carts[index].items = cart;
  } else {
    carts.push({
      user_id: user_id,
      items: cart,
    });
  }
  await putCarts(carts);
}

/**
 * Fetches the cart items for the logged-in user.
 *
 * @return {Promise<Array>} The cart items for the logged-in user, or an empty array if the user has no cart.
 */
export async function fetchUserCart() {
  const user_id = getLoggedInUserId();
  const carts = await fetchCarts();
  const index = carts.findIndex((cart) => cart.user_id === user_id);
  if (index !== -1) {
    return carts[index].items;
  } else {
    return [];
  }
}

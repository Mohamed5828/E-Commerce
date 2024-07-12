import {fetchCarts, fetchUsers} from "./HandleAPI";
import {getLoggedInUserId} from "./handleAuthentication";

function handleCheckout() {

  let user_id = getLoggedInUserId()
  let cart = fetchCarts().then((carts) => {
    carts = carts.filter(cart => cart.user_id === user_id)
  })
  let users = fetchUsers().then(
    (users) => {
      const index = users.findIndex(user => user.id === user_id);
      if (index === -1) {
        throw new Error(`FATAL: User not found: ${user_id}`);
      }
      users[user_id].orders.push({
        date: Date.now(),
        items: cart
      })
    }
  )


}

async function fetchOrders() {
  return await fetchUsers().then(
      (users) => {
        return users[getLoggedInUserId()].orders
      }
  )
}
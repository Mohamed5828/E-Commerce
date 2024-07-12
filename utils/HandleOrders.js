import {fetchCarts, fetchUsers} from "./HandleAPI";
import {getLoggedInUserId} from "./handleAuthentication";

function handleCheckout() {

  let user_id = getLoggedInUserId()
  let cart = fetchCarts().then((carts) => {
    carts = carts.filter(cart => cart.user_id === user_id)
  })
  let users = fetchUsers().then(
    (users) => {
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
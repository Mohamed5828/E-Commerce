import {fetchCarts, fetchUsers, putCarts, putUsers} from "./HandleAPI.js";
import {getLoggedInUserId} from "./handleAuthentication.js";

async function handleCheckout() {

  let user_id = getLoggedInUserId()
  if (user_id === -1) {
    throw new Error(`FATAL: User not found: ${user_id}`);
  }
  let carts = await fetchCarts()
  const cartIdx = carts.findIndex(cart => cart.user_id === user_id)
  if (cartIdx === -1) {
    throw new Error(`FATAL: Cart not found: ${user_id}`);
  }
  let cart = carts[cartIdx].items
  if (!Array.isArray(cart)) {
    cart = [cart]
  }
  await fetchUsers().then(
      (users) => {
        const index = users.findIndex(user => user.id === user_id);
        if (index === -1) {
          throw new Error(`FATAL: User not found: ${user_id}`);
        }
        users[index].orders.push({
          date: new Date().toLocaleString(),
          items: cart
        })
        putUsers(users)
        carts.splice(cartIdx, 1)
        putCarts(carts)
      }
  )


}

async function fetchOrders() {
  return await fetchUsers().then(
      (users) => {
        const index = users.findIndex(user => user.id === getLoggedInUserId());
        if (index === -1) {
          throw new Error(`FATAL: User not found: ${getLoggedInUserId()}`);
        }
        return users[index].orders
      }
  )
}

export function populateOrders(section) {
  fetchOrders().then(
      (orders) => {
        orders.reverse()
        // console.log(orders)
        orders.forEach(order => {
          console.log(order.items.items)
          let orderItems = ""
          let orderTotal = 0
          order.items.forEach(item => {
            console.log(item)
            orderItems += `<div class="order-item">
              <img src="${item.thumbnail}" alt="Loading item">
              <article>
                <p><b>Product Name:</b> ${item.title}</p>
                <p><b>Price:</b> ${item.price}</p>
                                <p><b>Item status:</b> Lorem ipsum dolor sit amet</p>

              </article>
            </div>`
            orderTotal += parseFloat(item.price)
          })
          section.innerHTML += `
            <div class="order-card-item">
              <header>
                <p>Order Date ${order.date}</p>
              </header>
              <hr>
              ${orderItems}
              <hr>
              <footer>
                <p><b>Order status:</b> Lorem ipsum dolor sit amet</p>
                <p><b>Order Total:</b>${orderTotal}</p>
              </footer>
            </div>
          `
        })
      }
  ).catch((e) => console.error(e))
}
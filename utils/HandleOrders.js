import {fetchCarts, fetchUsers, putUsers} from "./HandleAPI.js";
import {getLoggedInUserId} from "./handleAuthentication.js";

async function handleCheckout() {

  let user_id = getLoggedInUserId()
  let cart = await fetchCarts().then((carts) => {
    return carts.filter(cart => cart.user_id === user_id)
  })
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
        orders.forEach(order => {
          let orderItems = ""
          let orderTotal = 0
          order.forEach(item => {
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
          section.append(`
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
          `)
        })
      }
  ).catch((e) => console.error(e))
}
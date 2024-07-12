import {populateOrders} from "../utils/HandleOrders.js";
import {logout, getLoggedInUserId} from "../utils/handleAuthentication.js";
import {fetchUsers} from "../utils/HandleAPI.js";

window.addEventListener("DOMContentLoaded", () => {
  let userId = getLoggedInUserId()
  if (userId === -1) {
    location.href = `../layout/auth.html`
  }
  document.getElementById("signout-btn").addEventListener("click", logout)
  fetchUsers().then((users) => {
    let user = users.find(user => user.id === userId)
    if (user) {
      document.getElementById("profile_name").textContent = user.name
      document.getElementById("profile_email").textContent = user.email
    }
  }).catch((e) => console.error(e))
  populateOrders(document.getElementById("scroll-orders"))
})
// <div class="order-card-item">
//         <header>
//           <p>Order Date</p>
//         </header>
//         <hr>
//         <div class="order-item">
//           <img src="https://placeholder.com/150x150" alt="Order item">
//           <article>
//             <p>Product Name:</p>
//             <p>Price:</p>
//             <p>Quantity:</p>
//           </article>
//         </div>
//         <hr>
//         <footer>
//           <p><b>Status:</b> Lorem ipsum dolor sit amet</p>
//           <p><b>Order Total:</b>X,XXX EGP</p>
//         </footer>
//       </div>

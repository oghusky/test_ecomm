const store_name = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRBXCbGLhazNH7hNsSXjUlLKDuaM1dWbIQ0pRFGdYXYaJReEHbrGB0Sejj6IkEUvrniXjkHqhKdxzi4/pub?gid=0&single=true&output=csv"
const item_info = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRBXCbGLhazNH7hNsSXjUlLKDuaM1dWbIQ0pRFGdYXYaJReEHbrGB0Sejj6IkEUvrniXjkHqhKdxzi4/pub?gid=507965659&single=true&output=csv"
const form_url = "https://docs.google.com/forms/u/0/d/1W9c7PMJYYudHuudrwF2zDthSOz6zLJR3_1iKjZwTsoU/prefill"
// show amount of items added to cart
document.querySelector("#cart-count").textContent = `${JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")).length : 0}`

// set store name
d3.csv(store_name).then(data => {
  document.title = `${data[0].store_name}`
  document.querySelector("h1.text-center").innerHTML = `${data[0].store_name}`;
})

// set item info
d3.csv(item_info)
  .then(data => {
    // items container on index page
    if (window.location.pathname.includes("index.html")) {
      const items = data.filter((item, i, arr) => arr[i] !== arr[arr.length])
      const itemDev = document.querySelector("#items");
      // calculate iframe width by device width
      let itemDivWidth = itemDev.clientWidth > 520 ? 300 : itemDev.clientWidth - 60
      items.map(item => {
        itemDev.innerHTML += `
      <div class="col-lg-4 col-md-3 col-sm-12">
      <div class="p-3">
          <div class="outer-iframe">
            <iframe loading="lazy" src="${item.img_url.split('"')[1]}" width="${itemDivWidth}" height="${itemDivWidth}" style="display:block; margin:0 auto;"></iframe>
          </div>
          <div class="card-body">
            <h5 class="card-title">${item.product_name}</h5>
            <p class="card-text">${item.product_description}</p>
            <h5 class="text-center"><b>$${item.product_price}</b></h5>
            <p class="text-center">
            <button
            class="btn btn-primary"
              onClick="addItem(this)"
              data-name="${item.product_name}" 
              data-price="${item.product_price}"
              data-desc="${item.product_description}"
              >ADD TO CART</button>
              </p>
              </div>
              </div>
              </div>
              `
      })
    }
    // items container on cart page
    if (window.location.pathname.includes("cart.html")) {
      const items = document.querySelector("#items");
      showCart(items);
    }
  })
  .catch(err => console.log(err));


function addItem(thisItem) {
  if (localStorage.getItem("cart") === null) {
    localStorage.setItem("cart", JSON.stringify([{
      id: Date.now(),
      name: thisItem.dataset.name,
      price: thisItem.dataset.price,
      desc: thisItem.dataset.desc
    }]))
  }
  else {
    localStorage.setItem("cart", JSON.stringify([...JSON.parse(localStorage.getItem("cart")), {
      id: Date.now(),
      name: thisItem.dataset.name,
      price: thisItem.dataset.price,
      desc: thisItem.dataset.desc
    }]))
  }
  document.querySelector("#cart-count").textContent = `${JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")).length : 0}`
}

function removeItem(thisItem) {
  const items = document.querySelector("#items");
  const filteredItems = JSON.parse(localStorage.getItem("cart")).filter(item => String(item.id) !== thisItem.dataset.removeid);
  localStorage.setItem("cart", JSON.stringify(filteredItems));
  showCart(items);
}

function showCart(items) {
  clearCart(items);
  if (localStorage.getItem("cart") === null || JSON.parse(localStorage.getItem("cart")).length === 0) items.innerHTML = `
      <h2 class="text-center form-text">YOUR CART IS EMPTY</h2>
      <p class="text-center form-text"><a href="index.html">ADD ITEMS</a></p>
      `
  else {
    const addyForm = document.createElement("div");
    addyForm.setAttribute("id", "user-form")
    let totalCost = 0
    JSON.parse(localStorage.getItem("cart")).map(item => {
      items.innerHTML += `
            <div class="cart-item card m-1 py-1">
              <h3>$${item.price}</h3>
              <h3>${item.name}</h3>
              <p>${item.desc}</p>
              <button class="btn btn-danger" data-removeid="${item.id}" onClick="removeItem(this)">REMOVE ITEM</button>
            </div>
          `
      totalCost += parseFloat(item.price);
    });
    addyForm.innerHTML = `
          <h3 id="total-cost">Total Cost: $<span>${parseFloat(totalCost)}</span></h3>
          <form class="my-2 card" id="cart-form">
            <h3 class="text-center mt-3">Mailing Information</h3>
            <div class="my-3 px-3">
              <label class="form-label">Email address</label>
              <input type="email" class="form-control" name="email" placeholder="john@email.com" required/>
              <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3 px-3">
              <label class="form-label">Full Name</label>
              <input type="text" class="form-control" name="name" placeholder="John Doe" required/>
            </div>
            <div class="mb-3 px-3">
              <label class="form-label">Mailing Address</label>
              <input type="text" class="form-control" name="addy" placeholder="123 Main St" required/>
            </div>
            <div class="mb-3 px-3">
              <label class="form-label">Suite</label>
              <input type="text" class="form-control" name="suite" placeholder="Suite/Apt-3"/>
            </div>
            <div class="mb-3 px-3">
              <label class="form-label">City</label>
              <input type="text" class="form-control" name="city" placeholder="Atlanta" required/>
            </div>
            <div class="mb-3 px-3">
              <label class="form-label">State</label>
              <input type="text" class="form-control" name="state" placeholder="Georgia" required/>
            </div>
            <div class="mb-3 px-3">
              <label class="form-label">Zip</label>
              <input type="zip" class="form-control" name="zip" placeholder="30334" required/>
            </div>
            <p class="text-end px-3">
              <button class="btn btn-primary" id="submit-btn">SUBMIT</button>
            </p>
          </form>
        `
    items.append(addyForm);
  }
  document.querySelector("#cart-count").textContent = `${JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")).length : 0}`
}
function clearCart(items) {
  items.innerHTML = ""
}

// dynamic eventlisteners
document.addEventListener("submit", (e) => {
  e.preventDefault();
  if (e.target.getAttribute("id") === "cart-form") {
    const cartItems = JSON.parse(localStorage.getItem("cart"));
    // grab all inputs
    const allInputs = document.querySelectorAll("input");
    // create customerObject
    const customerInfo = {}
    // grab input values based on input name value
    allInputs.forEach(input => {
      let attribute = input.getAttribute("name")
      customerInfo[attribute] = input.value;
    })
    // combine cart items and customer info
    const cartAndCustomer = cartItems.map((cart, i) => {
      if (i === 0) {
        return {
          order_id: `${String(Date.now()).slice(1, 13)}-h`,
          addy: customerInfo.addy,
          city: customerInfo.city,
          email: customerInfo.email,
          name: customerInfo.name,
          state: customerInfo.state,
          suite: customerInfo.suite,
          zip: customerInfo.zip,
          item_name: cart.name,
          order_price: document.querySelector("#total-cost span").textContent
        }
      } else {
        return {
          order_id: `${String(Date.now()).slice(1, 13)}-h`,
          item_name: cart.name,
          order_price: document.querySelector("#total-cost span").textContent
        }
      }
    });
    console.log(cartAndCustomer);
    cartAndCustomer.forEach(item => {
      $.post()
    })
  }
})
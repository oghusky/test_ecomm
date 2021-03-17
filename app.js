console.log("app js")
// const store_name = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRBXCbGLhazNH7hNsSXjUlLKDuaM1dWbIQ0pRFGdYXYaJReEHbrGB0Sejj6IkEUvrniXjkHqhKdxzi4/pub?gid=0&single=true&output=csv"
// const item_info = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRBXCbGLhazNH7hNsSXjUlLKDuaM1dWbIQ0pRFGdYXYaJReEHbrGB0Sejj6IkEUvrniXjkHqhKdxzi4/pub?gid=507965659&single=true&output=csv"
// const form_url = "https://docs.google.com/forms/u/0/d/1W9c7PMJYYudHuudrwF2zDthSOz6zLJR3_1iKjZwTsoU/prefill"
// d3.csv(item_info)
//   .then(data => {
//     console.log(data);
//     const items = data.filter((item, i, arr) => arr[i] !== arr[arr.length])
//     const itemDev = document.querySelector("#items");
//     items.map(item => {
//       itemDev.innerHTML += `
//       <div class="col-lg-4 col-md-3 col-sm-6">
//         <div class="card">
//           <div class="outer-iframe">
//             <iframe src="${item.img_url.split('"')[1]}" width="300" height="300" style="display:block; margin:0 auto;"></iframe>
//           </div>
//           <div class="card-body">
//             <h5 class="card-title">${item.product_name}</h5>
//             <p class="card-text">${item.product_description}</p>
//             <p class="text-center">
//             <button
//             class="btn btn-primary"
//             onClick="addItem(this)"
//             data-name="${item.product_name}" 
//             data-price="${item.product_price}">ADD TO CART</button>
//             </p>
//           </div>
//         </div>
//       </div>
//       `
//     })
//   })
//   .catch(err => console.log(err));


// function addItem(x) {
//   console.log(x);
// }

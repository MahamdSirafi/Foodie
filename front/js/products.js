// Helpful Variables for Cart & Main Products
let iconCart = document.querySelector(".icon-cart");
let body = document.querySelector("body");
let closeCart = document.querySelector(".close");
let breakfast = document.getElementById("breakfast");
let lunch = document.getElementById("lunch");
let dinner = document.getElementById("dinner");
let drinks = document.getElementById("drinks");
let deserts = document.getElementById("deserts");
let listProducts = [];
// Showing Products Function
const addDataToHTML = () => {
  if (listProducts.length > 0) {
    ``;
    listProducts.forEach((product) => {
      let newProduct = document.createElement("div");
      newProduct.classList.add("box");
      newProduct.innerHTML = `<div class="image">
                                            <img src="${product.image}" crossorigin="anonymous" alt="">
                                            <a href="#" class="fas fa-heart"></a>
                                        </div>
                                        <div class="content">
                                            <div class="stars">
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star-half-alt"></i>
                                            </div>
                                            <h3>${product.name}</h3>
                                            <p>${product.description}.</p>
                                            <a href="#" class="btn" id="${product._id}">add to cart</a>
                                            <span class="price">$${product.price}</span>
                                        </div>`;
      switch (product.category) {
        case "breakfast": {
          breakfast.appendChild(newProduct);
          break;
        }
        case "lunch": {
          lunch.appendChild(newProduct);
          break;
        }
        case "dinner": {
          dinner.appendChild(newProduct);
          break;
        }
        case "drinks": {
          drinks.appendChild(newProduct);
          break;
        }
        case "deserts": {
          deserts.appendChild(newProduct);
          break;
        }
      }
    });
  }
};
const initApp = () => {
  // get data from json
  fetch("http://localhost:7000/api/v1.0.0/products")
    .then((response) => response.json())
    .then((data) => {
      listProducts = data.doc;
      console.log(listProducts);
      addDataToHTML();
      // get cart from memory
      if (localStorage.getItem("productCart")) {
        listcard = JSON.parse(localStorage.getItem("productCart"));
      }
    });
};
initApp();

let breakfast = document.getElementById("breakfast");
let lunch = document.getElementById("lunch");
let menu = document.getElementById("menu");
let dinner = document.getElementById("dinner");
let drinks = document.getElementById("drinks");
let deserts = document.getElementById("deserts");
let listProducts = [];
let listcard = [];

menu.addEventListener("click", (event) => {
  event.preventDefault();
  let positionClick = event.target;
  if (positionClick.classList.contains("addcart")) {
    let product_id = positionClick.dataset.id;
    let price = +positionClick.dataset.price;
    let img = positionClick.dataset.img;
    let name = positionClick.dataset.name;
    console.log(positionClick.dataset);
    addToCart(product_id, price, img, name);
  }
});

// Showing Products Function
const addDataToHTML = () => {
  if (listProducts.length > 0) {
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
                                            <a class="btn addcart" data-id="${product._id}" data-price="${product.price}" data-img="${product.image}" data-name="${product.name}" >add to cart</a>
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
      addDataToHTML();
    });
};
initApp();

//////////////////////////////////////////
const addToCart = (id, price, img, name) => {
  let positionThisProductInCart = listcard.findIndex(
    (value) => value.product == id
  );
  if (listcard.length <= 0) {
    listcard = [
      {
        name,
        product: id,
        quantity: 1,
        price,
        img,
      },
    ];
  } else if (positionThisProductInCart < 0) {
    listcard.push({
      product: id,
      quantity: 1,
      name,
      price,
      img,
    });
  } else {
    listcard[positionThisProductInCart].quantity++;
    listcard[positionThisProductInCart].price += price;
  }
  addCartToMemory();
};
// To Store Cart Products In Memory

const addCartToMemory = () => {
  localStorage.setItem("cart", JSON.stringify(listcard));
};

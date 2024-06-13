let box = document.getElementById("box");
let listProducts = [];
let cart = [];

if (localStorage.getItem("cart")) {
  cart = JSON.parse(localStorage.getItem("cart"));

  cart.forEach((element) => {
    let newProduct = document.createElement("div");
    newProduct.classList.add("box");
    newProduct.innerHTML = `
    <button class="fas fa-times deleteitem" type="submit" data-id=${
      element.product
    } id="delete"></button>
    <img src="${element.img}" crossorigin="anonymous" alt="">
    <div class="name">${element.name}</div>
    <div class="flex">
        <div class="price"><span>$</span>${
          element.price / element.quantity
        }</div>
        <input type="number" name="qty" class="qty" min="1" max="99" value="${
          element.quantity
        }" onkeypress="if(this.value.length == 2) return false;">
        <button type="submit" class="fas fa-edit edit" data-id=${
          element.product
        } id="edit"></button>
    </div>
    <div class="sub-total">sub total : <span>$${element.price}</span></div>`;
    box.append(newProduct);
  });
}

box.addEventListener("click", (event) => {
  if (event.target.classList.contains("deleteitem")) {
    let start = cart.findIndex(
      (value) => value.product == event.target.dataset.id
    );
    cart.splice(start, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "./cart.html";
  }
  if (event.target.classList.contains("edit")) {
    let index = cart.findIndex(
      (value) => value.product == event.target.dataset.id
    );
    let inputQun = event.target.parentNode.children[1].value;
    let priceOne = cart[index].price / cart[index].quantity;
    cart[index].quantity = inputQun;
    console.log(" cart[index].quantity ", cart[index].quantity);
    cart[index].price = inputQun * priceOne;
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "./cart.html";
  }
});
let deletAll = document.getElementById("deleteall");
deletAll.addEventListener("click", () => {
  confirm("delete all from cart?");
  localStorage.removeItem("cart");
  window.location.href = "./cart.html";
});

//////////////////////////total////////////////////////////
let total = document.getElementById("total");
let sum = 0;
cart.forEach((item) => {
  sum += item.price;
  total.innerHTML = `$${sum}`;
});
localStorage.total = sum;
///////////////////////////////////////////////////////////

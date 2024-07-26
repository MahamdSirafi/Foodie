const tbody = document.getElementById("tbody");
const QS = window.location.search;
const param = new URLSearchParams(QS);
fetch(`http://localhost:7000/api/v1.0.0/orders/${param.get("orderId")}`, {
  method: "GET",
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
})
  .then((response) => response.json())
  .then((data) => {
    let box = document.getElementById("box");
    let listProducts = [];
    let cart = [];

    if (data.doc.cart) {
      cart = data.doc.cart;

      cart.forEach((element) => {
        let newProduct = document.createElement("div");
        newProduct.classList.add("box");
        newProduct.innerHTML = `
        <img src="${element.product.image}" crossorigin="anonymous" alt="">
        <div class="name">${element.product.name}</div>
        <div class="flex">
            <div class="price"><span>$</span>${
              element.price / element.quantity
            }</div>
            count :${
              element.quantity
            }
        </div>
        <div class="sub-total">sub total : <span>$${
          element.price
        }</span></div>`;
        box.append(newProduct);
      });
    }

    let total = document.getElementById("total");
    let sum = 0;
    cart.forEach((item) => {
      sum += item.price;
      total.innerHTML = `$${sum}`;
    });
    localStorage.total = sum;
  });

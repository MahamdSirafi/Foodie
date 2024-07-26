const tbody = document.getElementById("tbody");
fetch("http://localhost:7000/api/v1.0.0/users?role=delivery", {
  method: "GET",
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    listProducts = data.doc;
    listProducts.forEach((element) => {
      let newproduct = document.createElement("tr");

      newproduct.innerHTML = `<td>${element.name}</td>
    <td>${element.email}</td>
    <td>${Math.round(Math.random() * 5)}</td>
    <td>${Math.round(10 + Math.random() * 20)}</td>
    <td>
     <button data-id="${element._id}" class="delete-product-btn">Delete</button>
      </td>`;
      //   <button data-id="${element._id}" class="update-product-btn">update</button>
      tbody.append(newproduct);
    });
  });
tbody.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-product-btn")) {
    event.preventDefault();

    fetch(`http://localhost:7000/api/v1.0.0/users/${event.target.dataset.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if ((data.status = "success")) {
          alert("delete success");
          window.location.href = "./dashbordDli.html";
        } else {
          alert(data.messag);
        }
      });
  }
});

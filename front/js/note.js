const tbody = document.getElementById("tbody");
fetch("http://localhost:7000/api/v1.0.0/messages", {
  method: "GET",
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    listProducts = data.doc;
    listProducts.forEach((element) => {
      let newproduct = document.createElement("tr");

      newproduct.innerHTML = `<td>${element.message}</td>
    <td>${element.createdAt}</td>
    <td>
     <button data-id="${element._id}" class="delete-product-btn">Delete</button>
      </td>`;
      tbody.append(newproduct);
    });
  });
tbody.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-product-btn")) {
    event.preventDefault();

    fetch(
      `http://localhost:7000/api/v1.0.0/messages/${event.target.dataset.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if ((data.status = "success")) {
          alert("delete success");
          window.location.href = "./note.html";
        } else {
          alert(data.messag);
        }
      });
  }
});

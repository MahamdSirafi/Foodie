const tbody = document.getElementById("tbody");
fetch("http://localhost:7000/api/v1.0.0/orders/mien/delivery?fields=-cart", {
  method: "GET",
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
})
  .then((response) => response.json())
  .then((data) => {
    listOrders = data.doc;
    listOrders.forEach((element) => {
      let newproduct = document.createElement("tr");
      newproduct.innerHTML = `<td>${element.user.name}</td>
    <td>${element.phone}</td>
    <td>${element.total}</td>
    <td>${element.paidstatus}</td>
    <td>${element.location.address}</td>
    <td>${element.location.region}</td>
    <td>${element.createdAt}</td>
    <td>
     <button data-id="${element._id}" class="set-btn" id="set" >Receive money</button>
      </td>`;
      tbody.append(newproduct);
    });
    createSelect();
  });

tbody.addEventListener("click", (event) => {
  if (event.target.classList.contains("set-btn")) {
    event.preventDefault();
    fetch(
      `http://localhost:7000/api/v1.0.0/orders/${event.target.dataset.id}/paid`,
      {
        method: "PATCH",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if ((data.status = "success")) {
          alert("success");
          window.location.href = "./ordersDliv.html";
        } else {
          alert(data.message);
        }
      });
  }
});

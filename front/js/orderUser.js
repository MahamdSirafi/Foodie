const tbody = document.getElementById("tbody");
fetch("http://localhost:7000/api/v1.0.0/orders/mien", {
  method: "GET",
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
})
  .then((response) => response.json())
  .then((data) => {
    listOrders = data.doc;
    listOrders.forEach((element) => {
      let newproduct = document.createElement("tr");
      newproduct.innerHTML = `<td>${element.status}</td>
    <td>${element.dilivary_price}</td>
    <td>${element.total}</td>
    <td>${element.paidstatus}</td>
    <td>${element.duration}</td>
    <td>${element.createdAt}</td>
    <td>
     <button data-id="${element._id}" class="set-btn" id="details">Receive</button>
      </td>`;
      tbody.append(newproduct);
    });
  });

tbody.addEventListener("click", (event) => {
  if (event.target.classList.contains("set-btn")) {
    event.preventDefault();
    fetch(
      `http://localhost:7000/api/v1.0.0/orders/${event.target.dataset.id}/done`,
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
          if (data.message) alert(data.message);
          else {
            alert("success");
            window.location.href = "./ordersUser.html";
          }
        } else {
          alert(data.message);
        }
      });
  }
});

const tbody = document.getElementById("tbody");
fetch("http://localhost:7000/api/v1.0.0/orders?status=Preparing", {
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
    <td>${element.createdAt}</td>
    <td>
     <button data-id="${element._id}" class="details-btn" id="details">Details</button>
     <button data-id="${element._id}" class="set-btn" id="set" >Set driver</button>
     <select class="dliv" id="${element._id}" class="box"></select>
      </td>`;
      tbody.append(newproduct);
    });
    createSelect();
  });

tbody.addEventListener("click", (event) => {
  if (event.target.classList.contains("set-btn")) {
    event.preventDefault();
    console.log(event.target.dataset.id);
    let dataBody = {
      delivery: document.getElementById(`${event.target.dataset.id}`).value,
      status: "Out For Delivery",
    };
    console.log(dataBody);
    fetch(
      `http://localhost:7000/api/v1.0.0/orders/${event.target.dataset.id}`,
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
        body: JSON.stringify(dataBody),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if ((data.status = "success")) {
          alert("success");
          window.location.href = "./orders.html";
        } else {
          alert(data.messag);
        }
      });
  }
});
createSelect = () => {
  const dliv = document.querySelectorAll(".dliv");
  fetch(`http://localhost:7000/api/v1.0.0/users?role=delivery`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if ((data.status = "success")) {
        dliv.forEach((sel) => {
          data.doc.forEach((item) => {
            let option = document.createElement("option");
            option.setAttribute("value", item._id);
            option.innerText = item.name;
            sel.append(option);
          });
        });
      } else {
        alert(data.messag);
      }
    });
};

////////////////////////////////////////////////////////////
tbody.addEventListener("click", (event) => {
  if (event.target.classList.contains("details-btn")) {
    console.log("object");
    window.location.href = `./details.html?orderId=${event.target.dataset.id}`;
  }
});

//get One
document.body.addEventListener("click", (elem) => {
  console.log("object");
  if (elem.target.className === "update-product-btn") {
    const Iprod = elem.target.getAttribute("data-id");
    // console.log(Idcar);
    fetch(`http://localhost:7000/api/v1.0.0/products/${Iprod}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == "success") {
          document.body.innerHTML = ` <div class="container">
      <h1>Update product</h1>
        <input
          type="text"
          value="${data.doc._id}"
          id="id"
          style="display: none;;"
        />
      <form id="update">
        <label style="margin-top: 20px" class="category">category:</label>
        <select
          style="
            margin-top: 20px;
            width: 90%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
          "
          id="category"
          value="${data.doc.category}"
          name="category"
          class="input"
          required
        >
          <option value="deserts">Deserts</option>
          <option value="drinks">Drinks</option>
          <option value="dinner">Dinner</option>
          <option value="lunch">Lunch</option>
          <option value="breakfast">Breakfast</option>
        </select>
        <label class="name">Name:</label>
        <input
          type="text"
          value="${data.doc.name}"
          id="name"
          name="name"
          placeholder="Enter name"
          required
        />
        <label class="name">image:</label>
        <input
          type="file"
          id="file-image"
          name="name"
          placeholder="Enter image"
          required
        />

        <label class="name">price:</label>
        <input
          type="number"
          value="${data.doc.price}"
          id="price"
          name="name"
          placeholder="Enter price"
          required
        />

        <label class="name">description:</label>
        <input
          type="text"
          value="${data.doc.description}"
          id="description"
          name="name"
          placeholder="Enter description"
          required
        />
        <label class="name">quantity_available:</label>
        <input
          type="number"
          value="${data.doc.quantity_available}"
          id="quantity_available"
          name="name"
          placeholder="Enter quantity_available"
          required
        />
        <label class="name">total_quantity:</label>
        <input
          type="number"
          value="${data.doc.total_quantity}"
          id="total_quantity"
          name="name"
          placeholder="Enter total_quantity"
          required
        />

        <button type="submit">Save product</button>
      </form>
    </div>`;
          update();
        } else {
          alert(data.messag);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
//update
const update = () => {
  let form = document.getElementById("update");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const fileInput = document.getElementById("file-image");
    const file = fileInput.files[0];
    const formData = new FormData();
    if (file) {
      formData.append("image", file);
    }
    formData.append("name", document.getElementById("name").value);
    formData.append("price", document.getElementById("price").value);
    formData.append("category", document.getElementById("category").value);
    formData.append(
      "description",
      document.getElementById("description").value
    );
    formData.append(
      "quantity_available",
      document.getElementById("quantity_available").value
    );
    formData.append(
      "total_quantity",
      document.getElementById("total_quantity").value
    );
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
    try {
      fetch(
        `http://localhost:7000/api/v1.0.0/products/${
          document.getElementById("id").value
        }/upload`,
        {
          method: "PATCH",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: headers,
          body: formData,
          redirect: "follow",
          referrerPolicy: "no-referrer",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.status == "success") {
            alert("success");
            window.location.href = "./dashbord.html";
          } else {
            alert(data.message);
          }
        });
    } catch (err) {
      console.log(err);
    }
  });
};

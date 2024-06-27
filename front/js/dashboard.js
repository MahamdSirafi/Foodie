const tbody = document.getElementById("tbody")
fetch('http://localhost:7000/api/v1.0.0/products')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        listProducts = data.doc;
        listProducts.forEach(element => {
            let newproduct = document.createElement('tr');

            newproduct.innerHTML = `<td>${element.name}</td>
    <td>${element.category}</td>
    <td><img src="${element.image}" crossorigin="anonymous" width="100px" height="100px"></td>
    <td>${element.price}</td>

    <td>${element.quantity_available}</td>
    <td>${element.total_quantity}</td>
    <td>
     <button data-id="${element._id}" class="delete-product-btn">Delete</button>
      </td>`
            //   <button data-id="${element._id}" class="update-product-btn">update</button>
            tbody.append(newproduct)
        });

    })
tbody.addEventListener("click", (event) => {
    if (event.target.classList.contains('delete-product-btn')) {
        event.preventDefault()

        fetch(`http://localhost:7000/api/v1.0.0/products/${event.target.dataset.id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status = "success") {
                    alert("delete success")
                    window.location.href = "./dashbord.html"
                }
                else {
                    alert(data.messag)

                }
            })
    }
})
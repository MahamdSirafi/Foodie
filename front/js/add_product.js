const form = document.getElementById("add")
// console.log(form)
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const fileInput = document.getElementById("image");
    const file = fileInput.files[0];
    const formData = new FormData();
    if (file) {
        formData.append("image", file);
    }
    formData.append("name", document.getElementById("name").value);
    formData.append("description", document.getElementById("description").value);
    formData.append("quantity_available", document.getElementById("quantity_available").value);
    formData.append("total_quantity", document.getElementById("total_quantity").value);
    formData.append("price", document.getElementById("price").value);
    formData.append("category", document.getElementById("category").value);

    const headers = new Headers();
    headers.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
  console.log(formData)
    try {
        fetch("http://localhost:7000/api/v1.0.0/products", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: headers,
            body: formData,
            redirect: "follow",
            referrerPolicy: "no-referrer",
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status == "success") {
                    window.location.href = "./dashbord.html";
                }
                else {
                    alert(data.message);
                }
            });
    } catch (err) {
        Swal.fire({
            text: `${data.message}`,
            icon: "error",
            showCloseButton: true,
            confirmButtonColor: "#068331",
            showClass: {
                popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
                popup: "animate__animated animate__fadeOutUp",
            },
        });
    }
})
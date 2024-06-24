
const form = document.getElementById("order")

form.addEventListener("submit", (eve) => {

    eve.preventDefault();
    let x = Math.round(Math.random() * 2000 + 1000)
    const data = {
        cart: JSON.parse(localStorage.getItem("cart")),
        location: {
            address: document.getElementById("address").value,
            region: document.getElementById("region").value
        },
        phone: document.getElementById("phone").value,
        dilivary_price: x,
        total: x + +localStorage.getItem("total"),
        duration: Math.round(Math.random() * 60 + 15),
        paidstatus: document.getElementById("type").value,
    }
    try {
        fetch("http://localhost:7000/api/v1.0.0/orders", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status == "success") {
                    localStorage.removeItem("cart")
                    localStorage.removeItem("total")
                    localStorage.removeItem("card")

                    if (document.getElementById("type").value == "bank")
                        window.location.href = "./bank.html";

                    window.location.href = "./index.html";

                } else {
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
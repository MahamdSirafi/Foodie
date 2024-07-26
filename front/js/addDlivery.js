const form = document.getElementById("add");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  let newData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    role: "delivery",
    password: "123454321",
  };
  try {
    fetch("http://localhost:7000/api/v1.0.0/users", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(newData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == "success") {
          window.location.href = "./dashbordDli.html";
        } else {
          alert(data.message);
        }
      });
  } catch (err) {
    alert(err.message);
  }
});

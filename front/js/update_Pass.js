// To Change Password
const formpass = document.getElementById("formpass");
formpass.addEventListener("submit", (event) => {
  event.preventDefault();
  if (
    document.getElementById("new").value !=
    document.getElementById("confirm").value
  ) {
    alert("error in confirm password");
  } else {
    let data = {
      passwordCurrent: document.getElementById("password").value,
      password: document.getElementById("new").value,
    };
    try {
      fetch("http://localhost:7000/api/v1.0.0/users/updateMyPassword", {
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
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status == "success") {
            localStorage.setItem("token", data.token);
            alert("success");
            window.location.href = "./index.html";
          } else {
            alert(data.message);
          }
        });
    } catch (err) {
      console.log(err.message);
    }
  }
});

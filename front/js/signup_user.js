let form = document.getElementById("sinup");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (
    document.getElementById("passwordConfirm").value !=
    document.getElementById("password").value
  ) {
    Swal.fire({
      text: `اعد تاكيد كلمة المرور`,
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
  } else {
    let data = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };
    try {
      fetch("http://localhost:7000/api/v1.0.0/users/signup", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status == "success") {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            window.location.href = "./index.html";
          } else {
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
        });
    } catch (err) {
      console.log(err);
    }
  }
});

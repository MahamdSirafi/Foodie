let forgot = document.getElementById("rest");
forgot.addEventListener("submit", (event) => {
  event.preventDefault();
  password = document.getElementById("password").value;
  cpassword = document.getElementById("cpassword").value;
  if (cpassword != password) {
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
    let data = { password };
    fetch(localStorage.getItem("url"), {
      method: "PATCH",
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
          localStorage.setItem("user", data.user);
          Swal.fire({
            text: "لقد تم اعادة التعيين بنجاح",
            confirmButtonColor: "#068331",
            confirmButtonText: "حسنا",
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
          });
          setTimeout(() => {
            if (data.user.role === "admin") {
              window.location.href = "./dashboard.html";
            } else if (data.user.role === "user") {
              window.location.href = "./index.html";
            }
          }, 500);
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
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
const toggle = document.querySelector(".toggle");
const pass = document.getElementById("password");
toggle.addEventListener("click", () => {
  if (pass.type === "password") {
    pass.type = "text";
    toggle.classList.replace("bxs-low-vision", "bxs-show");
  } else {
    pass.type = "password";
    toggle.classList.replace("bxs-show", "bxs-low-vision");
  }
});

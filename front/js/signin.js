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

const form = document.getElementById("login");
console.log(form);
const forgot = document.getElementById("forgot");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  let data = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };
  try {
    fetch("http://localhost:7000/api/v1.0.0/users/login", {
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
          if (data.user.role === "admin") {
            window.location.href = "./dashbord.html";
          } else if (data.user.role === "user") {
            window.location.href = "./index.html";
          }
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
});
forgot.addEventListener("click", (e) => {
  e.preventDefault();
  let data = {
    email: document.getElementById("username").value,
  };
  try {
    fetch("http://localhost:7000/api/v1.0.0/users/forgotPassword", {
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
          alert("سيتم الانتقال لصفحة تغيير كلمة المرور");
          window.location.href = "/api/views/user/resetPassword1.ejs";
        } else {
          alert(data.message);
        }
      });
  } catch (err) {
    console.log(err);
  }
});

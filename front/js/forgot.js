let ForgotPassword = document.querySelector(".ForgotPassword");
let email;
ForgotPassword.addEventListener("click", () => {
  email = document.getElementById("email").value;
  let data = { email };
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
        Swal.fire({
          text: "هل تريد السماح لنا بالوصول الى بريدك الاكتروني لقرائة الرمز المرسل",
          confirmButtonColor: "#068331",
          confirmButtonText: "حسنا",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */

          if (!result.isDenied) {
            localStorage.setItem("url", data.url);
            window.location.href = "./forgot.html";
          }
        });
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
}).catch((err) => {
  console.log(err);
});

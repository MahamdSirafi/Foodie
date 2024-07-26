const getData = () => {
  // get data from json
  fetch("http://localhost:7000/api/v1.0.0/users/me", {
    method: "GET",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("name").value = data.doc.name;
      document.getElementById("email").value = data.doc.email;
    });
};
getData();
const form = document.getElementById("formPro");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const fileInput = document.getElementById("file-image");
  const file = fileInput.files[0];
  const formData = new FormData();
  if (file) {
    formData.append("photo", file);
  }
  formData.append("name", document.getElementById("name").value);
  formData.append("email", document.getElementById("email").value);
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
  try {
    fetch("http://localhost:7000/api/v1.0.0/users/updateMeAndUpload", {
      method: "PATCH",
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
          alert("لقد تم التعديل بنجاح");
          getData();
        } else {
          alert(data.message);
        }
      });
  } catch (err) {
    console.log(err);
  }
});

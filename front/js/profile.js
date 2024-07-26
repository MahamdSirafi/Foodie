// get data from json
fetch("http://localhost:7000/api/v1.0.0/users/me", {
  method: "GET",
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
})
  .then((response) => response.json())
  .then((data) => {
    document.getElementById("image").src = data.doc.photo;
  });

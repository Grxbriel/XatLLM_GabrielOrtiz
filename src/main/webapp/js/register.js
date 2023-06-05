// Registro de usuarios

function verify_password() {
  let password1 = document.getElementById("pass").value;

  if (password1.length < 6) {
    alert("La contraseña debe tener al menos 6 caracteres");
  } else {
    registrarUsuario();
  }
}
function registrarUsuario() {
    let ehttp = new XMLHttpRequest();
    let user = document.getElementById("user").value;
    let mail = document.getElementById("mail").value;
    let codeCountry = document.getElementById("codeCountry").value;
    let pass = document.getElementById("pass").value;
  
    console.log(codeCountry);
    ehttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        location.href = "login.html";
        sessionStorage.setItem("mail", document.getElementById("mail").value);
      }
    };
  
    let url =
      "mail=" +
      mail +
      "&pass=" +
      pass +
      "&user=" +
      user +
      "&codeCountry=" +
      codeCountry;
  
    ehttp.open("POST", "http://localhost:8080/Xat_war_exploded/Register");
    ehttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ehttp.send(url);
}
function getCountries() {
  let chttp = new XMLHttpRequest();

  chttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let data = JSON.parse(chttp.responseText);
      let selectElement = document.getElementById("codeCountry");
      selectElement.innerHTML = ""; // empty select
      console.log(data[3]);
      for (let i = 0; i < data.length; i++) {
        let option = document.createElement("option");
        option.value = data[i].code;
        option.textContent = data[i].name;
        selectElement.appendChild(option);
      }
      console.log(data);
    }
  };
  let url = "";

  chttp.open(
    "GET",
    "http://localhost:8080/Xat_war_exploded/Register?" + url,
    true
  );
  chttp.send();
}

# XatLLM_GabrielOrtiz

Este es mi chat
### * Registrar

#### registrarUsuario()
~~~
function registrarUsuario() {
  let xhr = new XMLHttpRequest();
  let user = document.getElementById("user").value;
  let mail = document.getElementById("mail").value;
  let codeCountry = document.getElementById("codeCountry").value;
  let pass = document.getElementById("pass").value;

  console.log(codeCountry);
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      location.href = "login.html";
      sessionStorage.setItem("mail", document.getElementById("mail").value);
    }
  };

  let url = "mail=" + mail + "&pass=" + pass + "&user=" +  user + "&codeCountry=" + codeCountry;

  xhr.open("POST", "http://localhost:8080/Xat_war_exploded/Register");
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(url);
}

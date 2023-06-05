// Logeo de usuarios

function obtenerMail() {
  document.getElementById("mail").value = sessionStorage.getItem("mail");
  sessionStorage.clear();
}

function iniciarSesion() {
  var xhr = new XMLHttpRequest();
  let mail = document.getElementById("mail").value;
  let pass = document.getElementById("pass").value;

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let data = xhr.responseText;
      if (data != "false") {
        console.log(xhr.responseText);
        sessionStorage.setItem("session", data);
        sessionStorage.setItem("mail", mail);
        location.href = "xat.html";
        console.log(pass);
        console.log(mail);
      } else {
        alert("El usuario o la contraseña no existen");
      }
    }
  };

  let url = "http://localhost:8080/Xat_war_exploded/Login?" + "mail=" + mail + "&pass=" + pass;
  xhr.open("GET",url,true);
  xhr.send();
}

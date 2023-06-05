# XatLLM_GabrielOrtiz

## Funciones

### **Registrar**

#### registrarUsuario()
~~~js
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
~~~

#### getCountries()

~~~js
function getCountries() {
  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let data = JSON.parse(xhr.responseText);
      let paises = document.getElementById("codeCountry");
      paises.innerHTML = "";
      console.log(data[3]);
      for (let i = 0; i < data.length; i++) {
        let opcion = document.createElement("opcion");
        opcion.value = data[i].code;
        opcion.textContent = data[i].name;
        paises.appendChild(opcion);
      }
      console.log(data);
    }
  };
  let url = "http://localhost:8080/Xat_war_exploded/Register?"+"";
  xhr.open("GET", url,true);
  xhr.send();
}
~~~

### **Iniciar Sesion**

#### obtenerMail()

~~~js
function obtenerMail() {
  document.getElementById("mail").value = sessionStorage.getItem("mail");
  sessionStorage.clear();
}
~~~

#### iniciarSesion()

~~~js
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

~~~

### **Chat**

#### anadirAmigo()

~~~js

function anadirAmigo() {
  let xhr = new XMLHttpRequest();
  let mail = sessionStorage.getItem("mail");
  let session = sessionStorage.getItem("session");
  let friendMail = document.getElementById("friendMail").value;

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let data = xhr.responseText;
      console.log(data);
      switch (data) {
        case "0":
          alert("El servidor no responde");
          break;
        case "1":
          document.getElementById("friendMail").value = "";
          alert("Se ha agregado correctamente");
          break;
        case "2":
          alert("No se encuentra al amigo");
          break;

        case "3":
          alert("La sesión ha expirado debe iniciar sesion otra vez");
          break;
      }
    }
  };

  let url = "mail=" + mail + "&session=" + session + "&friend=" + friendMail;
  console.log(url);

  xhr.open("POST", "http://localhost:8080/Xat_war_exploded/Friend", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(url);
}

~~~

### recibirListaAmigos

~~~js
function recibirListaAmigos() {
  let xhr = new XMLHttpRequest();
  let mail = sessionStorage.getItem("mail");
  let session = sessionStorage.getItem("session");
  console.log(mail + " " + session);

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let data = JSON.parse(xhr.responseText);
      let selectElement = document.getElementById("receptor");
      selectElement.innerHTML = "";
      console.log(data[0]);
      for (let i = 0; i < data.length; i++) {
        let opcion = document.createElement("opcion");
        opcion.value = data[i];
        opcion.textContent = data[i];
        selectElement.appendChild(opcion);
      }
    }
  };

  let url ="http://localhost:8080/Xat_war_exploded/Friend?"+ "mail=" + mail + "&session=" + session;
  xhr.open("GET",url,true);
  xhr.send();
}

~~~




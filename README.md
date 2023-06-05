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

#### recibirListaAmigos()

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
  
  #### enviarMensaje()
  
  ~~~js
  function enviarMensaje() {
  let xhr = new XMLHttpRequest();
  let mail = sessionStorage.getItem("mail");
  let session = sessionStorage.getItem("session");
  let receptor = document.getElementById("receptor").value;
  let sms = document.getElementById("sms").value;

  console.log(mail + " " + session + " " + " " + receptor + " " + sms);

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("sms").value = "";
    }
  };

  let url ="mail=" + mail +"&session=" +session +"&receptor=" +receptor +"&sms=" +sms;

  xhr.open("POST", "http://localhost:8080/Xat_war_exploded/Xat", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(url);
}
~~~

#### recibirMensaje()

~~~js
function recibirMensaje() {
  let xhr = new XMLHttpRequest();
  let mail = sessionStorage.getItem("mail");
  let session = sessionStorage.getItem("session");
  console.log(mail);
  console.log(session);

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let data = JSON.parse(xhr.responseText);

      if (data.emisor in chat.conversaciones) {
        console.log(data);
        let p = document.createElement("p");
        let br = document.createElement("br");
        document.getElementById(data.emisor).appendChild(p);
        document.getElementById(data.emisor).appendChild(br);
        p.innerHTML = data.emisor + ": " + data.text;
      } else {
        console.log(data.emisor)
        chat.crearChat(data.emisor);
        document.getElementById(data.emisor).style.display = "block";
        let p = document.createElement("p");
        let br = document.createElement("br");
        document.getElementById(data.emisor).appendChild(p);
        document.getElementById(data.emisor).appendChild(br);
        p.innerHTML = data.emisor + ": " + data.text;
      }

      recibirMensaje();
    }
  };

  let url = "http://localhost:8080/Xat_war_exploded/Xat?"+"mail=" + mail + "&session=" + session;
  xhr.open("GET", url, true);
  xhr.send();
}

~~~


## Pruebas

Primero llegamos a la pagina inicial

<img width="1725" alt="Captura de pantalla 2023-06-05 a las 22 01 45" src="https://github.com/Grxbriel/XatLLM_GabrielOrtiz/assets/87373226/5e731f9b-88bb-42f8-b26f-6690ed26cc37">

<img width="1725" alt="Captura de pantalla 2023-06-05 a las 23 14 06" src="https://github.com/Grxbriel/XatLLM_GabrielOrtiz/assets/87373226/60a21d85-ccf0-4270-b428-87e877eaa1ee">

Luego entramos a registrar 
<img width="1723" alt="Captura de pantalla 2023-06-05 a las 22 02 51" src="https://github.com/Grxbriel/XatLLM_GabrielOrtiz/assets/87373226/4fb3ccd6-afd3-4e95-941c-6c0d03666a91">

Que nos mandará a la pagina login, guardando el mail y poniendolo en el input del mail automaticamente

<img width="1725" alt="Captura de pantalla 2023-06-05 a las 22 03 08" src="https://github.com/Grxbriel/XatLLM_GabrielOrtiz/assets/87373226/9a287a5a-f852-4b17-a176-33562d458a90">

Cuando iniciamos sesión, podemos ver que se guarda el mail y la session en el sessionStorage

<img width="1722" alt="Captura de pantalla 2023-06-05 a las 22 03 48" src="https://github.com/Grxbriel/XatLLM_GabrielOrtiz/assets/87373226/0bfb0959-7d82-4314-8fc8-2d1d162446ae">

Ahora añadiremos un amigo
<img width="1723" alt="Captura de pantalla 2023-06-05 a las 22 04 18" src="https://github.com/Grxbriel/XatLLM_GabrielOrtiz/assets/87373226/5c9a0164-4838-440c-ba94-8f540841b914">

Y dando al botón para mostrar amigos apareceran los amigos asociados al mail logeado

<img width="1727" alt="Captura de pantalla 2023-06-05 a las 22 04 49" src="https://github.com/Grxbriel/XatLLM_GabrielOrtiz/assets/87373226/adf7ab26-941e-4ed3-8ec7-40b6a6787958">
<img width="1723" alt="Captura de pantalla 2023-06-05 a las 22 05 40" src="https://github.com/Grxbriel/XatLLM_GabrielOrtiz/assets/87373226/c5b01f24-ee64-4c1e-8ade-4608d9da48c4">

Procedemos a escribir un mensaje para enviar, y le damos a enviar

<img width="1725" alt="Captura de pantalla 2023-06-05 a las 22 06 12" src="https://github.com/Grxbriel/XatLLM_GabrielOrtiz/assets/87373226/c9f23452-9501-49c3-a30e-360ced92a59e">

Le damos al boton cerrar sesión y nos mandará a la pagina de iniciar sesión, vamos a la cuenta a la que hemos enviado el anterior mensaje y ahi al darle a mostrar amigos, seleccionar con el que enviamos previamente el mensaje y presionando iniciar conversación, nos enseña el mensaje enviado.

<img width="1724" alt="Captura de pantalla 2023-06-05 a las 22 07 35" src="https://github.com/Grxbriel/XatLLM_GabrielOrtiz/assets/87373226/704e019e-df27-40ec-bc8d-0401b28dd718">






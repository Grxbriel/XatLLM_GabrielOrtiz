
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



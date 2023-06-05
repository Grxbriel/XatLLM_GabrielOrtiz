
function agregarAmigo() {
  let chttp = new XMLHttpRequest();
  let mail = sessionStorage.getItem("mail");
  let session = sessionStorage.getItem("session");
  let friendMail = document.getElementById("friendMail").value;

  chttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let data = chttp.responseText;
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
          alert("No se encuentra al amigo especificado");
          break;

        case "3":
          alert("El codigo de sesión ha expirado debe loguearse nuevamente");
          break;
      }
    }
  };

  let url = "mail=" + mail + "&session=" + session + "&friend=" + friendMail;
  console.log(url);

  chttp.open("POST", "http://localhost:8080/Xat_war_exploded/Friend", true);
  chttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  chttp.send(url);
}

function recibirListaDeAmigos() {
  let chttp = new XMLHttpRequest();
  let mail = sessionStorage.getItem("mail");
  let session = sessionStorage.getItem("session");
  console.log(mail + " " + session);

  chttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let data = JSON.parse(chttp.responseText);
      let selectElement = document.getElementById("receptor");
      selectElement.innerHTML = "";
      console.log(data[0]);
      for (let i = 0; i < data.length; i++) {
        let option = document.createElement("option");
        option.value = data[i];
        option.textContent = data[i];
        selectElement.appendChild(option);
      }
    }
  };

  let url = "mail=" + mail + "&session=" + session;

  chttp.open(
    "GET",
    "http://localhost:8080/Xat_war_exploded/Friend?" + url,
    true
  );
  chttp.send();
}



// Conversaciones :
class Conversation {
  constructor() {
    this.conversaciones = {};
    this.bandejaEntrada;
    this.target;
    this.targetReference;
  }

  crearChat(mailFriend) {
    if (!(mailFriend in this.conversaciones)) {
      this.conversaciones[mailFriend] = [];
      this.bandejaEntrada = document.createElement("div");
      this.bandejaEntrada.id = mailFriend;
      document.getElementById("mailFriend").append(this.bandejaEntrada);
    }
  }
}

// Inicializar conversation....
var con = new Conversation();

function modificarTarget() {
  console.log(
    "cambio target tRef:" + con.targetReference + "tar:" + con.target
  );

  con.target = document.getElementById("receptor").value;
  mostrarConversation();
}
function logout() {
  sessionStorage.clear();
  location.href = "login.html";
}
function mostrarConversation() {
  if (con.target in con.conversaciones) {
    document.getElementById(con.target).style.display = "block";
    recibirMensaje();
  }
}
function ocultarConversation() {
  console.log(con.targetReference + " " + con.target);
  if (con.targetReference != con.target) {
    document.getElementById(con.targetReference).style.display = "none";
    con.targetReference = con.target;
  }
}

function iniciarConversacion() {
  con.target = document.getElementById("receptor").value;
  con.crearChat(con.target);
  mostrarConversation();
}

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

  let url =
    "mail=" +
    mail +
    "&session=" +
    session +
    "&receptor=" +
    receptor +
    "&sms=" +
    sms;

  xhr.open("POST", "http://localhost:8080/Xat_war_exploded/Xat", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(url);
}

function recibirMensaje() {
  let xhr = new XMLHttpRequest();
  let mail = sessionStorage.getItem("mail");
  let session = sessionStorage.getItem("session");
  console.log(mail);
  console.log(session);

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let data = JSON.parse(xhr.responseText);

      if (data.emisor in con.conversaciones) {
        console.log(data);
        let p = document.createElement("p");
        let br = document.createElement("br");
        document.getElementById(data.emisor).appendChild(p);
        document.getElementById(data.emisor).appendChild(br);
        p.innerHTML = data.emisor + ": " + data.text;
      } else {
        console.log(data.emisor)
        con.crearChat(data.emisor);
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

  let url = "mail=" + mail + "&session=" + session;
  console.log(url);

  xhr.open("GET", "http://localhost:8080/Xat_war_exploded/Xat?" + url, true);
  xhr.send();
}

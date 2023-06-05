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
var chat = new Conversation();

function modificarTarget() {
  console.log(
    "cambio target tRef:" + chat.targetReference + "tar:" + chat.target
  );

  chat.target = document.getElementById("receptor").value;
  mostrarConversation();
}
function logout() {
  sessionStorage.clear();
  location.href = "login.html";
}
function mostrarConversation() {
  if (chat.target in chat.conversaciones) {
    document.getElementById(chat.target).style.display = "block";
    recibirMensaje();
  }
}
function ocultarConversation() {
  console.log(chat.targetReference + " " + chat.target);
  if (chat.targetReference != chat.target) {
    document.getElementById(chat.targetReference).style.display = "none";
    chat.targetReference = chat.target;
  }
}

function iniciarConversacion() {
  chat.target = document.getElementById("receptor").value;
  chat.crearChat(chat.target);
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

  let url ="mail=" + mail +"&session=" +session +"&receptor=" +receptor +"&sms=" +sms;

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

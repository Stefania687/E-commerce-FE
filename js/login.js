const TOKEN = "auth-token";
function printLog(){
    console.log("sono nella funzione printLog");
}
function login() {
console.log("sono nella funzione");
  showLoading(true);

  let options = {
    method: "POST",
  };

  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  console.log("INIZIO LOGIN");
  let loginPromise = fetch(
    "http://localhost:8080/api/utente/login?nome-utente=" +
      username +
      "&password=" +
      password,
    options
  );

  loginPromise.then(function (data) {
    console.log("RISPOSTA ARRIVATA");
    console.log(data);
    data.text().then((token) => {
      console.log("TOKEN ARRIVATO:");
      console.log(token);
      //   sessionStorage.setItem(TOKEN, token);
      localStorage.setItem(TOKEN, token);
      showLoading(false);
    });
  });

  console.log("FINE LOGIN");
}

function printToken() {
  //   let token = sessionStorage.getItem(TOKEN);
  let token = localStorage.getItem(TOKEN);
  alert(token);
}

function test() {
  showLoading(true);

  let options = {
    method: "GET",
    headers: {
      "auth-token": localStorage.getItem(TOKEN),
    },
  };

  console.log("INIZIO TEST");
  let userName = null;
  let testPromise = fetch("http://localhost:8080/test", options);

  testPromise.then((data) => {
    console.log("RISPOSTA ARRIVATA");
    console.log(data);
    data.json().then((user) => {
      console.log("TEST ARRIVATO:");
      console.log(user);
      userName = user["username"];
      document.getElementById("welcome").style = "display: block";
      document.getElementById("dati-utente").innerHTML =
        "NomeUtente: " + userName;
      showLoading(false);
    });
  });

  console.log("FINE TEST");
}

function testPromise() {
  let playPromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve("FINITO TIMEOUT");
    }, 5000);
  });

  console.log("promise mandata");

  playPromise.then((pippo) => {
    alert(pippo);
  });
}

function showLoading(show) {
  if (show) {
      console.log("sto caricando");
    //document.getElementById("loading-spinner").style = "display: block";
  } else {
      console.log("ho finito");
    //document.getElementById("loading-spinner").style = "display: none";
  }
}
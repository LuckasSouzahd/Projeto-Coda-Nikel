myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

//LOGAR NO SISTEMA
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email-input").value;
  const password = document.getElementById("password-input").value;
  const checkSession = document.getElementById("session-check").checked;

  const account = get.account(email);

  if (!account) {
    alert("Opps! verifique o usuário ou a senha.");
    return;
  }

  if (account) {
    if (account.password !== password) {
      alert("Opps! verifique o usuário ou a senha.");
      return;
    }

    saveSession(email, checkSession);

    window.location.href = "home.html";
  }
});

//CRIAR CONTA
document.getElementById("create-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email-create-input").value;
  const password = document.getElementById("password-create-input").value;

  if (email.length < 5) {
    alert("preencha o campo com email válido.");
    return;
  }

  if (password.length < 4) {
    alert("preencha sua senha com no mínimo 4 dígitos");
    return;
  }

  saveAccount({
    login: email,
    password: password,
    transactions: [],
  });

  myModal.hide();

  alert("conta criada com sucesso.");
});

function checkLogged() {
  if (session) {
    sessionStorage.setItem("logged", session);
    logged = session;
  }

  if (logged) {
    saveSession(logged, session);
  }
  window.location.href = "home.html";
}

function saveSession(data, saveSession) {
  if (saveSession) {
    localStorage.setItem("session", data);
  }

  localStorage.setItem("logged", data);
}


const email = document.querySelector(".email");

email.addEventListener("click", () => {

    alert("E-mail copiado!");

});

window.onload = function () {

    const botaoTema = document.getElementById("tema-btn");

    function atualizarIcone() {

        if(document.body.classList.contains("dark")) {
            botaoTema.innerHTML = "☀️";
        }

        else {
            botaoTema.innerHTML = "🌙";
        }

    }

    window.modoEscuro = function () {

        document.body.classList.toggle("dark");

        if(document.body.classList.contains("dark")) {

            localStorage.setItem("tema", "escuro");

        }

        else {

            localStorage.setItem("tema", "claro");

        }

        atualizarIcone();

    }

    const temaSalvo = localStorage.getItem("tema");

    if(temaSalvo === "escuro") {

        document.body.classList.add("dark");

    }

    atualizarIcone();

}
function modoEscuro() {

    document.body.classList.toggle("dark");

}
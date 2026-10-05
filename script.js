let iniciou = false;

const musica = new Audio("ojos-de-girasol.mp3");
musica.loop = true;
musica.volume = 0.35;

function iniciarRetrospectiva() {

    if (iniciou) return;

    iniciou = true;

    musica.play();
    
    const abertura = document.querySelector(".abertura");

    abertura.style.display = "none";

    iniciarIntroducao();
}


function iniciarIntroducao() {

    const telas = document.querySelectorAll(".introducao");

    let atual = 0;

    function mostrarProxima() {

        if (atual >= telas.length) {

            telas.forEach(tela => {
                tela.style.display = "none";
            });

            mostrarHistoria();

            return;
        }

        telas[atual].style.display = "flex";
telas[atual].classList.add("visivel");

setTimeout(() => {
    telas[atual].classList.remove("visivel");
    
    setTimeout(() => {
        telas[atual].style.display = "none";

        atual++;

        mostrarProxima();
    }, 1000);

}, 3000);
    }

    telas.forEach(tela => {
        tela.style.display = "none";
    });

    mostrarProxima();
}


function mostrarHistoria() {

    const historia = document.querySelector("#historia");

    historia.style.display = "block";

    historia.scrollIntoView({
        behavior: "smooth"
    });

}

const historia = document.getElementById("historia");
const indicadores = document.querySelectorAll(".indicador");

const secoesHistoria = [
    document.querySelector(".historia-inicio"),
    document.querySelector(".pagina-estacao"),
    document.querySelector(".pagina-lua"),
    document.querySelector(".pagina-signo"),
    ...document.querySelectorAll(".capitulo"),
    document.querySelector(".final")
];

historia.addEventListener("scroll", () => {
    const scrollAtual = historia.scrollTop;

    let secaoAtual = 0;
    let menorDistancia = Infinity;

    secoesHistoria.forEach((secao, i) => {
        const distancia = Math.abs(secao.offsetTop - scrollAtual);

        if (distancia < menorDistancia) {
            menorDistancia = distancia;
            secaoAtual = i;
        }
    });

   indicadores.forEach((indicador, i) => {
    indicador.classList.toggle("ativo", i === secaoAtual);
});

secoesHistoria.forEach((secao, i) => {
    secao.classList.toggle("secao-ativa", i === secaoAtual);
});

console.log("Quantidade de indicadores:", indicadores.length);
});

/* =========================================
   CONTADOR DESDE 12 DE ABRIL DE 2026
========================================= */

function atualizarContador() {

    const inicio = new Date("2026-04-12T00:00:00");
    const agora = new Date();

    const diferenca = agora - inicio;

    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));

    const horas = Math.floor(
        (diferenca / (1000 * 60 * 60)) % 24
    );

    const minutos = Math.floor(
        (diferenca / (1000 * 60)) % 60
    );

    const segundos = Math.floor(
        (diferenca / 1000) % 60
    );

    document.getElementById("dias").textContent = dias;
    document.getElementById("horas").textContent =
        String(horas).padStart(2, "0");

    document.getElementById("minutos").textContent =
        String(minutos).padStart(2, "0");

    document.getElementById("segundos").textContent =
        String(segundos).padStart(2, "0");
}

atualizarContador();

setInterval(atualizarContador, 1000);

/* =========================================
   SETA DA NOSSA HISTÓRIA
========================================= */

/* =========================================
   SETAS — AVANÇAR PÁGINA
========================================= */

const setasProximas = document.querySelectorAll(".seta-proxima");

setasProximas.forEach((seta) => {

    seta.addEventListener("click", () => {

        const paginaAtual = seta.closest("section");

        const proximaSecao = paginaAtual.nextElementSibling;

        if (proximaSecao) {

            historia.scrollTo({
                top: proximaSecao.offsetTop,
                behavior: "smooth"
            });

        }

    });

});
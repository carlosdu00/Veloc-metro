var mostradorMarcha = document.getElementById("mostradorMarcha")
var VelocidadeAntiga = 5

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener("keydown", function (event) {//detecta qual tecla esta sendo precionada
    console.log(event.key)
    switch (event.key) {
        case "ArrowUp":
            salvarVelocidade(); moto.acelerar(); moverPonteiro();
            break;
        case "ArrowDown":
            salvarVelocidade(); moto.freiar(); moverPonteiro();
            break;
        case "a":
            moto.subirMarcha(); atualizarMostradorMarcha()
            break;
        case "z":
            moto.descerMarcha(); atualizarMostradorMarcha()
            break;
        default:
            break;
    }
})

const moto = {
    velocidade: 0,
    marcha: 0,
    acelerar: function () {
         verificarVelocidade("acelerar");
         if (moto.velocidade > 100) {
            moto.velocidade = 100
        }
    },
    freiar: function () {
        (this.velocidade >= 5) ? this.velocidade -= 5 : this.velocidade = 0
    },
    subirMarcha: function () {
        if (this.marcha < 5) { this.marcha += 1 }
        },
    descerMarcha: function () {
        if (this.marcha > 0 && verificarVelocidade("descer")) {
            this.marcha -= 1
        }
    }
}

function verificarVelocidade(acao) {
    switch (moto.marcha) {
        case 0:
            if (acao == "acelerar") { return false }
            else if (acao == "descer") { return false }
            break;
        case 1:
            if (acao == "acelerar") { moto.velocidade += 5 }
            else if (acao == "descer" && moto.velocidade <= 20) { return true }
            break;
        case 2:
            if (acao == "acelerar") {
                if (moto.velocidade >= 20) { moto.velocidade += 5 }
                else if (moto.velocidade < 20) { moto.velocidade += 2 }
            }
            else if (acao == "descer" && moto.velocidade <= 40) { return true }
            break;
        case 3:
            if (acao == "acelerar") {
                if (moto.velocidade >= 40) { moto.velocidade += 5 }
                else if (moto.velocidade < 40) { moto.velocidade += 2 }
            }
            else if (acao == "descer" && moto.velocidade <= 60) { return true }
            break;
        case 4:
            if (acao == "acelerar") {
                if (moto.velocidade >= 60) { moto.velocidade += 5 }
                else if (moto.velocidade < 60) { moto.velocidade += 2 }
            }
            else if (acao == "descer" && moto.velocidade <= 80) { return true }
            break;
        case 5:
            if (acao == "acelerar") {
                if (moto.velocidade >= 80) { moto.velocidade += 5 }
                else if (moto.velocidade < 80) { moto.velocidade += 2 }
            }
            else if (acao == "descer" && moto.velocidade <= 100) { return true }
            break;
        default:
            window.alert("ERRO!")
            break;
    }
}

async function moverPonteiro() {
    velocidadeMostradaPonteiro = VelocidadeAntiga
    ponteiro = document.getElementById("ponteiro")
    if (VelocidadeAntiga < moto.velocidade) {
        while (velocidadeMostradaPonteiro < moto.velocidade) {
            await sleep(30);
            velocidadeMostradaPonteiro += 1
            ponteiro.setAttribute("style", "transform: rotate(" + (velocidadeMostradaPonteiro * 221 / 100 - 7) + "deg)");
        }
    } else {
        while (velocidadeMostradaPonteiro > moto.velocidade) {
            await sleep(30);
            velocidadeMostradaPonteiro -= 1
            ponteiro.setAttribute("style", "transform: rotate(" + (velocidadeMostradaPonteiro * 221 / 100 - 7) + "deg)");
        }
    }
}

function atualizarMostradorMarcha() {
    mostradorMarcha.innerText = `${moto.marcha}`
}

function salvarVelocidade() {
    VelocidadeAntiga = moto.velocidade //essa variavel é importante para o ponteiro fazer a animaçao para o lado certo
}

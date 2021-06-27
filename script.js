var veiculo

var veiculoEscolhido
const botaomoto = document.getElementById("botaomoto")
const botaocarro = document.getElementById("botaocarro")
const botaoclicado = document.getElementsByClassName("botaoclicado")

function escolhaInicial(veiculoEscolhido) {
    if(veiculoEscolhido == moto){
        botaocarro.className=("botaonormal")
        botaomoto.className=("botaoclicado")
    }
    else{
        botaomoto.className=("botaonormal")
        botaocarro.className=("botaoclicado")
    }
    veiculo = veiculoEscolhido;
    veiculo.velocidade = 0
    veiculo.marcha = 0
    moverPonteiro()
    atualizarMostradorMarcha()
    VelocidadeAntiga = 1
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener("keydown", function (event) {//detecta qual tecla esta sendo precionada
    console.log(event.key)
    switch (event.key) {
        case "ArrowUp":
            salvarVelocidade(); veiculo.acelerar(); moverPonteiro();
            break;
        case "ArrowDown":
            salvarVelocidade(); veiculo.freiar(); moverPonteiro();
            break;
        case "a":
            veiculo.subirMarcha(); atualizarMostradorMarcha()
            break;
        case "z":
            veiculo.descerMarcha(); atualizarMostradorMarcha()
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

const carro = {
    velocidade: 0,
    marcha: 0,
    acelerar: function () {
        verificarVelocidade("acelerar");
        if (carro.velocidade > 100) {
            carro.velocidade = 100
        }
    },
    freiar: function () {
        (this.velocidade >= 5) ? this.velocidade -= 5 : this.velocidade = 0
    },
    subirMarcha: function () {
        if (this.marcha < 5) { this.marcha += 1 }
    },
    descerMarcha: function () {
        if (this.marcha == 0) {
            this.marcha -= 1
        }
        else if (this.marcha > -1 && verificarVelocidade("descer")) {
            this.marcha -= 1
        }
    }
}

function verificarVelocidade(acao) {
    switch (veiculo.marcha) {
        case -1:
            if (acao == "acelerar") {
                if (veiculo.velocidade <= 20) { veiculo.velocidade += 5 }
                if (veiculo.velocidade > 20) { veiculo.velocidade = 20 }
            }
            break;
        case 1:
            if (acao == "acelerar") {
                if (veiculo.velocidade <= 20) { veiculo.velocidade += 5 }
                if (veiculo.velocidade > 20) { veiculo.velocidade = 20 }
            }
            else if (acao == "descer") { return true }
            break;
        case 2:
            if (acao == "acelerar") {
                if (veiculo.velocidade < 20) { veiculo.velocidade += 2 }
                else if (veiculo.velocidade >= 20 && veiculo.velocidade <= 40) { veiculo.velocidade += 5 }
                if (veiculo.velocidade > 40) { veiculo.velocidade = 40 }
            }
            else if (acao == "descer" && veiculo.velocidade <= 40) { return true }
            break;
        case 3:
            if (acao == "acelerar") {
                if (veiculo.velocidade < 40) { veiculo.velocidade += 2 }
                else if (veiculo.velocidade >= 40 && veiculo.velocidade <= 60) { veiculo.velocidade += 5 }
                if (veiculo.velocidade > 60) { veiculo.velocidade = 60 }
            }
            else if (acao == "descer" && veiculo.velocidade <= 60) { return true }
            break;
        case 4:
            if (acao == "acelerar") {
                if (veiculo.velocidade < 60) { veiculo.velocidade += 2 }
                else if (veiculo.velocidade >= 60 && veiculo.velocidade <= 80) { veiculo.velocidade += 5 }
                if (veiculo.velocidade > 80) { veiculo.velocidade = 80 }
            }
            else if (acao == "descer" && veiculo.velocidade <= 80) { return true }
            break;
        case 5:
            if (acao == "acelerar") {
                if (veiculo.velocidade < 80) { veiculo.velocidade += 2 }
                else if (veiculo.velocidade >= 80 && veiculo.velocidade <= 100) { veiculo.velocidade += 5 }
                if (veiculo.velocidade > 100) { veiculo.velocidade = 100 }
            }
            else if (acao == "descer" && veiculo.velocidade <= 100) { return true }
            break;
        default:
            return
            break;
    }
}

async function moverPonteiro() {
    velocidadeMostradaPonteiro = VelocidadeAntiga
    ponteiro = document.getElementById("ponteiro")
    if (VelocidadeAntiga < veiculo.velocidade) {
        while (velocidadeMostradaPonteiro < veiculo.velocidade) {
            await sleep(10);
            velocidadeMostradaPonteiro += 1
            ponteiro.setAttribute("style", "transform: rotate(" + (velocidadeMostradaPonteiro * 221 / 100 - 7) + "deg)");
        }
    } else {
        while (velocidadeMostradaPonteiro > veiculo.velocidade) {
            await sleep(10);
            velocidadeMostradaPonteiro -= 1
            ponteiro.setAttribute("style", "transform: rotate(" + (velocidadeMostradaPonteiro * 221 / 100 - 7) + "deg)");
        }
    }
    while(veiculo.velocidade!=0){
        await sleep(50);
        ponteiro.setAttribute("style", "transform: rotate(" + (velocidadeMostradaPonteiro * 221 / 100 - 6.5) + "deg)");
        await sleep(50);
        ponteiro.setAttribute("style", "transform: rotate(" + (velocidadeMostradaPonteiro * 221 / 100 - 7.5) + "deg)");
    }
    
}   

const mostradorMarcha = document.getElementById("mostradorMarcha")
function atualizarMostradorMarcha() {
    if (veiculo.marcha == 0) {
        mostradorMarcha.innerText = "N"
    }
    else if (veiculo.marcha == -1) {
        mostradorMarcha.innerText = "R"
    }
    else {
        mostradorMarcha.innerText = `${veiculo.marcha}`
    }

}

function salvarVelocidade() {
    VelocidadeAntiga = veiculo.velocidade //Importante para o ponteiro fazer a animaçao para o lado certo
}

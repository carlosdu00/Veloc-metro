var veiculo

var veiculoEscolhido
const botaomoto = document.getElementById("botaomoto")
const botaocarro = document.getElementById("botaocarro")
const botaoclicado = document.getElementsByClassName("botaoclicado")

function escolhaInicial(veiculoEscolhido) {
    // aqui, quando um botao é clicado ele ganha as propriedades css de botaoclicado
    if (veiculoEscolhido == moto) {
        botaocarro.className = ("botaonormal")
        botaomoto.className = ("botaoclicado")
    } else {
        botaomoto.className = ("botaonormal")
        botaocarro.className = ("botaoclicado")
    }
    veiculo = veiculoEscolhido;
    veiculo.velocidade = 0
    veiculo.marcha = 0
    moverPonteiro()
    atualizarMostradorMarcha()
    VelocidadeAntiga = 1
}

//função usada para o ponteiro se mover lentamente e não estantaneamente
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function moverPonteiro() {
    // a velocidade antiga deve ser guardada para o ponteiro se orientar para qual direção ele deve seguir
    velocidadeMostradaPonteiro = VelocidadeAntiga
    ponteiro = document.getElementById("ponteiro")
    if (VelocidadeAntiga < veiculo.velocidade) {
        while (velocidadeMostradaPonteiro < veiculo.velocidade) {
            await sleep(10);
            velocidadeMostradaPonteiro += 1
            //aqui é feita a rotação do ponteiro
            ponteiro.setAttribute("style", "transform: rotate(" + (velocidadeMostradaPonteiro * 221 / 100 - 7) + "deg)");
        }
    } else {
        while (velocidadeMostradaPonteiro > veiculo.velocidade) {
            await sleep(10);
            velocidadeMostradaPonteiro -= 1
            //aqui é feita a rotação do ponteiro
            ponteiro.setAttribute("style", "transform: rotate(" + (velocidadeMostradaPonteiro * 221 / 100 - 7) + "deg)");
        }
    }
    // aqui fazemos o ponteiro ter um movimento de como se estivesse tremento (não é realista mas é legal)
    while (veiculo.velocidade != 0) {
        await sleep(50);
        // fazemos isso alterando um pouquinho a rotação da imagem um pouco para mais e um pouco para menos
        ponteiro.setAttribute("style", "transform: rotate(" + (velocidadeMostradaPonteiro * 221 / 100 - 6.5) + "deg)");
        await sleep(50);
        ponteiro.setAttribute("style", "transform: rotate(" + (velocidadeMostradaPonteiro * 221 / 100 - 7.5) + "deg)");
    }
}

function salvarVelocidade() {
    VelocidadeAntiga = veiculo.velocidade //Importante para o ponteiro fazer a animaçao para o lado certo
}

//detecta qual tecla esta sendo pressionada e chama a funçao correspondante
document.addEventListener("keyup", function (event) {
    console.log(event.key)
    switch (event.key) {
        case "ArrowUp":
            salvarVelocidade();
            veiculo.acelerar();
            moverPonteiro();
            break;
        case "ArrowDown":
            salvarVelocidade();
            veiculo.freiar();
            moverPonteiro();
            break;
        case "a":
            veiculo.subirMarcha();
            atualizarMostradorMarcha()
            break;
        case "z":
            veiculo.descerMarcha();
            atualizarMostradorMarcha()
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
        //caso a velocidade tenha execido os 100, corrigimos isso aqui
        if (this.velocidade > 100) {
            this.velocidade = 100
        }
    },
    freiar: function () {
        //importante para que a velocidade acabe ficando negativa!
        (this.velocidade >= 5) ? this.velocidade -= 5: this.velocidade = 0
    },
    //marcha não pode passar de 5
    subirMarcha: function () {
        if (this.marcha < 5) {
            this.marcha += 1
        }
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
        //caso a velocidade tenha execido os 100, corrigimos isso aqui
        verificarVelocidade("acelerar");
        if (this.velocidade > 100) {
            this.velocidade = 100
        }
    },
    freiar: function () {
        //importante para que a velocidade acabe ficando negativa!
        (this.velocidade >= 5) ? this.velocidade -= 5: this.velocidade = 0
    },
    subirMarcha: function () {
        //marcha não pode passar de 5
        if (this.marcha < 5) {
            this.marcha += 1
        }
    },

    descerMarcha: function () {
        // se o carro estiver no neutro e parado, pode engatar a ré
        if (this.marcha == 0 && this.velocidade == 0) {
            this.marcha -= 1
        } else if (this.marcha > -1 && verificarVelocidade("descer")) {
            this.marcha -= 1
        }
    }
}

function verificarVelocidade(acao) {
    switch (veiculo.marcha) {
        case -1:
            if (acao == "acelerar") {
                if (veiculo.velocidade <= 20) {
                    veiculo.velocidade += 5
                }
                // faz a velocidade não passar de 20
                if (veiculo.velocidade > 20) {
                    veiculo.velocidade = 20
                }
            }
            break;
        case 1:
            if (acao == "acelerar") {
                if (veiculo.velocidade <= 20) {
                    veiculo.velocidade += 5
                }
                if (veiculo.velocidade > 20) {
                    veiculo.velocidade = 20
                }
            } else if (acao == "descer") {
                return true
            }
            break;
        case 2:
            if (acao == "acelerar") {
                if (veiculo.velocidade < 20) {
                    veiculo.velocidade += 2
                } else if (veiculo.velocidade >= 20 && veiculo.velocidade <= 40) {
                    veiculo.velocidade += 5
                }
                if (veiculo.velocidade > 40) {
                    veiculo.velocidade = 40
                }
            } else if (acao == "descer" && veiculo.velocidade <= 40) {
                return true
            }
            break;
        case 3:
            if (acao == "acelerar") {
                if (veiculo.velocidade < 40) {
                    veiculo.velocidade += 2
                } else if (veiculo.velocidade >= 40 && veiculo.velocidade <= 60) {
                    veiculo.velocidade += 5
                }
                if (veiculo.velocidade > 60) {
                    veiculo.velocidade = 60
                }
            } else if (acao == "descer" && veiculo.velocidade <= 60) {
                return true
            }
            break;
        case 4:
            if (acao == "acelerar") {
                if (veiculo.velocidade < 60) {
                    veiculo.velocidade += 2
                } else if (veiculo.velocidade >= 60 && veiculo.velocidade <= 80) {
                    veiculo.velocidade += 5
                }
                if (veiculo.velocidade > 80) {
                    veiculo.velocidade = 80
                }
            } else if (acao == "descer" && veiculo.velocidade <= 80) {
                return true
            }
            break;
        case 5:
            if (acao == "acelerar") {
                if (veiculo.velocidade < 80) {
                    veiculo.velocidade += 2
                } else if (veiculo.velocidade >= 80 && veiculo.velocidade <= 100) {
                    veiculo.velocidade += 5
                }
                if (veiculo.velocidade > 100) {
                    veiculo.velocidade = 100
                }
            } else if (acao == "descer" && veiculo.velocidade <= 100) {
                return true
            }
            break;
        default:
            return
            break;
    }
}

// mostrador q efica no meio do velocimeto que indica a marcha atual
const mostradorMarcha = document.getElementById("mostradorMarcha")

function atualizarMostradorMarcha() {
    if (veiculo.marcha == 0) {
        mostradorMarcha.innerText = "N"
    } else if (veiculo.marcha == -1) {
        mostradorMarcha.innerText = "R"
    } else {
        mostradorMarcha.innerText = `${veiculo.marcha}`
    }

}
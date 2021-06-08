# Acelerador
##Simulação simples do sistema de aceleração e marchas de um veículo.

<h4 align="center">🚧Projeto em construção...🚧</h4>

##Premissas
O mecanismo de velocidade deve estar atrelado às marchas. O sistema deverá incrementar
(5 em 5) a velocidade sempre que a moto for acelerada, caso seja reduzida a velocidade
(frear) ela deverá ser decrementada (8 em 8).

Cada marcha tem uma velocidade compatível conforme listagem abaixo:
● 1a — 00 até 20 km/h
● 2a — 20 até 40 km/h
● 3a — 40 até 60 km/h
● 4a — 60 até 80 km/h
● 5a — 80 até 100 km/h

Observações:
● A moto deve ser iniciada com a marcha no neutro.
● Caso a velocidade seja 0, só será possível acelerar se a moto estiver na marcha 1.
● Caso a velocidade extrapole o valor máximo da marcha, ela não poderá ser
aumentada até que seja incrementada a marcha, possibilitando assim o aumento
da velocidade.
● Redução de marcha:
o É possível trocar apenas uma marcha, caso a velocidade seja superior ao
intervalo da marcha anterior.

o Caso a velocidade seja interior ao intervalo da marcha, será possível trocar
normalmente.
Exemplo:
§ Velocidade: 50 – Marcha: 3 -> Será possível reduzir somente até a marcha 2.
§ Velocidade: 10 – Marcha: 5 -> Será possível ir reduzindo até a marcha 1.
● Caso a motocicleta esteja com uma marcha superior a compatível com a
velocidade e o usuário acelerar, o valor da aceleração deve ser decrementado (2
em 2) ao invés de incrementado.
● A velocidade não pode ser negativa.
● Separe as responsabilidades (regras de negócio e interface com o usuário).

### Autor


[![Linkedin Badge](https://img.shields.io/badge/-Carlos-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/carlos-schumacher/)](https://www.linkedin.com/in/carlos-schumacher/) 

//Funções para o backgroung movimentar-se
var w = c.width = window.innerWidth,
  h = c.height = window.innerHeight,
  ctx = c.getContext('2d'),

  tick = 0,

  particles = [],

  maxRadius = Math.sqrt(w * w / 4 + h * h / 4);

ctx.font = '12px monospace';

function Particle() {

  this.reset();
}
Particle.prototype.reset = function () {

  this.radian = Math.random() * Math.PI * 2;
  this.radius = 0;
  this.angSpeed = .05;
  this.incSpeed = 5;

  this.x = this.y = 0;
}
Particle.prototype.step = function () {

  var prevX = this.x,
    prevY = this.y;

  this.radian += this.angSpeed;
  this.radius += this.incSpeed;

  this.x = this.radius * Math.cos(this.radian);
  this.y = this.radius * Math.sin(this.radian);

  var dx = this.x - prevX,
    dy = this.y - prevY,
    len = Math.sqrt(dx * dx + dy * dy);

  for (var i = 0; i <= len; i += 10) {

    var y = prevY + dy * i / len,
      x = prevX + dx * i / len;

    var posX = (x / 10 | 0) * 10,
      posY = (y / 10 | 0) * 10;

    ctx.fillStyle = '#080808';
    ctx.fillRect(w / 2 + posX, h / 2 + posY - 9, 10, 10);
    ctx.fillStyle = 'hsl(hue,80%,50%)'.replace('hue', posX / w * 240 + posY / h * 240 + tick);
    ctx.fillText(Math.random() < .5 ? 0 : 1, w / 2 + posX, h / 2 + posY);
  }

  if (this.radius >= maxRadius)
    this.reset();
}

function anim() {

  window.requestAnimationFrame(anim);

  ++tick;

  ctx.fillStyle = 'rgba(20,20,20,.04)';
  ctx.fillRect(0, 0, w, h);

  if (particles.length < 100 && Math.random() < .3)
    particles.push(new Particle);

  particles.map(function (particle) { particle.step(); });

}
ctx.fillStyle = '#000';
ctx.fillRect(0, 0, w, h);
anim();

window.addEventListener('resize', function () {

  w = c.width = window.innerWidth;
  h = c.height = window.innerHeight;
  ctx.font = '12px monospace';

  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, w, h);

  maxRadius = Math.sqrt(w * w / 4 + h * h / 4);

})
//FIM background

//Configurando escolha: base64 ou Cifra de César com incremento

let escolhas = document.querySelector("select");

escolhas.addEventListener("change", function (evento) {
  evento.preventDefault();

  let incremento = document.getElementById("valorIncremento");

  if (evento.target.value == "cifraCesar") {
    incremento.style = "display: flex";
  } else {
    incremento.style = "display: none";
  }
});
//FIM escolha do método

//Configurando botão para mudar de função

const codificar = document.getElementById('codificar');
const decodificar = document.getElementById('decodificar');

const botao = document.getElementById('botao');

function trocaBotao() {
  if (codificar.checked) {
    botao.value = "Codificar";
  } else if (decodificar.checked) {
    botao.value = "Decodificar";
  }
}

//FIM configuração do botão

//Ação do botão (chamar funções de codificação)

function acaoBotao() {
  if (escolhas.options[escolhas.selectedIndex].value == "cifraCesar") {
    cifraCesar();
  } else if (escolhas.options[escolhas.selectedIndex].value == "Base64") {
    base64();
  } else {
    alert("Selecione um método válido.");
  }
}
//FIM ação do botão

// Codificar para base64
const entrada = document.getElementById('caixaEntrada');
const saida = document.getElementById('caixaSaida');


function base64() {
  if (codificar.checked) {
    saida.value = window.btoa(entrada.value);
  } else if (decodificar.checked) {
    saida.value = window.atob(entrada.value);
  } else {
    alert("Escolha uma função para o botão.");
  }
}
//FIM codificar para base64


//Codificar para Crifra de Cesar

function cifraCesar() {

  const minusculas = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  const maiusculas = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  const respFinal = [];
  const x = document.getElementById('numIncrementos');
  const y = parseInt(x.value);

  if (codificar.checked) {
    for (let i = 0; i < entrada.value.length; i++) {
      if (entrada.value[i] != ' ') {
        for (let j = 0; j < minusculas.length; j++) {
          if (entrada.value[i] == minusculas[j]) {
            respFinal[i] = minusculas[(j + y) % minusculas.length];
            break;
          } else if (entrada.value[i] == maiusculas[j]) {
            respFinal[i] = maiusculas[(j + y) % maiusculas.length];
            break;
          } else if (entrada.value[i] != minusculas[j]) {
            respFinal[i] = entrada.value[i];
          }
        }
        saida.value = respFinal.join('');
      } else {
        respFinal[i] = ' ';
      }
    }

  } else if (decodificar.checked) {
    for (let i = 0; i < entrada.value.length; i++) {
      if (entrada.value[i] != ' ') {
        for (let j = 0; j < minusculas.length; j++) {
          if (entrada.value[i] == minusculas[j]) {
            let vNegativo = (j - y) % minusculas.length;
            for (let vPositivo = vNegativo; vPositivo < 0; vPositivo++) {
              vNegativo += 26;
              vPositivo = vNegativo;
            }
            respFinal[i] = minusculas[vNegativo];
            break;

          } else if (entrada.value[i] == maiusculas[j]) {
            let vNegativo = (j - y) % maiusculas.length;
            for (let vPositivo = vNegativo; vPositivo < 0; vPositivo++) {
              vNegativo += 26;
              vPositivo = vNegativo;
            }
            respFinal[i] = maiusculas[vNegativo];
            break;

          } else if (entrada.value[i] != minusculas[j]) {
            respFinal[i] = entrada.value[i];
          }
        }
        saida.value = respFinal.join('');
      } else {
        respFinal[i] = ' ';
      }
    }
  }

}

//FIM codificar para Cifra de Cesar
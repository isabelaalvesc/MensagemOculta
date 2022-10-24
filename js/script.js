//Configurando escolha: base64 ou Cifra de César com encremento

//Configurando botão para mudar de função
const codificar = document.getElementById('codificar');
const decodificar = document.getElementById('decodificar');

const botao = document.getElementById('botao');

function trocaBotao() {
    if(codificar.checked) {
        botao.value = "Codificar";
    } else if(decodificar.checked) {
        botao.value = "Decodificar";
    }
}

//enumero verifica com regex, se o que ta sendo inserido é número
//cepvalido verifica se o valor do cep tem 8 caracteres, e se todos são numeros
const eNumero = (numero) => /^[0-9]+$/.test(numero);
const cepValido = (cep) => cep.length == 8 && eNumero(cep);
//guarda os inputs em variaveis
const cep = document.getElementById('cep');
const rua = document.getElementById('endereco');
const bairro = document.getElementById('bairro');
const cidade = document.getElementById('cidade');
const estado = document.getElementById('estado');
const ddd = document.getElementById('ddd');
const ibge = document.getElementById('ibge');
//função vinculada no eventlistener, toda vevz que da focus out do cep, ela ativa
//função limpar formulario é ativada, tirando todos os dados que tenham nos inputs

async function pesquisarCep() {
    limparFormulario();
    setTimeout(async function(){
    //const cep tira os traços do cep, 
    //const url pega o site modelo do professor
    const cep = document.getElementById('cep').value.replace("-", "");
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    
    //se o cep for válido, pega os dados do link, e depois armazena apenas o json na variavel endereço
    if (cepValido(cep)) {
        const dados = await fetch(url);
        const endereco = await dados.json();

        //se o json não for localizado, coloca no small que o cep ta incorreto
        if (endereco.hasOwnProperty('erro')) {
            const cep = document.getElementById('cep');
            input_vermelho_cep(cep, 'Cep incorreto');
        } 
        //se der tudo certo, preenche os outros dados automaticamente
        else {
            preencherFormulario(endereco);

        }
    } 
    //se o cep não for valido, pede pro usuario preencher o campo corretamente
    else {
        const cep = document.getElementById('cep');
        input_vermelho(cep, 'Preencha com um cep valido');
    }
},2000);
}
//toda vez que o cep não for correto, todos os valores ficam vazios, e os inputs voltam a ficar na cor comum
const limparFormulario = (endereco) =>{
    document.getElementById('endereco').value ='...';
    document.getElementById('bairro').value = '...';
    document.getElementById('cidade').value = '...';
    document.getElementById('estado').value = '...';
    document.getElementById('ddd').value = '...';
    document.getElementById('ibge').value = '...';
    
    input_normal(cep);
    input_normal(rua);
    input_normal(bairro);
    input_normal(cidade);
    input_normal(estado);
    input_normal(ddd);
    input_normal(ibge);

    //botao desabilitado, por motivos obvios
    botao.disabled = true;
    
}

//nessa const é colocado os valores nos inputs, com referencia no json  
    
const preencherFormulario = (endereco) =>{
    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
    document.getElementById('ddd').value = endereco.ddd;
    document.getElementById('ibge').value = endereco.ibge;

//depois de preencher todos campos, pintam eles de verde, e libera o botão
    input_verde(cep);
    input_verde(rua);
    input_verde(bairro);
    input_verde(cidade);
    input_verde(estado);
    input_verde(ddd);
    input_verde(ibge);
    muda_botao();
    };



//verifica se todas as divs estão com a class correta, se sim, botão ativado
function muda_botao(){
    const div1 = document.getElementById('div1');
    const div2 = document.getElementById('div2');
    const div3 = document.getElementById('div3');
    const div4 = document.getElementById('div4');
    const div5 = document.getElementById('div5');
    const div6 = document.getElementById('div6');
    const div7 = document.getElementById('div7');
    const botao = document.getElementById('botao');


    if (div1.className === "altera_cor success" && div2.className === "altera_cor success"
    && div3.className === "altera_cor success" && div4.className === "altera_cor success"
    &&div5.className === "altera_cor success" && div6.className === "altera_cor success"
    && div7.className === "altera_cor success") {

    botao.disabled = false;


}

}
//função que pinta o input de vermelho e coloca a mensagem na tela de erro
function input_vermelho_cep(input, message) {
    const pega_div = input.parentElement;
    const small = pega_div.querySelector('small');

    small.innerText = message;
    pega_div.className = 'altera_cor error';
}


//essa função só pinta de vermelho, sem mensagem
function input_vermelho(input){
    const pega_div = input.parentElement;
    pega_div.className = 'altera_cor error';

}

//função que pinta de verde
function input_verde(input) {
    const pega_div = input.parentElement;
    pega_div.className = 'altera_cor success';
}

//função que pinta da cor comum
function input_normal(input){
    const pega_div = input.parentElement;
    pega_div.className = 'altera_cor';
}



//event listener, que sempre que tiramos o mouse do input do cep, ele ativa a pesquisa
document.getElementById('cep')
        .addEventListener('focusout',pesquisarCep);       

        
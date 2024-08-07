document.addEventListener('DOMContentLoaded', ()=>{
    verificarVarTema();
});

function verificarVarTema(){
    const temaArmazenado = localStorage.getItem('tema');//VERIFICA A VARIAVEL LOCAL NO NAVEGADOR

    if(temaArmazenado){
        document.body.setAttribute('data-tema', temaArmazenado);//ATRIBUI O VALOR DA VARIAVEL A TAG DATA-TEMA
    }
}

function alterarTema(){ 
    const tema = document.body.getAttribute("data-tema");//VERIFICA O TEMA ATUAL
    const novoTema = tema == 'dark' ? 'light' : 'dark';//ARMAZENA O TEMA OPOSTO AO ATUAL

    document.body.setAttribute("data-tema", novoTema);//ALTERA PARA O NOVO TEMA
    
    localStorage.setItem('tema', novoTema);//SALVA UMA VARIAVEL LOCAL NO NAVEGADOR
}

async function imprimirPortifolio() {
    var botoes = document.getElementsByClassName("top-button");
    
    for (var i=0; i< botoes.length; i++){
        botoes[i].style.display = "none";
    }

    window.print();

    for (var i = 0; i < botoes.length; i++) {
        botoes[i].style.display = "flex";
    }
}

function copiar(botao){
    const paragrafo = botao.previousElementSibling;
    const informacao = paragrafo.textContent;

    navigator.clipboard.writeText(informacao).then(()=>{
        alert("Conteudo copiado!");
    }).catch(error=>{
        console.error("Erro ao copiar", error);
        alert("Erro ao copiar.");
    });
}

async function consultarRepositorios() {
    const nomeUsuario = "CaueYanagihara";
    const listaRepositorios = document.getElementById("listaRepositorios");
    listaRepositorios.innerText = '';
    const status = document.getElementById("status");
    const url = `https://api.github.com/users/${nomeUsuario}/repos`;

    status.innerText="Carregando...";
    try {
        const resposta = await fetch(url); //AGUARDA A RESPOSTA PARA DEPOIS EXECUTAR O RESTO DO CODIGO
        //resposta.then(res=>{console.log(res)});//-----EXECUTA O RESTO DO CODIGO ENQUANTO AGUARDA O FETCH ATRIBUIR UM VALOR A VARIAVEL.

        if(!resposta.ok){
            alert("Erro ao realizar a consulta. Tente novamente mais tarde.");
            return;
        }

        const repositorios = await resposta.json();

        repositorios.forEach(element => {
            const itemLista = document.createElement('li');
            var link = document.createElement('a');

            link.href = element.html_url;
            link.textContent = element.name;

            itemLista.appendChild(link);

            listaRepositorios.appendChild(itemLista);
        });

        status.innerText = "";
    } catch (error) {
        status.innerText="Erro.";
        alert(error);
    }
}
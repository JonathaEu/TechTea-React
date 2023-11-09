import postaEscolhas from "../postEscolhas";

export function controlaChat({ respostasSubsequentes, segundos, opcoesSubsequentes, chat }: any) {
    let buscaRespostaBot = 0;
    const mensagemBot = document.createElement('p')
    mensagemBot.innerText = respostasSubsequentes[buscaRespostaBot]
    mensagemBot.setAttribute('class', 'msg')
    mensagemBot.setAttribute('id', 'mensagemBot' + [buscaRespostaBot])
    chat?.appendChild(mensagemBot)
    setTimeout(() => {
        exibeOpcoes({ opcoesSubsequentes, segundos, respostasSubsequentes, chat });

    }, (segundos + 1) * 200);
    window.location.href = '#mensagemBot' + [buscaRespostaBot]
    buscaRespostaBot++
    console.log(segundos)
}


export function exibeOpcoes({ opcoesSubsequentes, chat, segundos, respostasSubsequentes }: any) {
    console.log(opcoesSubsequentes)
    for (let i = 0; i < opcoesSubsequentes.length; i++) { //para cada opção disponível executa as ações abaixo
        const optButton = document.createElement('button'); // cria um elemento botão
        const opcoes: any = opcoesSubsequentes[i]; //define cada opção como as opções fornecidas pelo backend
        optButton.innerText = opcoes; //define o texto dos botões como as opçoes fornecidas pelo backend
        optButton.setAttribute('class', 'opt'); //estiliza os botões com a classe predefinida no arquivo css
        optButton.addEventListener('click', () => controlaAtraso({ opcoesSubsequentes, segundos, respostasSubsequentes }));//adiciona evento "onClick", ao ser clicado o botão executa a função contolaAtraso
        optButton.addEventListener('click', () => controlaEscolhaUsuario);//adiciona evento "onClick", ao ser clicado o botão executa a função controlaEscolhaUsuario
        chat?.appendChild(optButton)//adiciona ao chat os botões configurados acima.
    }
}

export function controlaAtraso({ respostasSubsequentes, opcoesSubsequentes, segundos }: any) {//função que define tempo para resposta do bot ser exibida ao usuário.
    const atraso = setTimeout(() => {
        controlaChat({ respostasSubsequentes, opcoesSubsequentes, segundos })
    }, (segundos + 1) * 50);
    return () => clearTimeout(atraso)
}

export default function controlaEscolhaUsuario(this: any, chat: any) {
    document.querySelectorAll(".opt").forEach((el) => {//após o usuário fazer sua escolha, a mesma deixa de ser exibida no chat
        el.remove();
    });
    const respostaUsuario = document.createElement("p");//cria um elemento do tipo parágrafo.
    const rUsuarioParaServidor = { "escolha": this.innerText };//armazena a escolha do usuário para ser enviada ao servidor.
    respostaUsuario.setAttribute("class", "posicionaRespostaUsuario");//atributo css para posicionar adequadamente a escolha do usuário no chat.
    const sp = '<span class="rep">' + this.innerText + '</span>';// cria um elemento do tipo "span" contendo a escolha do usuário. 
    respostaUsuario.innerHTML = sp; //insere o elemento span com seu respectivo texto no elemento parágrafo.
    chat?.appendChild(respostaUsuario);//inserindo no chat a escolha do usuário faz a mesma ser exibida.
    postaEscolhas(rUsuarioParaServidor)//envia para o servidor a escolha do usuário. com o intuito de ao final do questinário retornarmos alguma resposta baseada em todas as escolhas do usuário.
}

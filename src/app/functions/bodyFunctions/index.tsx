import api from "@/app/services/api";
import postaEscolhas from "../postEscolhas";
import getCalculo from "../getCalculo";
import getResultado from "../getResultado";
let buscaRespostaBot = 0;

export function controlaChat({ respostasSubsequentes, opcoesSubsequentes, chat, }: any) {//Recebe como propriedade as respostas e opções fornecidas pelo servidor,
    if (buscaRespostaBot != 11) {
        //recebe também o elemento chat para saber onde essa informações serão inseridas.
        const mensagemBot = document.createElement('p')//cria elemento do tipo parágrafo
        mensagemBot.innerText = respostasSubsequentes[buscaRespostaBot]//insere no elemento acima a resposta do servidor que se encontra na posição "buscaRespostaBot"
        mensagemBot.setAttribute('class', 'msg')//Define como "msg" o atributo de estilização 
        mensagemBot.setAttribute('id', 'mensagemBot' + [buscaRespostaBot])//define como atributo de indentificação mensagemBot mais a variavelbuscaRespostaBot concatenada
        chat?.appendChild(mensagemBot)//Exibe no chat a variavel mensagemBot que foi definida acima.
        setTimeout(() => {//após um intervalo de tempo executa a função exibe opções.
            exibeOpcoes({ opcoesSubsequentes, respostasSubsequentes, chat, });
        }, 1 * 700);

        window.location.href = '#mensagemBot' + [buscaRespostaBot]//Desce o chat até a próxima mensagem do bot.
        buscaRespostaBot++//Itera a variável. Toda vez que esta função é executada ela aumenta este contador que auxilia  a trazer sempre a próxima mensagem do bot
        //Além de auxiliar a controlar a rolagem do chat para a próxima mensagem.
    }
    if (buscaRespostaBot == 3) {
        getCalculo()
        getResultado()
            .then((resultado: any) => {
                console.log(resultado)
                imprimeOpcaoFinal(resultado, chat)
            })
            .catch((err: any) => {
                console.log(err)
            })
    }
}

export function imprimeOpcaoFinal(resultado: any, chat: any) {
    const opcaoFinal = document.createElement('p')
    opcaoFinal.innerText = 'Gerar Resultado'
    opcaoFinal.setAttribute('class', 'opt')
    opcaoFinal.addEventListener('click', () => { imprimeResultado(resultado, chat) })
    chat?.appendChild(opcaoFinal)
}

export function imprimeResultado(resultado: any, chat: any) {
    let i = 0;
    finaliza(chat)

    resultado.forEach((element: any) => {
        const atraso = setTimeout(() => {
            i++
            const paragrafoResultado = document.createElement('p');
            const resultados: any = element;
            paragrafoResultado.innerText = resultados
            paragrafoResultado.setAttribute('class', 'msg')
            paragrafoResultado.setAttribute('id', 'resultado' + [i])
            chat?.appendChild(paragrafoResultado)


        }, 1 * 1000);
        return () => clearTimeout(atraso)
    })
}

function finaliza(chat: any) {
    const ultimaResposta = document.createElement("p");//cria um elemento do tipo parágrafo.
    ultimaResposta.setAttribute("class", "posicionaRespostaUsuario");//atributo css para posicionar adequadamente a escolha do usuário no chat.
    const sp = '<span class="rep">' + "Gerar Resultado" + '</span>';// cria um elemento do tipo "span" contendo a escolha do usuário. 
    ultimaResposta.innerHTML = sp;
    chat?.appendChild(ultimaResposta)

    document.querySelectorAll(".opt").forEach((el) => {
        el.remove()
    })
    window.location.href = '#resultado' + [1]
}

export function exibeOpcoes({ opcoesSubsequentes, chat, respostasSubsequentes, }: any) {
    if (buscaRespostaBot != 3) {
        for (let i = 0; i < opcoesSubsequentes.length; i++) { //para cada opção disponível executa as ações abaixo
            const optButton = document.createElement('button'); // cria um elemento botão
            const opcoes: any = opcoesSubsequentes[i]; //define cada opção como as opções fornecidas pelo backend
            optButton.innerText = opcoes; //define o texto dos botões como as opçoes fornecidas pelo backend
            optButton.setAttribute('class', 'opt'); //estiliza os botões com a classe predefinida no arquivo css
            optButton.addEventListener('click', () => controlaAtraso({ opcoesSubsequentes, respostasSubsequentes, chat, }));//adiciona evento "onClick", ao ser clicado o botão executa a função contolaAtraso
            optButton.addEventListener('click', (event: any) => controlaEscolhaUsuario(event.target, chat));//adiciona evento "onClick", ao ser clicado o botão executa a função controlaEscolhaUsuario
            chat?.appendChild(optButton)//adiciona ao chat os botões configurados acima.
        }
    }
}

export function controlaAtraso({ respostasSubsequentes, opcoesSubsequentes, chat, }: any) {//função que define tempo para resposta do bot ser exibida ao usuário.
    const atraso = setTimeout(() => {
        controlaChat({ respostasSubsequentes, opcoesSubsequentes, chat, })
    }, 1 * 1000);
    return () => clearTimeout(atraso)
}

export default function controlaEscolhaUsuario(botaoClicado: HTMLElement, chat: any) {
    document.querySelectorAll(".opt").forEach((el) => {//busca os elementos da classe opcoes e apaga essa opção
        //após o usuário fazer sua escolha, a mesma deixa de ser exibida no chat como opção e passa ser exibida como mensagem
        el.remove();
    });
    const rUsuarioParaServidor = { "escolha": botaoClicado.innerText };//armazena a escolha do usuário para ser enviada ao servidor.
    const respostaUsuario = document.createElement("p");//cria um elemento do tipo parágrafo.
    respostaUsuario.setAttribute("class", "posicionaRespostaUsuario");//atributo css para posicionar adequadamente a escolha do usuário no chat.
    const sp = '<span class="rep">' + botaoClicado.innerText + '</span>';// cria um elemento do tipo "span" contendo a escolha do usuário. 
    respostaUsuario.innerHTML = sp; //insere o elemento span com seu respectivo texto no elemento parágrafo.
    chat?.appendChild(respostaUsuario);//inserindo no chat a escolha do usuário faz a mesma ser exibida.
    postaEscolhas(rUsuarioParaServidor)//envia para o servidor a escolha do usuário. com o intuito de ao final do questinário retornarmos alguma resposta baseada em todas as escolhas do usuário.
}

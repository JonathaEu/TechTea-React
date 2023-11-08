'use client'
import postaEscolhas from '@/app/functions/postEscolhas';
import React, { useEffect, useState } from 'react'

export default function ParagrafosDoChat({ respostaInicialBot }: any) {
    const [segundos, setSegundos] = useState(0);
    const [escolhaInicial, setEscolhaInicial] = useState<any>([]);
    const [opcoesSubsequentes, setOpcoesSubsequentes] = useState([]);
    const [respostasSubsequentes, setRespostasSubsequentes] = useState([]);
    const [historyTest, setHistoryTest] = useState([]);
    const [botaoInicialClicado, setBotaoInicialClicado] = useState<boolean>(false);
    let buscaRespostaBot = -1;

    const mensagemBot = respostaInicialBot.respostaBot;
    let opcaoInicial = respostaInicialBot.options;
    const chat = document.getElementById('chat');

    function controlaChat() {
        buscaRespostaBot++;
        const mensagemBot = document.createElement('p')
        mensagemBot.innerText = respostasSubsequentes[buscaRespostaBot]
        mensagemBot.setAttribute('class', 'msg')
        mensagemBot.setAttribute('id', 'mensagemBot' + [buscaRespostaBot])
        chat?.appendChild(mensagemBot)
        setTimeout(() => {
            exibeOpcoes();

        }, (segundos + 1) * 200);
        window.location.href = '#mensagemBot' + [buscaRespostaBot]
    }

    function exibeOpcoes() {
        for (let i = 0; i < opcoesSubsequentes.length; i++) { //para cada opção disponível executa as ações abaixo
            const optButton = document.createElement('button'); // cria um elemento botão
            const opcoes: any = opcoesSubsequentes[i]; //define cada opção como as opções fornecidas pelo backend
            optButton.innerText = opcoes; //define o texto dos botões como as opçoes fornecidas pelo backend
            optButton.setAttribute('class', 'opt'); //estiliza os botões com a classe predefinida no arquivo css
            optButton.addEventListener('click', controlaAtraso);//adiciona evento "onClick", ao ser clicado o botão executa a função contolaAtraso
            optButton.addEventListener('click', controlaEscolhaUsuario);//adiciona evento "onClick", ao ser clicado o botão executa a função controlaEscolhaUsuario
            chat?.appendChild(optButton)//adiciona ao chat os botões configurados acima.
        }
    }

    function controlaAtraso() {//função que define tempo para resposta do bot ser exibida ao usuário.
        const atraso = setTimeout(() => {
            controlaChat()
        }, (segundos + 1) * 50);
        return () => clearTimeout(atraso)
    }

    function controlaEscolhaUsuario(this: any) {
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

    useEffect(() => { // no momento em que a página é carregada executa as ocorrências abaixo
        const opcaoSelecionada = ({ "escolha": opcaoInicial });//armazena uma mensagem inicial no formato JSON para ser enviada ao servidor.
        postaEscolhas(opcaoSelecionada)//envia para o servidor a mensagem inicial.
            .then((response: any) => {//caso obtenha sucesso executa as ações abaixo.
                setOpcoesSubsequentes(response.options) //define as opções que serão exibidas para o usuário.
                setRespostasSubsequentes(response.respostaBot)//define as respostas que o bot enviará ao usuário.
                setEscolhaInicial(opcaoInicial)//define a primeira escolha do usuário com a primeira opção disponível.
            });
        const intervalo = setInterval(() => {//configura um intervalo de tempo baseado em segundos;
            setSegundos(seconds => seconds + 1);
        }, 500);
        return () => clearInterval(intervalo);
    }, []);

    if (segundos >= 1) {//após meio segundo exibe todo conteúdo abaixo;
        return (
            <>
                <div className='h-[21rem] overflow-x-clip' id='chat'>
                    <div>
                        {mensagemBot.map((msgBot: any, index: any) => {
                            return <p key={msgBot.id} className='msg ml-2'>{msgBot}</p>

                        })}

                        <button id='opcaoInicial'
                            className={` ${botaoInicialClicado ?
                                `hidden` : `p-1 md:p-2 border
                                border-pink-500 rounded-full
                                 mx-2 my-2 inline-block cursor-pointer 
                                 font-semibold text-center
                                  text-pink-500 text-sm
                                  bg-white
                                  `}`}
                            onClick={() => {
                                setBotaoInicialClicado(true);
                                controlaChat()
                            }}
                        >
                            {opcaoInicial}
                        </button>
                    </div>
                    <div>
                        <p className={`
                        rep relative -right-[80px] flex justify-end w-fit mt-4
                        ${botaoInicialClicado ? '' : 'hidden'}
                        `}>
                            {escolhaInicial}
                        </p>
                    </div>
                </div>
            </>
        )
    }
}

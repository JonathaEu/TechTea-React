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
        chat?.appendChild(mensagemBot)
        setTimeout(() => {
            exibeOpcoes();

        }, (segundos + 1) * 200);
    }

    function exibeOpcoes() {
        for (let i = 0; i < opcoesSubsequentes.length; i++) {
            const optButton = document.createElement('button');
            const opcoes: any = opcoesSubsequentes[i];
            optButton.innerText = opcoes;
            optButton.setAttribute('class', 'opt');
            optButton.addEventListener('click', controlaAtraso);
            optButton.addEventListener('click', controlaEscolhaUsuario);
            chat?.appendChild(optButton)
        }
    }

    function controlaAtraso() {
        const atraso = setTimeout(() => {
            controlaChat()
        }, (segundos + 1) * 50);
        return () => clearTimeout(atraso)
    }

    function controlaEscolhaUsuario(this: any) {
        document.querySelectorAll(".opt").forEach((el) => {
            el.remove();
        });
        const respostaUsuario = document.createElement("p");
        const rUsuarioParaServidor = { "escolha": this.innerText };
        respostaUsuario.setAttribute("class", "posicionaRespostaUsuario");
        const sp = '<span class="rep">' + this.innerText + '</span>';
        respostaUsuario.innerHTML = sp;
        chat?.appendChild(respostaUsuario);
        postaEscolhas(rUsuarioParaServidor)
    }

    useEffect(() => {
        const opcaoSelecionada = ({ "escolha": opcaoInicial });
        postaEscolhas(opcaoSelecionada)
            .then((response: any) => {
                console.log(response)
                setOpcoesSubsequentes(response.options)
                setRespostasSubsequentes(response.respostaBot)
                setEscolhaInicial(opcaoInicial)
            });

        const intervalo = setInterval(() => {
            setSegundos(seconds => seconds + 1);
        }, 500);
        return () => clearInterval(intervalo);
    }, []);
    if (segundos >= 1) {
        return (
            <>
                <div className='h-[21rem] overflow-x-clip' id='chat'>
                    <div>
                        {mensagemBot.map((msgBot: any) => {
                            return <p className='msg ml-2'>{msgBot}</p>

                        })}

                        <button
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

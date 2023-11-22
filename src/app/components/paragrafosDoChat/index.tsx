'use client'
import { controlaChat } from '@/app/functions/bodyFunctions';
import postaEscolhas from '@/app/functions/postEscolhas';
import React, { useEffect, useState } from 'react'

export default function ParagrafosDoChat({ respostaInicialBot }: any) {
    const [segundos, setSegundos] = useState(0);
    const [escolhaInicial, setEscolhaInicial] = useState<any>([]);
    const [opcoesSubsequentes, setOpcoesSubsequentes] = useState([]);
    const [respostasSubsequentes, setRespostasSubsequentes] = useState([]);
    const [botaoInicialClicado, setBotaoInicialClicado] = useState<boolean>(false);
    const [resultado, setResultado] = useState<string>('');

    const mensagemBot = respostaInicialBot.respostaBot;
    let opcaoInicial = respostaInicialBot.options;
    const chat = document.getElementById('chat');

    useEffect(() => { // no momento em que a página é carregada executa as ocorrências abaixo
        const opcaoSelecionada = ({ "escolha": opcaoInicial });//armazena uma mensagem inicial no formato JSON para ser enviada ao servidor.
        postaEscolhas(opcaoSelecionada)//envia para o servidor a mensagem inicial.
            .then((response: any) => {//caso obtenha sucesso executa as ações abaixo.
                setOpcoesSubsequentes(response.options) //define as opções que serão exibidas para o usuário.
                setRespostasSubsequentes(response.respostaBot)//define as respostas que o bot enviará ao usuário.
                setEscolhaInicial(opcaoInicial)//define a primeira escolha do usuário com a primeira opção disponível.
            })
            .catch((err: any) => {
                console.log(err)
            });
        const intervalo = setInterval(() => {//configura um intervalo de tempo baseado em segundos;
            setSegundos(seconds => seconds + 1);
        }, 500);
        return () => clearInterval(intervalo);
    }, []);

    if (segundos >= 1) {//após meio segundo exibe todo conteúdo abaixo;
        return (
            <>
                <div className='h-[21rem] overflow-x-clip' id='chat'> {/*Div que engloba todo conteúdo do chat*/}
                    <div>
                        {mensagemBot.map((msgInicialBot: any, index: any) => {
                            {/*Introdução do bot*/ }
                            return <p key={index} className='msg ml-2'>{msgInicialBot}</p>
                        })}


                        {/*Primeira opção disponível para o usuário*/}
                        {/*Todo conteúdo dentro de ClassName é estilização*/}
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
                                controlaChat({ respostasSubsequentes, opcoesSubsequentes, chat, resultado, setResultado })
                            }}
                        >
                            {opcaoInicial} {/*Exibe a opção inicial*/}
                        </button>
                    </div>
                    <div>
                        <p className={`
                        rep relative -right-[80px] flex justify-end w-fit mt-4
                        ${botaoInicialClicado ? '' : 'hidden'}
                        `}>
                            {escolhaInicial} {/*Caso a opção inicial tenha sido clicada, ela é imprimida no chat*/}
                        </p>
                    </div>
                </div>
            </>
        )
    }
}

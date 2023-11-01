import postaEscolhas from '@/app/functions/postEscolhas';
import React, { useEffect, useState } from 'react'
import ElementosChat from '../historicoChat';

export default function ParagrafosDoChat({ respostaInicialBot }: any) {
    const [segundos, setSegundos] = useState(0);
    const [escolhaInicial, setEscolhaInicial] = useState<any>([]);
    const [buscaRespostaBot, setBuscaRespostaBot] = useState<number>(-1);
    const [opcoesSubsequentes, setOpcoesSubsequentes] = useState([]);
    const [respostasSubsequentes, setRespostasSubsequentes] = useState([]);
    const [historyTest, setHistoryTest] = useState([]);
    const [botaoInicialClicado, setBotaoInicialClicado] = useState<boolean>(false);

    const mensagemBot = respostaInicialBot.respostaBot;
    const opcaoInicial = respostaInicialBot.options;
    let corBotaoOpcoes = '';

    function chamaElementosChat() {
        return <ElementosChat respostasSubsequentes={respostasSubsequentes}
            buscaRespostaBot={buscaRespostaBot}
        />
    }

    useEffect(() => {
        const intervalo = setInterval(() => {
            setSegundos(seconds => seconds + 1);
        }, 500);
        return () => clearInterval(intervalo);
    }, []);
    if (segundos >= 1) {
        return (
            <>
                <div className='h-[23rem] overflow-x-clip'>
                    <div>
                        <p className='msg ml-2'>{mensagemBot}</p>

                        {opcaoInicial && opcaoInicial.map((opcaoInicial: any, index: any) => {
                            return (
                                <button
                                    key={index}
                                    className={`opt ${botaoInicialClicado ? 'bg-slate-400' : 'bg-white'}`}
                                    onClick={() => {
                                        setBotaoInicialClicado(true);
                                        const opcaoSelecionada = ({ "escolha": opcaoInicial });
                                        console.log(buscaRespostaBot);
                                        postaEscolhas(opcaoSelecionada)
                                            .then((response: any) => {
                                                console.log(response)
                                                setOpcoesSubsequentes(response.options)
                                                setRespostasSubsequentes(response.respostaBot)
                                                setEscolhaInicial(opcaoInicial)
                                                chamaElementosChat();
                                            });
                                        setBuscaRespostaBot((prev: any) => prev + 1)

                                    }}
                                >
                                    {opcaoInicial}
                                </button>
                            );
                        })}
                    </div>
                    <div>
                        <p className={`rep relative -right-[80px] flex justify-end w-fit ${botaoInicialClicado ? '' : 'hidden'}`}>
                            {escolhaInicial}
                        </p>
                    </div>

                    <div>
                        {botaoInicialClicado ?
                            <ElementosChat respostasSubsequentes={respostasSubsequentes}
                                buscaRespostaBot={buscaRespostaBot}
                                opcoesSubsequentes={opcoesSubsequentes}
                                setRespostasSubsequentes={setRespostasSubsequentes}
                                setBuscaRespostaBot={setBuscaRespostaBot}
                            /> : <></>
                        }
                    </div>
                </div>
            </>
        )
    }
}
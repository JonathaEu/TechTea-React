import postaEscolhas from '@/app/functions/postEscolhas';
import React, { useEffect, useState } from 'react'

export default function ParagrafosDoChat({ respostaInicialBot }: any) {
    const [segundos, setSegundos] = useState(0);
    const mensagemBot = respostaInicialBot.respostaBot;
    const opcoes = respostaInicialBot.options;

    useEffect(() => {
        const intervalo = setInterval(() => {
            setSegundos(seconds => seconds + 1);
        }, 500);
        return () => clearInterval(intervalo);
    }, []);
    if (segundos === 1) {
        return (
            <>
                <div>
                    <p className='msg ml-2'>{mensagemBot}</p>

                    {opcoes && opcoes.map((opcao: any, index: any) => {
                        return (
                            <button key={index} className='opt' onClick={() => console.log('a')}>
                                {opcao}
                            </button>
                        )
                    })}

                    <p>{segundos}</p>
                </div>
            </>
        )
    } else if (segundos > 1) {
        return (
            <>
                <div>
                    <p className='msg ml-2'>{mensagemBot}</p>

                    {opcoes && opcoes.map((opcao: any, index: any) => {
                        let opcaoSelecionada: any = []

                        return (
                            <button key={index} className='opt' onClick={() => {
                                opcaoSelecionada.push({ "escolha": + index }),
                                    console.log(opcaoSelecionada),
                                    postaEscolhas({ opcaoSelecionada })
                            }}>
                                {opcao}
                            </button>
                        )
                    })}
                </div>
            </>
        )
    }
}
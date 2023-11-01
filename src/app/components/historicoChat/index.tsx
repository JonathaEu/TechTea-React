import React from 'react'
import { useState } from 'react'

export default function ElementosChat({ respostasSubsequentes, buscaRespostaBot,
    setRespostasSubsequentes, setBuscaRespostaBot, opcoesSubsequentes }: any) {
    return (
        <>
            <div className=''>

                <div>
                    <p className='msg ml-2 mt-4'>{respostasSubsequentes[buscaRespostaBot]}</p>
                </div>

                <div>
                    {opcoesSubsequentes && opcoesSubsequentes.map((opcoes: any, index: any) => {
                        return (
                            <button
                                key={index}
                                className='opt bg-white flex justify-between w-fit'
                                // className={`opt ${botaoInicialClicado ? 'bg-slate-400' : 'bg-white'}`}
                                onClick={() => {
                                    setBuscaRespostaBot((prev: any) => prev + 1)
                                    console.log(buscaRespostaBot)
                                    // setBotaoInicialClicado(true);
                                    // const opcaoSelecionada = ({ "escolha": opcaoInicial });
                                    // console.log(opcaoSelecionada);
                                    // postaEscolhas(opcaoSelecionada)
                                    //     .then((response: any) => {
                                    //         console.log(response)
                                    //         setOpcoesSubsequentes(response.options)
                                    //         setRespostasSubsequentes(response.respostaBot)
                                    //         setEscolhaInicial(opcaoInicial)
                                    //         chamaElementosChat();
                                    //     });
                                }}
                            >
                                {opcoes}
                            </button>
                        )
                    })}
                </div>

            </div>
        </>
    )
}
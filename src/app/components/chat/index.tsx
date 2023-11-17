'use client'
import React from 'react'
import neurodiversidade from '../../../../public/assets/neurodiversidade.webp';
import ParagrafosDoChat from '../paragrafosDoChat';
import Image from 'next/image';
import { AiOutlineClose } from 'react-icons/ai';

//-------------------COMPONENTE QUE É O CHAT PROPRIAMENTE DITO-------------------//
//----------------ESTE COMPONENTE RECEBE QUATRO PROPRIEDADES-------------------//
//----A PROPIEDADE CONTROLAEXIBIÇÃO É UMA STRING DECLARADA NA PAGINA PRINCIPAL-------//
//----A PROPRIEDADE FUNÇÃOEXIBIÇÃO É A FUNÇÃO QUE CONTROLA EXIBICAO DO CHAT-------//
//----ESTA FUNÇÃO ESTA A CARGO DO BOTÃO "X" DE FECHAR O CHAT-------//
export default function Chat({ controlaExibicaoElementosDoChat, respostaInicialBot, controlaExibicao, funcaoExibicao }: any) {

    return (
        // CONTROLAEXIBICAO SENDO PASSADA COMO PROPRIEDADE CSS PARA TODO O CHAT //
        <div className={`${controlaExibicao} flex w-full h-full pr-10 divChat`}>
            <div className="chat  bg-[#e0f1fd] rounded-t-xl rounded-b-xl
            w-64 h-[32rem]
            ">
                <div
                    className="flex py-1 flex-row rounded-t-xl w-64
                 text-center text-white pl-4 bg-white justify-between
                 border-b border-b-[#1e1b1b] shadow-sm shadow-[#afafaf]
                
                 ">

                    <div className='text-[13px] grid grid-cols-1 font-semibold uppercase mt-4'>
                        <span className='text-[#dd2c90] scale-[1.2] '>Tech
                            <span className='text-[#2ccdb5]'>Tea</span>
                        </span>
                    </div>

                    <div className='p-[5px] flex justify-center w-full scale-[1.3] ml-6'>
                        <Image width={100} height={100} src={neurodiversidade.src} alt='chatbot-image'
                            className='w-[35px] h-[35px]'
                        />
                    </div>

                    <div className='text-black justify-end flex w-full pr-2 pb-4'>
                        <button onClick={() => { funcaoExibicao() }}>{<AiOutlineClose />}</button>

                    </div>
                </div>


                <div id='chat-block'
                    className="py-[34px]  justify-center overflow-y-auto scroll-smooth text-center">
                    <div>
                        {controlaExibicaoElementosDoChat === true ?
                            <ParagrafosDoChat respostaInicialBot={respostaInicialBot} />
                            : <></>}
                        {/* <CampoParaMensagens /> */}
                    </div>
                </div>
            </div>

        </div >
    )
}

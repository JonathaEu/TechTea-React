'use client'
import React from 'react'
import CampoParaMensagens from '../CampoParaMensagens'
import chatbot from '../../../../public/assets/chatbot.png';
import ParagrafosDoChat from '../paragrafosDoChat';
import Image from 'next/image';

//-------------------COMPONENTE QUE É O CHAT PROPRIAMENTE DITO-------------------//
//----------------ESTE COMPONENTE RECEBE DUAS PROPRIEDADES-------------------//
//----A PROPIEDADE CONTROLAEXIBIÇÃO É UMA STRING DECLARADA NA PAGINA PRINCIPAL-------//
//----A PROPRIEDADE FUNÇÃOEXIBIÇÃO É A FUNÇÃO QUE CONTROLA EXIBICAO DO CHAT-------//
//----ESTA FUNÇÃO ESTA A CARGO DO BOTÃO "X" DE FECHAR O CHAT-------//
export default function Chat({ controlaExibicaoElementosDoChat, respostaInicialBot, controlaExibicao, funcaoExibicao }: any) {

    return (
        // CONTROLAEXIBICAO SENDO PASSADA COMO PROPRIEDADE CSS PARA TODO O CHAT //
        <div className={`${controlaExibicao} flex justify-center self-center items-center w-full h-screen`}>
            <div className="chat  bg-[#e0f1fd] rounded-t-xl rounded-b-xl
            w-64 h-[32rem]
            ">
                <div
                    className="flex py-2 flex-row rounded-t-xl w-64
                 text-center text-white pl-4 bg-white
                 border-b border-b-[#1e1b1b] shadow-sm shadow-[#afafaf]
                
                 ">
                    <div className=' border-[#e7e7e7] border rounded-full p-[5px]'>
                        <Image width={100} height={100} src={chatbot.src} alt='chatbot-image'
                            className='w-[35px] h-[35px]'
                        />
                    </div>

                    <div className='text-[13px] relative top-2 left-4'>
                        <span className='text-black font-semibold'>Chatbot</span>

                        <span className='relative top-5 right-12 text-[#7cfc00] font-normal'>
                            online
                        </span>

                    </div>
                    <div className='text-black justify-end flex pl-16 pb-4'>
                        <button onClick={() => { funcaoExibicao() }}>X</button>

                    </div>
                </div>


                <div id='chat-block'
                    className="py-[34px]  justify-center overflow-y-auto text-center">
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

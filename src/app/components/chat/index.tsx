'use client'
import React from 'react'
import CampoParaMensagens from '../CampoParaMensagens'
import chatbot from '../../../../public/assets/chatbot.png';

// exibe_oculta_chat ? controlaExibicaoChat = 'flex' : controlaExibicaoChat = 'hidden';

export default function Chat({ controlaExibicao }: any) {

    return (
        <div className={`${controlaExibicao}`}>
            <div className="relative top-[30px]  bg-[#e0f1fd] rounded-t-xl rounded-b-xl
            w-64 h-[32rem] 
            ">
                <div
                    className="flex py-2 flex-row rounded-t-xl w-64
                 text-center text-white pl-4 bg-white
                 border-b border-b-[#f5f5f5] shadow-sm shadow-[#afafaf]
                
                 ">
                    <div className=' border-[#e7e7e7] border rounded-full p-[5px]'>
                        <img src={chatbot.src} alt='chatbot-image'
                            className='w-[35px] h-[35px]'
                        />
                    </div>

                    <div className='text-[13px] relative top-2 left-4'>
                        <span className='text-black'>Chatbot</span>

                        <span className='relative top-5 right-12 text-[#7cfc00] font-normal'>
                            online
                        </span>
                    </div>

                </div>

                <div className="grid grid-cols-1
        py-[34px]  justify-center overflow-y-auto">
                    <div>

                        {/* <CampoParaMensagens /> */}
                    </div>
                </div>
            </div>

        </div>
    )
}

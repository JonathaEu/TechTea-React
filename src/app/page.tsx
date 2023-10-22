'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Chat from './components/chat'
// import api from "../../services/api"
import infinito from '../../public/assets/infinito.png'

export default function Home() {
  const [teste, setTeste] = useState('hidden');
  const [textoBotaoChat, setTextoBotaoChat] = useState('Iniciar chat');
  function IniciaChat() {
    //----- If tenário abaixo: (forma encurtada de utilizar if-else)-------//
    //----------------- Aqui controlamos a exibição do chat-------------//
    // teste == null || 'hidden' ? setTeste('') : '';
    // teste == '' ? setTeste('hidden') : '';
    //--------------------------------------------------------------------//

    //-----------estrutura padrão do if else  abaixo: -------------------//
    if (teste == null || 'hidden') {
      setTeste('');
      setTextoBotaoChat('Fechar Chat');
    }
    if (teste === '') {
      setTeste('hidden');
      setTextoBotaoChat('Abrir chat');
    }//----------------------------------------------------------------//
    console.log(teste)
  }

  return (
    <>
      <div className="parent">
        <div className="desc">
          <h1 className="text"><span id="tech-titulo">Tech</span><span id="TEA-titulo">TEA</span></h1>
          <p>Bem-vindo ao TechTEA, um teste projetado para ajudar seus usuários a identificar sinais que podem estar relacionados ao transtorno do espectro autista.</p>
          {/* <button id="init">START CHAT</button> */}
          <div>
            <button
              className="bg-[#dd2c90] rounded-2xl w-32 px-2 py-1
            relative left-20 top-10 uppercase text-sm
            "
              onClick={() => { IniciaChat() }}>
              <i className="text-white">{textoBotaoChat}</i></button>
          </div>

        </div>
        <div className='relative top-2 left-14 w-[40%]'>
          <img src={infinito.src} alt='infinito' className='home-image' />
        </div>
        <div>
          <Chat controlaExibicao={teste} />
        </div>
      </div>

    </>
  )

}

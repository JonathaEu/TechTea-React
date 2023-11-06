'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Chat from './components/chat'
// import api from "../../services/api"
import infinito from '../../public/assets/infinito.png'
import api from './services/api'
import postMensagemInicial from './functions/postMensagemInicial/intex'
import ParagrafosDoChat from './components/paragrafosDoChat'

export default function Home() {
  //------------Essas States armazenam, neste caso em específico, Strings-----------//
  //----Essas strings serão passadas como propriedade CSS Para componentes como o chat---//
  //---------------Com a finalidade de exibi-lo ou oculta-lo----------------//
  //---O estado inicial é definido como "hidden" pois de inicio o chat está escondido-----//
  //OBS:APOS A DECLRAÇÃO DA STATES, DENTRE <> FICA DECLARADO O TIPO DA INFORMAÇÃO CONTIDA NA STATE//
  const [controlaExibicaoChat, setcontrolaExibicaoChat] = useState<string>('hidden');
  const [controlaExibicaoImagem, setControlaExibicaoImagem] = useState<string>('');
  const [textoBotaoChat, setTextoBotaoChat] = useState<string>('Iniciar chat');
  const [respostaInicialBot, setRespostaInicialBot] = useState({});

  const [controlaExibicaoElementosDoChat, setControlaExibicaoElementosDoChat] = useState<boolean>(false);
  //----FUNÇÃO QUE CONTROLA A EXIBIÇÃO DO CHAT, É ACIONADA PRESSIONANDO O BOTOÃO----//
  function IniciaChat() {
    //-----------AQUI CONTROLAMOS O ESTADO DO CHAT, SE É VISIVEL OU NÃO---------//
    if (controlaExibicaoChat == null || 'hidden') {
      setcontrolaExibicaoChat('');
      setTextoBotaoChat('Fechar chat');
      setControlaExibicaoImagem('hidden')
    }
    if (controlaExibicaoChat === '') {
      setcontrolaExibicaoChat('hidden');
      setTextoBotaoChat('Abrir chat');
      setControlaExibicaoImagem('');
    }
    //----------------------------------------------------------------//
    // Ao iniciar o chat, chama a função que vai trazer as opcoes iniciais do bot //
    teste();
  }

  let mensagemInicial = { "mensagemInicial": "qualquer coisa" }

  function teste() {
    if (textoBotaoChat === 'Iniciar chat') {
      postMensagemInicial({ mensagemInicial })
        .then((response: any) => {
          console.log(response)
          setRespostaInicialBot(response)
          setControlaExibicaoElementosDoChat(true)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  return (
    <>
      <div className='parent'>
        <div className="desc w-[70%] flex items-center justify-center h-full ">
          <div>
            <h1 className="text"><span id="tech-titulo">Tech</span><span id="TEA-titulo">TEA</span></h1>
            <p className='w-fit pt-10'>Bem-vindo ao TechTEA, um teste projetado para ajudar seus usuários a identificar sinais que podem estar relacionados ao transtorno do espectro autista.</p>
            <div>

              {/* BOTAO QUE AO SER CLICKADO INICIA O CHAT E ALTERNA O TEXTO DE SI MESMO; */}
              <button
                className="bg-[#dd2c90] rounded-2xl w-32 px-2 py-1
            relative left-20 top-10 uppercase text-sm
            "
                onClick={() => { IniciaChat() }}>

                <i className="text-white">{textoBotaoChat}</i>
              </button>
            </div>
          </div>

        </div>
        <div className={` ${controlaExibicaoImagem}`}>
          <Image width={400} height={400} src={infinito.src} alt='infinito' className={`home-image absolute top-48 right-48 md:right-24 w-[40%]`} />
        </div>
        <div className='absolute top-9 right-32'>
          <Chat controlaExibicaoElementosDoChat={controlaExibicaoElementosDoChat} respostaInicialBot={respostaInicialBot}
            controlaExibicao={controlaExibicaoChat} funcaoExibicao={IniciaChat}
          />
        </div>
      </div>

    </>
  )

}

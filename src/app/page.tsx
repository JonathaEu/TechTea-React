'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Chat from './components/chat'
// import api from "../../services/api"
import infinito from '../../public/assets/infinito.png'
import api from './services/api'
import ImprimeElementosNoChat from './functions/imprimeElementosNoChat'

export default function Home() {
  //------------Essas States armazenam, neste caso em específico, Strings-----------//
  //----Essas strings serão passadas como propriedade CSS Para componentes como o chat---//
  //---------------Com a finalidade de exibi-lo ou oculta-lo----------------//
  //---O estado inicial é definido como "hidden" pois de inicio o chat está escondido-----//
  //OBS:APOS A DECLRAÇÃO DA STATES, DENTRE <> FICA DECLARADO O TIPO DA INFORMAÇÃO CONTIDA NA STATE//
  const [controlaExibicaoChat, setcontrolaExibicaoChat] = useState<string>('hidden');
  const [controlaExibicaoImagem, setControlaExibicaoImagem] = useState<string>('');
  const [textoBotaoChat, setTextoBotaoChat] = useState<string>('Iniciar chat');
  const [respostaTeste, setRespostaTeste] = useState({});
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

  let mensagemTeste = { "inputTeste": "qualquer coisa" }

  async function teste() {
    if (textoBotaoChat === 'Iniciar chat') {
      console.log(textoBotaoChat)
      try {
        const response = await api.post('teste', mensagemTeste);
        console.log(response.data);
        setRespostaTeste(response.data);
        controlaMensagemInicial(); // Chame a função para imprimir os elementos no chat.
      } catch (err) {
        console.log(err);
        console.log(mensagemTeste);
      }
    }
  }
  function controlaMensagemInicial() {
    ImprimeElementosNoChat(respostaTeste)
  }

  return (
    <>
      <div className="parent">
        <div className="desc">
          <h1 className="text"><span id="tech-titulo">Tech</span><span id="TEA-titulo">TEA</span></h1>
          <p>Bem-vindo ao TechTEA, um teste projetado para ajudar seus usuários a identificar sinais que podem estar relacionados ao transtorno do espectro autista.</p>
          <div>

            {/* BOTAO QUE AO SER CLICKADO INICIA O CHAT E ALTERNA O TEXTO DE SI MESMO; */}
            <button
              className="bg-[#dd2c90] rounded-2xl w-32 px-2 py-1
            relative left-20 top-10 uppercase text-sm
            "
              onClick={() => { IniciaChat(), console.log(respostaTeste) }}>

              <i className="text-white">{textoBotaoChat}</i>
            </button>
          </div>

        </div>
        <div className={`relative top-2 left-14 w-[40%] ${controlaExibicaoImagem}`}>
          <img src={infinito.src} alt='infinito' className={`home-image `} />
        </div>
        <div>
          <Chat controlaExibicao={controlaExibicaoChat} funcaoExibicao={IniciaChat} />
        </div>
      </div>

    </>
  )

}

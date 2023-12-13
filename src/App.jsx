import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import "./App.css"

// Função para gerar um ID aleatório
function randomID(len) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

// Função para obter parâmetros de URL
export function getUrlParams(
  url = window.location.href
) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

// Componente principal da aplicação
export default function App() {
  // Obtém o parâmetro 'roomID' da URL ou gera um ID aleatório
  const roomID = getUrlParams().get('roomID') || randomID(5);

  // Função assíncrona para configurar e iniciar uma chamada
  let myMeeting = async (element) => {
    // Gera um Token para o Kit
    const appID = 1538815538;
    const serverSecret = "159342bf7ac813368b55c34d0f04810b";
    const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,  randomID(5),  randomID(5));

    // Cria uma instância a partir do Token do Kit
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    // Inicia a chamada
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'Copy link',
          url:
           window.location.protocol + '//' + 
           window.location.host + window.location.pathname +
            '?roomID=' +
            roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall, // Para chamadas 1-on-1, modifique o parâmetro para [ZegoUIKitPrebuilt.OneONoneCall].
      },
    });
  };

  // Renderiza o componente React
  return (
    <div
      className="myCallContainer"
      ref={myMeeting} // Referência à função para o elemento React
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
}

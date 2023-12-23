import { useDispatch, useSelector } from "react-redux";
import { emptyParticipants } from "../redux/participantsSlice";
import { setDrawDone } from '../redux/drawStateSlice';
import { UserIcon } from "@heroicons/react/24/solid";

export const ChooseRandom = () => {
  const dispatch = useDispatch();
  const participants = useSelector((state) => state.participants);
  const participantsList = Array.from(participants);  
  const drawState = useSelector((state) => state.drawState.isDrawDone);
  
  console.log(drawState);

  const sendEmails = (senderName,senderEmail,receiverName) => {
    const Email = { 
      send: function (a) { 
        return new Promise(function (n, e) { a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send"; var t = JSON.stringify(a); Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) { n(e) }) }) }, ajaxPost: function (e, n, t) { var a = Email.createCORSRequest("POST", e); a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function () { var e = a.responseText; null != t && t(e) }, a.send(n) }, ajax: function (e, n) { var t = Email.createCORSRequest("GET", e); t.onload = function () { var e = t.responseText; null != n && n(e) }, t.send() }, createCORSRequest: function (e, n) { var t = new XMLHttpRequest; return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t } };

    const config = {
      SecureToken: '83182f95-c296-4335-a8dd-df8b14c1cfaf',
      To : `${senderEmail}`,
      From : 'noe@elarcadenoe.es',
      Subject : 'Resultado del amigo invisible.',
      Body : `Hola ${senderName}. \n La persona que te ha tocado en el sorteo del amigo invisible es ${receiverName}`,
    }

    Email.send(config).then((data) => {
        console.log(data);
        dispatch(setDrawDone(true));
      });
  }

  const assign = {
    players:[...participants],
    player1:undefined,
    player2:undefined,
    playersCopy1:[...participants],
    playersCopy2:[...participants],
    random1:undefined,
    random2:undefined,
    results: [],
    init: () => {
      // console.log('entro en init');
      assign.loopPlayers(assign.players.length);
    },
    generateRndNr: () => {
      return Math.floor(Math.random()* assign.playersCopy1.length);
    },
    reStartLoop: () => {
      assign.results.length = 0;
      assign.player1 = undefined;
      assign.player2 = undefined;
      assign.playersCopy1.length = 0;
      assign.playersCopy2.length = 0;
      assign.random1 = undefined;
      assign.random2 = undefined;
      // console.log('playersCopy1',assign.playersCopy1);
      // console.log('playersCopy2',assign.playersCopy2);
    },
    loopPlayers: (number) => {
      // console.log('tengo que dar',number,'vueltas');
      let i=1;
      while(i <= number) {
        // console.log('playersCopy1 length en for',assign.playersCopy1.length);
        if (assign.playersCopy1.length === 0) {
          break
        }
        // console.log('vuelta',i);        
        assign.generateCouple(i); 
        i=i+1;
      }
      if (assign.playersCopy1.length === 0) {
        // console.log('mandaría el init otra vez');
        assign.playersCopy1 = [...assign.players];
        assign.playersCopy2 = [...assign.players];
        assign.init();
      }
    },
    generateCouple: (loopNr) => {
      assign.random1 = assign.generateRndNr();
      assign.random2 = assign.generateRndNr();

      assign.player1name = assign.playersCopy1[assign.random1].name;
      assign.player1email = assign.playersCopy1[assign.random1].email;
      assign.player2name = assign.playersCopy2[assign.random2].name;
      assign.player2email = assign.playersCopy2[assign.random2].email;
  
      if (assign.playersCopy1.length < 2) {
        switch (assign.player1name === assign.player2name) {
          case (true):
            // console.log('ultimos guachos son iguales. Reinicio');
            assign.reStartLoop();
            break;
          default:
            assign.results.push({
              parejaID: loopNr, 
              'name1':assign.player1name, 
              'email1': assign.player1email, 
              'name2':assign.player2name,
              'email2':assign.player2email,  });
              break;
        }
        assign.final();      
      } else {
        switch (assign.player1name === assign.player2name) {
          case (true):
            // console.log('guachos son iguales en loop normal. Tengo que reiniciar.');
            assign.reStartLoop();
            break;
          default:
            // console.log('guachos son diferentes');
            assign.results.push({
              parejaID: loopNr, 
              'name1':assign.player1name, 
              'email1': assign.player1email, 
              'name2':assign.player2name,
              'email2':assign.player2email,  });
            assign.playersCopy1.splice(assign.random1,1);
            assign.playersCopy2.splice(assign.random2,1);
            break;
        }
      }
    },
    final: () => {
      // console.log('final');
      assign.results.map(pareja => {
        // console.log(pareja.parejaID, pareja.name1, pareja.email1, pareja.name2);
        sendEmails(pareja.name1, pareja.email1, pareja.name2)
      })
      dispatch(emptyParticipants());
    }
  }

  const lanzaSorteo = (e) => {
    e.preventDefault();
    if (participantsList.length >= 3) {
      assign.init();
    }
  }
  
  return (
    <>
    <div className='bg-blue-200 rounded-b-3xl py-4 sm:py-6 px-4 lg:px-6 flex flex-col gap-2 shadow-2xl'>
      <h3 className='text-slate-700  text-xl md:text-2xl font-bold flex flex-row gap-2'>
        Listado participantes<span className='text-slate-500'>({participants.length})</span>
      </h3>
      {(participantsList.length < 3) ?
        <>
        <span className='text-rose-800 font-bold'>No hay suficientes participantes. Añade más</span>
        </>
        : ''}
      {(participantsList.length >= 12) ?
        <>
        <span className='text-rose-800 font-bold'>No puedes añadir más participantes</span>
        </>
        : ''}
      <ul
        className='flex flex-col gap-3'>
        {participantsList && 
        participantsList.map(participant => {
        return (
          <li 
            key={participant.id}
            className='flex flex-row gap-3 items-center text-slate-700  ' >
              <div className='rounded-full bg-white py-2 px-2'><UserIcon  className='size-4 text-slate-500'/></div>
              <div className='flex flex-row gap-2 items-baseline'>
                <span className='text-2xl font-bold'>{participant.name}</span>
                <span className='text-slate-500 text-base'>({participant.email})</span>
              </div>
          </li>
        );
      })}</ul>
      {(participantsList.length >= 3 && participantsList.length <= 12) ?
        <>
        <button
          type='submit'
          onClick={lanzaSorteo}
          className='bg-green-600 rounded-xl text-l sm:text-xl font-bold py-2 flex justify-center items-center gap-1 mt-4 mb-1'>
            ¡Lanzar sorteo!</button>
        </>
        :''
      }
    </div>
    </>
  );
}
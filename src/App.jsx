import { useSelector } from 'react-redux';
import { ChooseRandom } from './components/ChooseRandom'
import { ParticipantsForm } from './components/ParticipantsForm'
import { DrawDone } from './components/DrawDone';

function App() {
  const drawState = useSelector((state) => state.drawState.isDrawDone);  

  return (
    <>
      <main className='bg-blue-500 font-plex text-white pt-6 lg:pt-20 pb-12 min-h-screen'>
        <section className='container mx-auto lg:w-8/12 lg:max-w-4xl flex flex-col px-6 lg:px-0 gap-px'>
          <h1 className='text-5xl lg:text-7xl font-yesteryear flex justify-center md:justify-start mb-4'>Amigo Invisible</h1>
          {drawState ? 
            <>
              <DrawDone />
            </>
            :
            <>
              <ParticipantsForm />
              <ChooseRandom />
            </>
            }
          <div className='mt-2 text-blue-100 px-2 mt-8 font-thin'>
            <p>Esta aplicación sirve para hacer un sorteo del Amigo invisible. Introduce al mensos 3 nombres y como máximo 12. Un proceso aleatorio realizará el sorteo y enviará un email a cada participante con el nombre de su amigo invisible.</p>
            <p>No almacenamos los nombres, ni los emails de los jugadores. No se realizará ningún tipo de suscripción ni se venderán tus datos a un tercero. Solo recibirán un email cada uno de los participantes introducidos en el sorteo.</p>
            <p className='text-sm mt-8 mb-4'>Esta app está creada por <a href="https://www.linkedin.com/in/theninexl/" target="_blank" className='underline underline-offset-2'>Noé Alegría</a>. El código puede encontrarse en <a href="https://github.com/theninexl/secret-santa"  className='underline underline-offset-2' target="_blank" rel="noreferrer">Github</a> y fue actualizada por última vez el 22/12/2023. Si la has utilizado, por favor ayudame a seguir manteniéndola con una pequeña donación.</p>
          </div>
        </section>
        
      </main>
    </>
  )
}

export default App

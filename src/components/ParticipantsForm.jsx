import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addParticipant, emptyParticipants } from "../redux/participantsSlice";
import { AtSymbolIcon, UserIcon, UserPlusIcon } from '@heroicons/react/24/outline'

export const ParticipantsForm = () => {
  const dispatch = useDispatch();
  const participants = useSelector((state) => state.participants);
  const participantsList = Array.from(participants);    
  const [formState, SetFormState] = useState({});

  const changeHandler = (event) => {
    SetFormState({...formState, [event.target.name]: event.target.value});    
  }

  const submitHandler = (event) => {
    event.preventDefault();
    const form = document.querySelector('#addParticipantForm')
    const participantNameInput = form.querySelector('#participantName');
    const participantName = participantNameInput.value;
    const participantEmailInput = form.querySelector('#participantEmail');
    const participantEmail = participantEmailInput.value;
    const newParticipantId = participantsList.length+1;
    dispatch(addParticipant({id:newParticipantId, name:participantName, email:participantEmail}));  
  }

  return (
    <>
    <div className=' bg-slate-50 rounded-t-3xl py-4 sm:py-6 px-4 lg:px-6 flex flex-col gap-2'>
      <h3 className='text-slate-700 text-xl md:text-2xl font-bold'>Añadir participante</h3>
      <form
        id='addParticipantForm'
        className='flex flex-col gap-2 sm:gap-4'
        onSubmit={submitHandler}>
          <div className="flex flex-col md:flex-row gap-4 mb-3 md:mb-0">
            <div
              className='sm:border sm:border-solid sm:rounded-2xl sm:border-slate-200 sm:py-2 sm:px-2 grow'>
              <label className="flex flex-col gap-1">
                <span 
                  htmlFor='name1'
                  className='text-slate-400 text-sm sm:text-s flex flex-row items-center gap-1'>
                    <UserIcon className='size-3' />Nombre</span>
                <input
                  id='participantName'
                  type='text' 
                  name='name1' 
                  placeholder='Escribe aquí'
                  className='bg-slate-200 text-slate-700 rounded-xl min-h-10 sm:min-h-12 px-3 sm:text-xl font-bold'
                  onChange={changeHandler}
                  value={formState.name1 || ''} />
              </label>
            </div>
            <div
              className='sm:border sm:border-solid sm:rounded-2xl sm:border-slate-200 sm:py-2 sm:px-2 grow'>
              <label className="flex flex-col gap-1">
                <span 
                  htmlFor='email1'
                  className='text-slate-400 text-sm sm:text-s flex flex-row items-center gap-1'>
                    <AtSymbolIcon className='size-3' />Enviar el resultado a</span>
                <input 
                  id='participantEmail'
                  type='text' 
                  name='email1' 
                  placeholder='Escribir email'
                  className='bg-slate-200 text-slate-700 rounded-xl min-h-10 sm:min-h-12 px-3 sm:text-xl font-bold'
                  onChange={changeHandler}
                  value={formState.email1 || ''} />
              </label>
            </div>
        </div>
        { participantsList.length < 12 ? 
          <>
            <button
              type='submit'
              className='bg-indigo-500 rounded-xl text-l sm:text-xl font-bold py-2 flex justify-center items-center gap-1'>
                <UserPlusIcon className='size-5'/>Añadir participante</button>
          </>
        :''}
        
      </form>
    </div>    
    </>
  );
};
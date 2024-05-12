import { useEffect, useRef } from 'react'
import { IStep } from '~/interface/interfaces';
interface PropsViewModal{
    setPopUp: (value:boolean)=>void;
    selectStep?: IStep
}
export const ViewModal = ({setPopUp, selectStep}:PropsViewModal) =>{
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setPopUp(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setPopUp]);

  return (
    <div className='w-screen h-screen bg-[#4F4B5C] bg-opacity-70 fixed top-0 right-0 flex justify-center items-center'>
      <div ref={modalRef} className='container bg-white p-10 rounded-3xl shadow-md py-12 w-[680px]'>
        <h1 className='font-semibold text-title text-secondary-100'>{selectStep?.title}</h1>
        <form className='flex flex-col gap-4 mt-10'>
            <div className='flex flex-col'>
                <label className='text-sm font-semibold' htmlFor='id'>Id</label>
                <input type="text" name='id' value={selectStep?.id} disabled className='bg-background outline outline-1 outline-secondary-75 h-12 py-3 px-4 rounded-xl focus:outline-primary focus:shadow-md focus:shadow-[#7357FF]/50'/>
            </div>
            <div className='flex flex-col'>
                <label className='text-sm font-semibold' htmlFor='title'>Titulo</label>
                <input type="text"  name='title' value={selectStep?.title} disabled className='bg-background outline outline-1 outline-secondary-75 h-12 py-3 px-4 rounded-xl focus:outline-primary focus:shadow-md focus:shadow-[#7357FF]/50'/>
            </div>
            <div className='flex flex-col'>
                <label className='text-sm font-semibold' htmlFor='content'>Conteúdo</label>
                <textarea name='content' value={selectStep?.content} disabled className='resize-none bg-background outline outline-1 outline-secondary-75 h-28 py-3 px-4 rounded-xl focus:outline-primary focus:shadow-md focus:shadow-[#7357FF]/50'>
                </textarea>
            </div>
            <div className='flex justify-end gap-6 mt-10'>
                <button 
                    className='py-3 px-6 min-w-36 border border-primary text-primary font-semibold rounded-xl hover:text-primary-100 hover:border-primary-100'
                    onClick={() => setPopUp(false)}
                >
                    Fechar
                </button>
            </div>
        </form>
      </div>
    </div>
  )
}
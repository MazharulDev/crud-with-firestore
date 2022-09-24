import { useState } from 'react';
import './App.css';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from './firebase.init';
import { useEffect } from 'react';
import { AiFillCaretDown } from 'react-icons/ai'
import { AiFillCaretUp } from 'react-icons/ai'
import { useRef } from 'react';

function App() {
  const addField = useRef()
  const [techlist, setTechlist] = useState([]);
  const techlistRef = collection(db, "techlist");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = addField.current.value;
    await addDoc(techlistRef, { name: text });
    addField.current.value = ''
  }

  useEffect(() => {
    const getTechlist = async () => {
      const data = await getDocs(techlistRef);
      setTechlist(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    }
    getTechlist()
  }, [techlistRef]);

  return (
    <div>
      {
        techlist.map(tech => <div key={tech.id}>
          <div className='flex justify-center'>
            <div className='w-1/4 py-3 px-4 rounded-lg bg-blue-200 mt-3 flex justify-between items-center'>
              <h2 className='text-2xl'>{tech.name}</h2>
              <div className='flex items-center gap-6 '>
                <button><AiFillCaretUp className='text-blue-900' /></button>
                <button><AiFillCaretDown className='text-blue-900' /></button>
                <button><p className='text-red-500 font-bold'>X</p></button>
              </div>
            </div>
          </div>
        </div>)
      }
      <div className=' flex justify-center mt-3'>
        <div className='w-1/4'>
          <form className='bg-blue-200 py-2 px-4 rounded-lg flex justify-between' onSubmit={handleSubmit}>
            <input className='p-2 border rounded-lg w-full border-blue-900' type="text" name="tect" ref={addField} />
            <input className='py-2 px-4 bg-blue-900 text-white rounded-lg hover:bg-blue-700 transition-all cursor-pointer ml-3' type="submit" value="Add" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;

import { useState } from 'react';
import './App.css';
import { collection, getDoc, getDocs } from 'firebase/firestore';
import { db } from './firebase.init';
import { useEffect } from 'react';

function App() {
  const [techlist, setTechlist] = useState([]);
  const techlistRef = collection(db, "techlist");
  useEffect(() => {
    const getTechlist = async () => {
      const data = await getDocs(techlistRef);
      console.log(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    }
    getTechlist()
  }, [techlistRef])
  return (
    <div>

    </div>
  );
}

export default App;

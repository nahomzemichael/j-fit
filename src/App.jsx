import './app.css'
import Hero from './components/Hero'
import Exercises from './components/Exercises'
import SideBar from './components/sideBar'
import { useState } from 'react';




function App() {
  const [selectedBodyPart, setSelectedBodyPart] = useState(null);

 return (
  <>
    <SideBar onSelect={setSelectedBodyPart} />

    <Hero/>
    {selectedBodyPart ? (
          <Exercises bodyPart={selectedBodyPart} setBodyPart={setSelectedBodyPart} />
        ) : (
          setSelectedBodyPart("cardio")
        )}
    
    
    
  </>
)}

export default App

import React from 'react'
import { useState, useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Exercises from './Exercises'


 const API_KEY = '80167ce9b1msh159aa84d45f9a99p1df68ajsnf196be19a685'


const BodyParts = () => {
 
  const [isLoading,setIsLoading] = useState (false);
  const [error,setError] = useState(null)
  const [bodyParts, setBodyParts] = useState([])
  const [bodyPart, setBodyPart] = useState(null)

  
  
  useEffect(() => {
    setIsLoading(true)
  const fetchBodyParts = async () => {
      try {
	      const response = await fetch('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', {
        method: 'GET',
        headers: {
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
        'x-rapidapi-key': API_KEY
	    
    }
  });

      if (!response.ok) {
        throw new Error (`status: ${response.status}`)
      }
        
	      const result = await response.json();
	      setBodyParts(result);
        
      } catch (e) {
	      setError(e.message || 'error');
      }finally{
        setIsLoading(false)
      }
  }
  fetchBodyParts();

  },[])

  
  return (
    <div className="container">
      <h1 className="text-4xl lg:text-5xl text-center px-10 py-3 text-purple-400 font-bold ">Body Parts</h1>
      <p className="px-10 py-3 lg:text-3xl text-center text-gray-500 font-bold text-2xl  ">At least train 1 body-part a week</p>
      {isLoading? (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress className="justify-center items-center" />
        </Box>
      ) :
        error? (<p>{error}</p>) : 
        (
          <>
            <div className="mt-0 p-10 grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-4 text-center ">

              { bodyParts.map((part,idx) => {
                  return (
                    
                    <button  key={idx} className="px-4 py-6 rounded  border-1  border-gray-400 w-full   hover:bg-gray-200 transition-all duration-300 cursor-pointer  "
                    onClick={()=>{
                      setBodyPart(part)
                      }
                    }
                    >
                      {part}
                    </button>
                  
                  )
                } )
              }  
          
            </div>
            
            {bodyPart && <Exercises bodyPart={bodyPart} />}
          
          </>
        )
      }
      
       
    </div>
  )
}

export default BodyParts

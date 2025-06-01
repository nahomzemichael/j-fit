
import {useState, useEffect} from 'react'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const Exercises = ({bodyPart,setBodyPart}) => {
  const API_KEY = '80167ce9b1msh159aa84d45f9a99p1df68ajsnf196be19a685'
  const [exercises, setExercises] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    const handleBodyPartClick = async() => {
     
      if (!bodyPart) {
       // setBodyPart("cardio")
        //handleBodyPartClick()
        return
      };
      
      
        setIsLoading(true);
        setExercises([]);
        try{
          const response = await fetch(
            `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}?limit=10&offset=0`,
            {
              method: 'GET',
              headers: {
                'x-rapidapi-key': API_KEY,
                'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
              }
            }) 
          
            if (!response.ok) {
              throw new Error (`status: ${response.status}`)
            }

            const data = await response.json();
            setExercises(data);

        }catch (e){
          setError(e.message || 'error fetching workouts')
        }finally{
          setIsLoading(false)
        }
      
    }
    handleBodyPartClick()
  },[bodyPart,setBodyPart])

  return (
    <div className="pt-10 pb-5">
       {exercises.length === 0 ? null : 
        <h1 className="text-center text-purple-500 text-3xl md:text-4xl lg:text-5xl font-bold">
         {bodyPart} exercises</h1> 
       }  
      
      <div className="p-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {isLoading? (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        ) :
          error? (<p>{error}</p>) :
          (
            exercises.map((exercise)=> {
              return(
                <div key={exercise.id}>
                  <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={exercise.gifUrl}
                      alt={exercise.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {exercise.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {exercise.bodyPart}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
                </div>
              )
            })
          )
        }
      </div>
    </div>
  )
  
}

export default Exercises

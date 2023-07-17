import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Menu from '../Menu/Menu'
import axios from 'axios'

function Score() {
  const [score, setScore] = useState([])
  const location = useLocation()
  const [user, setUser] = useState(null)

  useEffect(() => {

    const getScore =async () => {
        try{
    
            const response =await axios.get('http://localhost:3000/api/getScore', {
                params: { user: location.state }
            })
            
            setScore(response.data.score)
            console.log(response.data)
        } catch(error) {
            console.error(error)
        }
    }

    getScore()

    console.log('Location state:', location.state)
    setUser(location?.state)
  }, [])

  console.log(user)
  console.log(score)

  return (
    <>
      <Menu user={user} />
      <h1 className=' text-center text-7xl text-green-600'> Your score out of 10 is: {score}</h1>
    </>
  )
}

export default Score

import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Menu from '../Menu/Menu'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Home() {

  const navigate = useNavigate()
  const location = useLocation()
  // let users = location.state?.user
  const [user, setUser] = useState(null)
  const [type, setType] = useState(null)
  const [question, setQuestion] = useState('')
  const [questionType, setQuestionType] = useState('')
  const [choices, setChoices] = useState([
    { id: 1, value: '', answer: 0 },
    { id: 2, value: '', answer: 0 },
    { id: 3, value: '', answer: 0 },
    { id: 4, value: '', answer: 0 },
  ])



  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  }

  const handleQuestionTypeChange = (event) => {
    setQuestionType(event.target.value);
  }

  const handleChoiceChange = (event, choiceId) => {
    const updatedChoices = choices.map((choice) => {
      if (choice.id === choiceId) {
        return { ...choice, value: event.target.value }
      }
      return choice;
    })
    setChoices(updatedChoices);
  }

  const handleAnswerChange = (event, choiceId) => {
    const updatedChoices = choices.map((choice) => {
      if (choice.id === choiceId) {
        return { ...choice, answer: event.target.checked ? 1 : 0 };
      }
      return choice;
    });
    setChoices(updatedChoices)
  }

  useEffect(() => {

    console.log('Location state:', location?.state)
    setUser(location?.state)

    if(user !== null && user !== undefined){
      setType(user.user.type)
    }

  }, [user])

  const handleSubmit = async () => {
    // Submit the question and choices to the database
    console.log('Question:', question)
    console.log('Choices:', choices)
    console.log('Question Type:', questionType)

    try{
      const response = await axios.post('http://localhost:3000/api/addQuestion',{
        question: question,
        choices: choices,
        questionType: questionType,
      }).then((response) =>{
        console.log('added sucessfully')
        console.log(response)
        navigate("/home", { state: { user } })
      })

    }catch(error){
      console.error(error)
    }
    // Reset the form
    setQuestion('')
    setChoices([
      { id: 1, value: '', answer: 0 },
      { id: 2, value: '', answer: 0 },
      { id: 3, value: '', answer: 0 },
      { id: 4, value: '', answer: 0 },
    ])
    setQuestionType('')
  }

  const handleLogout = () => {
    console.log(user)
    // Perform logout logic here
    // For example, clear user session, remove tokens, etc.
    // Then redirect to the login page
    navigate('/login');
  };

  return (
    <>

   
    <div  >
      {type === 'admin' ? (
           <>
            <button
                onClick={handleLogout}
                className="bg-blue-500 text-white left-0 rounded px-4 py-2"
              >
              Logout
              </button>
          <div className="flex flex-col items-center">
            <h2 className=' text-center'><b>Admin page</b></h2>
            <h3>Question</h3>
            <textarea 
            rows={3}
            cols={120}
            value={question} onChange={handleQuestionChange} placeholder="Enter the question" />

            <h3>Question Type:</h3>
            <input
              type="text"
              value={questionType}
              onChange={handleQuestionTypeChange}
              placeholder="Enter the question type"
            />


            <h3>Choices:</h3>
            {choices.map((choice) => (
              <div key={choice.id}>
              <input
                type="text"
                value={choice.value}
                onChange={(event) => handleChoiceChange(event, choice.id)}
                placeholder={`Choice ${choice.id}`}
              />
              <label>
                Correct Answer:
                <input
                  type="checkbox"
                  checked={choice.answer === 1}
                  onChange={(event) => handleAnswerChange(event, choice.id)}
                />
              </label>
            </div>
            ))}
            <br/>
            <button onClick={handleSubmit} className=' bg-blue-500 text-white rounded px-2 py-2'>Submit</button>
          </div>
           </>
      ) : (
        <>
          <Menu user={user} />
          <Link to="/quiz" state={user}>
            <Button className="bg-green-500 text-white my-80 mx-96" type="primary">
              Start Quiz
            </Button>
          </Link>
        </>
      )}
    </div>
  </>
  );
}

export default Home;

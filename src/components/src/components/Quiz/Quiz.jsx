import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Quiz() {

  const [trivia, setTrivia] = useState([])
  const [no, setno] =useState(0)
  const [selectedOptions, setSelectedOptions] = useState([])
  const location = useLocation()
  const navigate = useNavigate()
  
  
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    const getQuiz = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/sendingquiz')
        setTrivia(response.data)
        console.log(response.data.questions)
        console.log(response.data.options)
      } catch (error) {
        console.error(error)
      }
    }
    
    getQuiz()

    console.log('Location state:', location?.state)
    setUser(location?.state)  
    
  }, [])
  
  console.log(trivia)
  
  const handleOptionChange = (questionID, optionID) => {
    setSelectedOptions((prevOptions) => {
      const updatedOptions = prevOptions.filter((option) => option.question !== questionID)
      return [...updatedOptions, { question: questionID, option: optionID }]
    });
  };
  
  const questionIDs = trivia.questionIDs;
  
  const handleSubmit = async () => {
    try {
      console.log(user);
      console.log(selectedOptions)
      // Send the selected options to the API
      console.log(user)
      const response = await axios.post('http://localhost:3000/api/submitquiz', {selectedOptions,questionIDs,user }).then((response)=>{
        console.log(response.data)
        if(response.data)
        {
          const score=response.data.score
          console.log(score)
          alert("your score is: "+ score)
          navigate("/home",{ state: { user } })
          
        }
      })
      
      // Reset selected options
      setSelectedOptions({})
    } catch (error) {
      console.log(error)
    }
  };
  
  const displayQuestions = trivia.questions?.map((question,index) => {
    const selectedOption = selectedOptions.find((option) => option.question === question.questionID);
    
    
    return (
      <div key={question.questionID} className="bg-white rounded-lg shadow p-6 mb-4">
        <h3 className='font-sans'>   <b> {index +1})&nbsp;{question.questions}</b></h3>
        {trivia.options &&
          trivia.options
          .filter((option) => option.questionID === question.questionID)
          .map((option) => (
            <div key={option.optionID} className="flex items-center">
                <label>
                  <input type="radio" 
                  checked={selectedOption?.option === option.optionID}
                  name={`question_${question.questionID}`}
                   value={option.optionID}  
                   onChange={() => handleOptionChange(question.questionID, option.optionID)} />
                    &nbsp;{option.choice}
                </label>
              </div>
            ))}
      </div>
    )
  })

  return (
    
    <>
    <div className=' text-center text-lg font-bold'>Quiz</div>
    {displayQuestions}
    <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </>
  );
}

export default Quiz;

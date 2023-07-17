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
        console.log(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    
    getQuiz()

    console.log('Location state:', location?.state)
    setUser(location?.state)  
    
  }, [])
  
  console.log(trivia.questions)
  
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
      const response = await axios.post('http://localhost:3000/api/submitquiz', {selectedOptions,user }).then((response)=>{
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
  }
  
  const displayQuestions = [...new Set(trivia.questions?.map(question => question.questions))].map((question, index) => { // to get unipue questions without repetion
    const choices = trivia.questions.filter(q => q.questions === question); // To get a particular question along with its choices 
  
    return (
      <div key={index} className="bg-white rounded-lg shadow p-6 mb-4">
        <h3 className='font-rancho'><b>{index + 1} {question}</b></h3> 
        {choices.map((choice, idx) => ( // maping the choices
          // index of the option 
          <div key={idx} className="flex items-center"> 
            <label>
              <input
                type="radio"
                name={`question_${choice.questionID}`}
                value={choice.optionID} // option ID
                checked={selectedOptions.some(option => option.question === choice.questionID && option.option === choice.optionID)} // test satleast on of the choices is selected
                onChange={() => handleOptionChange(choice.questionID, choice.optionID)} // updating the selected answer by clicking on the radio
              />
              {choice.choice}
            </label>
          </div>
        ))}
      </div>
    );
  });
  
  
  

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

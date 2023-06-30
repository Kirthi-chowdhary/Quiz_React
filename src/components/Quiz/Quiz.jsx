import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Quiz() {
  const [trivia, setTrivia] = useState([])
  const [no, setno] =useState(0)
  const [selectedOptions, setSelectedOptions] = useState({})

  useEffect(() => {
    const getQuiz = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/sendingquiz')
        setTrivia(response.data)
        console.log(response.data.questions)
        console.log(response.data.options)
      } catch (error) {
        console.log(error)
      }
    };

    getQuiz()
  }, [])

  console.log(trivia)

  const handleOptionChange = (questionID, optionID) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [questionID]: optionID,
    }))
    // [
    //     ...prevOptions,
    //       {
    //           question : questionID,
    //           option : optionID
    //       }
    //   ]
  }

  const questionIDs = trivia.questionIDs;

  const handleSubmit = async () => {
    try {
        console.log(selectedOptions)
      // Send the selected options to the API
      const response = await axios.post('http://localhost:3000/api/submitquiz', {selectedOptions,questionIDs, })
      console.log(response.data)
      // Reset selected options
      setSelectedOptions({})
    } catch (error) {
      console.log(error)
    }
  };

  const displayQuestions = trivia.questions?.map((question) => {
    
    
    return (
      <div key={question.questionID} className="bg-white rounded-lg shadow p-6 mb-4">
        <h3 className='font-sans'>   <b>{question.questions}</b></h3>
        {trivia.options &&
          trivia.options
            .filter((option) => option.questionID === question.questionID)
            .map((option) => (
              <div key={option.optionID} className="flex items-center">
                <label>
                  <input type="radio" checked={selectedOptions[question.questionID] === option.optionID} name={`question_${question.questionID}`} value={option.optionID}  onChange={() => handleOptionChange(question.questionID, option.optionID)} />
                    &nbsp;{option.choice}
                </label>
              </div>
            ))}
      </div>
    )
  })

  return (
    
    <>
    <div>Quiz</div>
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

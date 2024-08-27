import { useState, useEffect } from 'react';
import Description from '../Description/Description';
import Options from '../Options/Options';
import Feedback from '../Feedback/Feedback';
import Notification from '../Notification/Notification';
import './App.css'

function App() {
  const [feedback, setFeedback] = useState(() => {
    const savedFeedback = JSON.parse(localStorage.getItem('feedback'))
    return savedFeedback || { good: 0, neutral: 0, bad: 0 }
  })

  useEffect(() => {
    localStorage.setItem('feedback', JSON.stringify(feedback));
  }, [feedback])

  const updateFeedback = feedbackType => {
    setFeedback(prevFeedback => ({
    ...prevFeedback,
    [feedbackType]: prevFeedback[feedbackType] + 1
    }))
  }

  const resetFeedback = () => {
    setFeedback({
      good: 0,
      neutral: 0,
      bad: 0
    })
  }

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;

  const positiveFeedbackPercentage = totalFeedback > 0
    ? Math.round((feedback.good / totalFeedback) * 100)
    : 0;

return (
    <div>
      <Description />
      <Options 
        updateFeedback={updateFeedback} 
        resetFeedback={resetFeedback} 
        totalFeedback={totalFeedback} 
      />
      {totalFeedback > 0 ? (
        <Feedback 
          feedback={feedback} 
          totalFeedback={totalFeedback} 
          positivePercentage={positiveFeedbackPercentage} 
        />
      ) : (
        <Notification message="No feedback given yet." />
      )}
    </div>
  )
}

export default App

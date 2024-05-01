import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css'
import { useSelector, useDispatch } from 'react-redux';
import { resetQuiz, setQuizStatus, setTotalScore } from '../redux/action/quizActions'
import questions from '../constants/questions.json';

export default function Navbar(props) {
    const quizReducer = useSelector((state) => state.quizReducer);
    const dispatch = useDispatch();
    const { quizStatus, selectedOptions, violations } = quizReducer;

    const restartQuiz = () => {
        dispatch(resetQuiz());
    }

    const submitTest = () => {
        let totalScore = 0;
        selectedOptions.forEach(element => {
            if (questions[element.currentQuestion].answer === element.selectedAnswer) {
                totalScore += 10;
            }
        });

        dispatch(setTotalScore(totalScore));
        dispatch(setQuizStatus("Completed"));
    }


    return (
        <div className="nav">
            {
                quizStatus === "Active" ?
                    <>
                        <div>
                            <span>Status:</span>
                            <span style={{ color: 'blue' }}> Active</span>
                        </div>

                        <div>
                            <span>Violation</span>
                            <span style={{ color: 'red' }}> {violations}</span>
                        </div>

                        <button className='quizSubmitBtn' disabled={!selectedOptions[questions.length - 1]} onClick={() => submitTest()} >Submit</button>
                    </>
                    :
                    <>
                        <Link to="/">
                            <button className='homeButton'>Home</button>
                        </Link>
                        {
                            quizStatus === "Completed" ?
                                <>
                                    <Link to="/QuizPreview">
                                        <button className='homeButton'>Submission Preview</button>
                                    </Link>
                                    <button className='quizRestartBtn' onClick={() => restartQuiz()}>Restart Quiz</button>
                                </>
                                :
                                <button className='quizStartBtn'>Start Quiz</button>
                        }

                    </>
            }

        </div>
    );
}
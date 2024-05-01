import '../styles/testActionBar.css';
import { useSelector, useDispatch } from 'react-redux';
import questions from '../constants/questions.json';
import { setCurrentQuestion, setQuizStatus, setTotalScore } from '../redux/action/quizActions';

function TestActionBar(props) {
    const quizReducer = useSelector((state) => state.quizReducer);
    const dispatch = useDispatch();

    const { currentQuestion, selectedOptions } = quizReducer;

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

    const handleNextBtnClick = () => {
        dispatch(setCurrentQuestion(currentQuestion + 1));
    }

    const handleBackBtnClick = () => {
        if (currentQuestion > 0) {
            dispatch(setCurrentQuestion(currentQuestion - 1));
        }
    }


    return (
        <div className="TestActionBar" >
            <button className='backButton' onClick={() => handleBackBtnClick()}>Previous</button>
            {
                questions.length - 1 === currentQuestion
                    ? <button disabled={!selectedOptions[currentQuestion]} className='submitButton' onClick={() => submitTest()}>Submit</button>
                    : <button disabled={!selectedOptions[currentQuestion]} onClick={() => handleNextBtnClick()} className='nextButton' >Next</button>
            }
        </div>
    );
}
export default TestActionBar
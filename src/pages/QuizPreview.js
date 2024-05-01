import '../styles/quizPreview.css';
import { useSelector } from 'react-redux';
import { QuestionCard } from '../components/index';

function QuizPreview(props) {
    const quizReducer = useSelector((state) => state.quizReducer);
    const { quizStatus, selectedOptions } = quizReducer;

    return (
        <div className="QuizPreview" >
            {
                selectedOptions.map((option, index) => <QuestionCard currentQuestion={option.currentQuestion} key={index} />)
            }

        </div>
    );
}
export default QuizPreview

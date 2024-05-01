import '../styles/home.css';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { setQuizStatus, resetQuiz, setFullScreen } from '../redux/action/quizActions'
import screenfull from 'screenfull';

function Home(props) {
    const quizReducer = useSelector((state) => state.quizReducer);
    const dispatch = useDispatch();
    const { quizStatus, totalScore, violations, showPopUp } = quizReducer;

    const restartQuiz = () => {
        dispatch(resetQuiz());
        screenfull.request();

    }

    const startQuiz = () => {
        screenfull.request();
        dispatch(setQuizStatus("Active"));
        dispatch(setFullScreen(true));
        return (
            <Navigate to="/TestBoard" replace={true} />
        )
    }

    return (
        <div className="Home" >
            <table className="quiz_info_table">
                <thead>
                    <tr>
                        <th>Quiz Title</th>
                        <th>Total Q.</th>
                        <th>Score</th>
                        <th>Correct Ans</th>
                        <th>Violation</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody id="quizTableBody">
                    {
                        quizStatus === "Completed" ?
                            <tr>
                                <td>MERN Quiz</td>
                                <td>10</td>
                                <td>{totalScore}/100</td>
                                <td>{totalScore / 10}</td>
                                <td>{violations}</td>
                                <td>19/04/2024</td>
                                <td>Completed</td>
                                <td><button onClick={() => restartQuiz()}>Restart Quiz</button></td>
                            </tr>
                            :
                            <tr>
                                <td>MERN Quiz</td>
                                <td>10</td>
                                <td>_</td>
                                <td>_</td>
                                <td>_</td>
                                <td>anyTime</td>
                                <td>Not Completed</td>
                                <td><button onClick={() => startQuiz()}>Start Quiz</button></td>
                            </tr>
                    }
                </tbody>
            </table>

        </div>
    );
}
export default Home

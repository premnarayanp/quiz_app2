import '../styles/testBoard.css';
import { useSelector, useDispatch } from 'react-redux';
import { QuestionCard, TestActionBar } from '../components/index';
import { Navigate } from 'react-router-dom';
import screenfull from 'screenfull';
import { useEffect, useState } from 'react';

import { incrementViolationsCount, setFullScreen } from "../redux/action/quizActions";

function TestBoard(props) {
    const dispatch = useDispatch();
    const quizReducer = useSelector((state) => state.quizReducer);
    const { currentQuestion, isFullScreen, quizStatus } = quizReducer;

    useEffect(() => {
        // Prevent multiple call of screenfull.on(), Otherwise when you restart  quiz again then this screenfull.on() event presented  then  it called  2 or multiple time, so violation count increased  randomly of quiz completed count time time 
        const handleChange = () => {
            // Handle fullscreen change here
            if (!screenfull.isFullscreen) {
                dispatch(setFullScreen(false));
                dispatch(incrementViolationsCount());
            }
        };

        if (screenfull.isEnabled) {
            screenfull.on('change', handleChange);
        }

        return () => {
            if (screenfull.isEnabled) {
                screenfull.off('change', handleChange);

            }
        };
    }, []);


    const handleFullscreen = () => {
        if (screenfull.isEnabled) {
            screenfull.request();
            dispatch(setFullScreen(true))
        }
    };


    if (quizStatus === "Completed") {
        return (
            <Navigate to="/" replace={true} />
        )
    }

    if (!isFullScreen) {
        return (
            <div className='notAFullScreen'>
                <p >You have exited fullscreen, please enter again to continue the quiz.</p>
                <button onClick={handleFullscreen}>Enter Fullscreen</button>
            </div>
        )
    }

    return (
        <div className="TestBoard" >
            <QuestionCard
                currentQuestion={currentQuestion}
                quizStatus={quizStatus}
            />
            <TestActionBar />
        </div>
    );
}
export default TestBoard
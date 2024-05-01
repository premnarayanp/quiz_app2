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

    //==================Full screen change===============================
    useEffect(() => {
        // Prevent multiple call of screenfull.on(), Otherwise when you restart  quiz again then this screenfull.on() event presented  then  it called  2 or multiple time, so violation count increased  randomly of quiz completed count time time 
        const handleChange = () => {    // Handle fullscreen change here
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
                screenfull.off('change', handleChange);    // Clean up the event listener 
            }
        };
    }, []);



    //==================Tab change===============================
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                // Check if unloading is true; if not, it's a regular tab switch
                const isUnloading = sessionStorage.getItem('isUnloading');
                if (!isUnloading) {
                    alert("You change the Tab , So increased the  Violations Count");
                    dispatch(incrementViolationsCount()); // Increment violation count when the tab is hidden
                }
            }
        };

        const handleBeforeUnload = () => {
            // Set the unloading flag
            sessionStorage.setItem('isUnloading', 'true');
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);


    // Cleanup the isUnloading flag on mount
    useEffect(() => {
        sessionStorage.removeItem('isUnloading');
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
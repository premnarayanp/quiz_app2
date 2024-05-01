import { SET_CURRENT_QUESTION, SET_CURRENT_SELECTED_OPTION, INCREMENT_VIOLATIONS, RESET_QUIZ, SET_TOTAL_SCORE, SET_QUIZ_STATUS, ENABLE_SUBMIT_BTN, SET_FULL_SCREEN } from './actionType';

//--------action creator functions for  Task-----------

export function setCurrentQuestion(questionIndex) {
    return {
        type: SET_CURRENT_QUESTION,
        data: questionIndex
    }
}

export function setCurrentSelectedOption(option) {
    return {
        type: SET_CURRENT_SELECTED_OPTION,
        data: option
    }
}

// export function setSelectedOption(option) {
//     return {
//         type: SET_SELECTED_OPTION,
//         data: option
//     }
// }

export function incrementViolationsCount(data) {
    return {
        type: INCREMENT_VIOLATIONS,
        //data: data
    }
}

export function setTotalScore(totalScore) {
    return {
        type: SET_TOTAL_SCORE,
        data: totalScore
    }
}

export function setQuizStatus(status) {
    return {
        type: SET_QUIZ_STATUS,
        data: status
    }
}

export function setFullScreen(val) {
    return {
        type: SET_FULL_SCREEN,
        data: val
    }
}



export function enableSubmitBtn(val) {
    return {
        type: ENABLE_SUBMIT_BTN,
        data: val
    }
}


export function resetQuiz() {
    return {
        type: RESET_QUIZ,
        data: null
    }
}




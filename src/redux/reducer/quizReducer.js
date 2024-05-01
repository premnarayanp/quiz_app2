import { SET_CURRENT_QUESTION, INCREMENT_VIOLATIONS, RESET_QUIZ, SET_CURRENT_SELECTED_OPTION, SET_QUIZ_STATUS, SET_TOTAL_SCORE, ENABLE_SUBMIT_BTN, SET_FULL_SCREEN } from "../action/actionType";
import { CURRENT_QUESTION_KEY, QUIZ_STATUS_KEY, CURRENT_SELECTED_OPTIONS_KEY, VIOLATIONS_KEY, TOTAL_SCORE_KEY, IS_FULL_SCREEN_KEY } from '../../constants/constants';
import { getItemFromLocalStorage, setItemInLocalStorage, removeItemFromLocalStorage } from '../../constants/index'

const initialQuizState = {
    currentQuestion: JSON.parse(getItemFromLocalStorage(CURRENT_QUESTION_KEY)) || 0,
    violations: JSON.parse(getItemFromLocalStorage(VIOLATIONS_KEY)) || 0,
    totalScore: JSON.parse(getItemFromLocalStorage(TOTAL_SCORE_KEY)) || 0,
    quizStatus: getItemFromLocalStorage(QUIZ_STATUS_KEY) || 'NotScheduled',
    selectedOptions: JSON.parse(getItemFromLocalStorage(CURRENT_SELECTED_OPTIONS_KEY)) || [],//selected option Array
    isFullScreen: JSON.parse(getItemFromLocalStorage(IS_FULL_SCREEN_KEY)) || false,
    showPopUp: false,
    enableSubmitBtn: false,
};

export default function quizReducer(state = initialQuizState, action) {
    switch (action.type) {

        case SET_CURRENT_QUESTION:
            setItemInLocalStorage(CURRENT_QUESTION_KEY, action.data);
            return {
                ...state,
                currentQuestion: action.data,
            }

        case INCREMENT_VIOLATIONS:
            setItemInLocalStorage(VIOLATIONS_KEY, state.violations + 1);
            // console.log("violations==", state.violations);
            return {
                ...state,
                violations: state.violations + 1,
            }

        case SET_CURRENT_SELECTED_OPTION:
            let updatedOptions = [...state.selectedOptions];
            updatedOptions[action.data.currentQuestion] = action.data;
            setItemInLocalStorage(CURRENT_SELECTED_OPTIONS_KEY, updatedOptions);

            return {
                ...state,
                selectedOptions: updatedOptions
            }

        case SET_TOTAL_SCORE:
            setItemInLocalStorage(TOTAL_SCORE_KEY, action.data);
            return {
                ...state,
                totalScore: action.data
            }


        case SET_QUIZ_STATUS:
            setItemInLocalStorage(QUIZ_STATUS_KEY, action.data);
            return {
                ...state,
                quizStatus: action.data
            }
        case SET_FULL_SCREEN:
            setItemInLocalStorage(IS_FULL_SCREEN_KEY, action.data);
            //console.log("SET_FULL_SCREEN==", action.data);
            return {
                ...state,
                isFullScreen: action.data
            }

        case ENABLE_SUBMIT_BTN:
            return {
                ...state,
                enableSubmitBtn: false
            }
        case RESET_QUIZ:
            setItemInLocalStorage(CURRENT_QUESTION_KEY, 0);
            setItemInLocalStorage(VIOLATIONS_KEY, 0);
            setItemInLocalStorage(CURRENT_SELECTED_OPTIONS_KEY, []);
            setItemInLocalStorage(TOTAL_SCORE_KEY, 0);
            setItemInLocalStorage(QUIZ_STATUS_KEY, "Active");
            setItemInLocalStorage(IS_FULL_SCREEN_KEY, true)
            return {
                ...state,
                currentQuestion: 0,
                violations: 0,
                totalScore: 0,
                selectedOptions: [],
                quizStatus: "Active",
                isFullScreen: true,
            }
        default:
            return state;
    }
}

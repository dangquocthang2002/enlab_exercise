import Types from "./constant";


type dispatchType = (arg0: { type: string; payload?: any; }) => void
const getQuizPending = () => ({
  type: Types.GET_QUIZ_PENDING,
});

const getQuizSuccess = (quiz: any) => ({
  type: Types.GET_QUIZ_SUCCESS,
  payload: quiz,
});

const fetchQuizQuestions = () => async (dispatch:dispatchType ) => {
  try {
    getQuizPending();
    let response = await fetch("https://opentdb.com/api.php?amount=10");
    let responseJson = await response.json();
    dispatch(getQuizSuccess(responseJson));
    return Promise.resolve(responseJson);
  } catch (error) {
    throw new Error();
  }
};
const setNextQuestion = (data: any) => (dispatch: dispatchType) => {
  dispatch({
    type: Types.SET_NEXT_QUESTION,
    payload: data,
  });
};
const setInitialState = () => (dispatch: dispatchType) => {
  dispatch({
    type: Types.INITIAL_STATE,
  });
};

const selectedAnswerSuccess = (questionId: any, answer: any) => ({
  type: Types.SELECT_ANSWER_SUCCESS,
  payload: {
    questionId: questionId,
    answer: answer,
  },
});

const selectedAnswerAction = (questionId: any, answer: any) => (dispatch: dispatchType) => {
  dispatch(selectedAnswerSuccess(questionId, answer));
};

const startQuizAction = () => (dispatch: dispatchType) => {
  dispatch({
    type: Types.START_QUIZ_ACTION,
    payload: new Date().getTime(),
  });
};
const endQuizAction = () => (dispatch: dispatchType) => {
  dispatch({
    type: Types.END_QUIZ_ACTION,
    payload: new Date().getTime(),
  });
};
const viewResultsAction = () => (dispatch: dispatchType) => {
  dispatch({
    type: Types.VIEW_RESULTS_ACTION,
  });
};
export {
  fetchQuizQuestions,
  setNextQuestion,
  setInitialState,
  selectedAnswerAction,
  startQuizAction,
  endQuizAction,
  viewResultsAction,
};

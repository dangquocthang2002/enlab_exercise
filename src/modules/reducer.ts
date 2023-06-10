import Types from "./constant";


export type questionType = {
  questionId?: number |string,
  category?: string,
  type?: string,
  difficulty?: string,
  question: string,
  correct_answer: string,
  incorrect_answers: Array<string>,
  answers?: Array<string>
}

export type answerType = {
  questionId: number |string,
  answer: string
}

export type quizState = {
  isLoading: boolean,
  listQuestions: Array<questionType>,
  listAnswers: Array<answerType>,
  currentNumber: number,
  start: any,
  finish: any,
} 

const initialState : quizState = {
  isLoading: true,
  listQuestions: [],
  listAnswers: [],
  currentNumber: 1,
  start: null,
  finish: null,
};

const dataReducer = (state = initialState, action : {type:string,payload: any}) => {
  switch (action.type) {
    case Types.GET_QUIZ_PENDING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case Types.GET_QUIZ_SUCCESS: {
      const { results } = action.payload;
      return {
        ...state,
        isLoading: false,
        listQuestions: results?.map((item : questionType, index: number) => ({
          ...item,
          questionId: index + 1,
          answers: [...item?.incorrect_answers, item.correct_answer].sort(
            () => Math.random() - 0.5
          ),
        })),
      };
    }
    case Types.SET_NEXT_QUESTION: {
      return {
        ...state,
        currentNumber: action.payload,
      };
    }
    case Types.SELECT_ANSWER_SUCCESS: {
      return {
        ...state,
        listAnswers: [
          ...state.listAnswers,
          {
            questionId: action.payload.questionId,
            answer: action.payload.answer,
          },
        ],
      };
    }
    case Types.START_QUIZ_ACTION: {
      return {
        ...state,
        start: action.payload,
      };
    }
    case Types.END_QUIZ_ACTION: {
      return {
        ...state,
        finish: action.payload,
      };
    }
    case Types.INITIAL_STATE: {
      return {
        isLoading: true,
        listQuestions: [],
        listAnswers: [],
        currentNumber: 1,
        start: null,
        finish: null,
      };
    }
    case Types.VIEW_RESULTS_ACTION: {
      return {
        ...state,
        currentNumber: 1,
      };
    }
    default:
      return state;
  }
};

export default dataReducer;

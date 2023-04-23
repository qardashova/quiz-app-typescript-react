export enum ACTION {
  CALL_API = "call-api",
  SUCCESS = "success",
  ERROR = "error",
}

type ActionTypes =
  | { type: ACTION.CALL_API }
  | { type: ACTION.SUCCESS; payload: Questions }
  | { type: ACTION.ERROR; payload: string };

interface EachQuestion{
  category: string,
  correct_answer: string,
  difficulty: string,
  incorrect_answers: string[],
  question: string,
  type: string
}  

interface Questions {
  response_code: number,
  results: EachQuestion[]
}

interface InitState {
  quizesData: Questions;
  loading: boolean;
  error: null | string;
}

export const INITIAL_STATE: InitState = {
  quizesData: { response_code: 0, results: [] },
  loading: false,
  error: null,
};

export const quizReducer = (state: InitState = INITIAL_STATE, action: ActionTypes): InitState => {
  switch (action.type) {
    case ACTION.CALL_API:
      return {
        ...state,
        loading: true,
      };
    case ACTION.SUCCESS:
      return {
        ...state,
        quizesData: action.payload,
        loading: false,
      };
    case ACTION.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};


export {};





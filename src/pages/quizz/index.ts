import Quiz from "./View";
import { connect } from "react-redux";
import {
  fetchQuizQuestions,
  setNextQuestion,
  setInitialState,
  selectedAnswerAction,
  startQuizAction,
  endQuizAction,
} from "../../modules/action";
const mapStateToProps = (state: any) => ({
  quiz: state.quiz,
});
const mapDispatchToProps = {
  fetchQuizQuestions,
  setNextQuestion,
  setInitialState,
  selectedAnswerAction,
  startQuizAction,
  endQuizAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(Quiz);

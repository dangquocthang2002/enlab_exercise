import { connect } from "react-redux";
import styles from "./popup.module.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { viewResultsAction } from "../../modules/action";
import { answerType, questionType } from "../../modules/reducer";
const Popup = (props: any) => {
  const { listAnswers, listQuestions, start, finish } = props?.quiz;
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const passed = correctAnswers / listQuestions?.length >= 0.5;
  useEffect(() => {
    listAnswers?.forEach((ele: answerType) => {
      const question = listQuestions.find(
        (i: questionType) => i?.questionId === ele?.questionId
      );
      if (ele?.answer === question?.correct_answer) {
        setCorrectAnswers((prev) => prev + 1);
      }
    });
  }, [listAnswers, listQuestions]);
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <img src={passed ? "medal.jpg" : "exchange.png"} alt="" />
        <h3>{passed ? "Congratulations!!" : "Completed!"}</h3>
        <span>{passed ? "You are amazing!!" : "Better luck next time!"}</span>
        <p>
          {`${correctAnswers}/${listQuestions?.length}`} correct answers in{" "}
          {Math.ceil((+finish - +start) / 1000)} seconds
        </p>
        <div className={styles.footer}>
          <button
            type="button"
            className={styles.btn}
            onClick={() => {
              props?.viewResultsAction();
              props?.togglePopup(false);
            }}
          >
            <span>View Results</span>
          </button>
          <Link to={"/"}>
            <button type="button" className={styles.btn}>
              <span>Play Again</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  quiz: state.quiz,
});
const mapDispatchToProps = {
  viewResultsAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(Popup);

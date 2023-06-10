/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserView, MobileView } from "react-device-detect";
import classnames from "classnames";

import styles from "./quiz.module.scss";
import { useEffect, useState } from "react";
import { convertToSpecialChars } from "../../utils/convertToSpecialChars";
import LoadingSpinner from "../../components/spinner/SpinnerLoading";
import Popup from "../../components/popup/Popup";
import { HiOutlineX } from "react-icons/hi";
import { Link } from "react-router-dom";
import { answerType, questionType } from "../../modules/reducer";

const Quiz = ({
  quiz,
  fetchQuizQuestions,
  setNextQuestion,
  setInitialState,
  selectedAnswerAction,
  startQuizAction,
  endQuizAction,
}: any) => {
  const { isLoading, listQuestions, currentNumber, listAnswers, finish } = quiz;
  const isQuestionAnswered =
    finish !== null
      ? listAnswers?.find((item: answerType) => item.questionId === currentNumber)?.answer
      : null;
  const [selectAnswer, setSelectAnswer] = useState<string | null>(null);
  const [isOpenPopup, setOpenPopup] = useState(false);
  const renderContent = () => {
    const quiz = listQuestions?.find(
      (item: questionType) => item.questionId === currentNumber
    );
    return isLoading ? (
      <LoadingSpinner />
    ) : (
      <div className={styles.quiz}>
        <div className={styles.closeContainer}>
          <Link to={"/"}>
            <HiOutlineX className={styles.btn_close} size={35} />
          </Link>
        </div>
        <div className={styles.questionNumber}>
          <span>Question {`${quiz?.questionId}/${listQuestions.length}`}</span>
        </div>
        <div className={styles.questionTitle}>
          <p>{convertToSpecialChars(quiz?.question)}</p>
        </div>
        <div className={styles.listAnswerContainer}>
          {quiz?.answers.map((item: string, idx: number) => (
            <div
              key={item}
              className={classnames(styles.answerContainer, {
                [styles.isActive]: item === selectAnswer,
                [styles.correctAnswer]: isQuestionAnswered
                  ? item === quiz?.correct_answer
                  : false,
              })}
            >
              <label htmlFor={item}>{convertToSpecialChars(item)}</label>
              <input
                type="radio"
                id={item}
                value={item}
                checked={item === selectAnswer}
                onChange={() => {
                  if (isQuestionAnswered) return;
                  setSelectAnswer(item);
                }}
              />
            </div>
          ))}
        </div>
        <button
          className={classnames(styles.btn, {
            [styles.enabled]: selectAnswer !== null,
          })}
          onClick={() => {
            if (!isQuestionAnswered) {
              selectedAnswerAction(quiz?.questionId, selectAnswer);
            }
            if (+currentNumber === +listQuestions.length) {
              if (!finish) {
                endQuizAction();
              }
              setOpenPopup(true);
              return;
            }
            setNextQuestion(+currentNumber + 1);
            setSelectAnswer(null);
          }}
          disabled={selectAnswer === null}
        >
          <span>
            {+currentNumber === +listQuestions.length
              ?
              "Finish"
              : "Next"}
          </span>
        </button>
      </div>
    );
  };
  useEffect(() => {
    setInitialState();
    fetchQuizQuestions();
  }, []);
  useEffect(() => {
    if (listQuestions.length !== 0 && !finish) {
      startQuizAction();
    }
  }, [listQuestions, listQuestions.length]);
  useEffect(() => {
    if (isQuestionAnswered) {
      setSelectAnswer(isQuestionAnswered);
    }
  }, [currentNumber, finish]);
  return (
    <>
      <BrowserView>{renderContent()}</BrowserView>
      <MobileView>{renderContent()}</MobileView>
      {isOpenPopup && <Popup togglePopup={setOpenPopup} />}
    </>
  );
};
export default Quiz;

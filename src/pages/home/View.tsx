import { BrowserView, MobileView } from "react-device-detect";
import styles from "./home.module.scss";
import { Link } from "react-router-dom";

const Home = () => {
  const renderContent = () => {
    return (
      <div className={styles.homepage}>
        <img src="quiz.jpg" alt="" />
        <Link to={"/quiz"}>
          <button type="button" className={styles.btn}>
            <span>Start Quiz !</span>
          </button>
        </Link>
      </div>
    );
  };
  return (
    <>
      <BrowserView>{renderContent()}</BrowserView>
      <MobileView>{renderContent()}</MobileView>
    </>
  );
};
export default Home;

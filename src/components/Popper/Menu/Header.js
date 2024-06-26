import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Menu.module.scss";
import classNames from "classnames/bind";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles);

function Header({ title, onback }) {
  return (
    <header className={cx("header")}>
      <button onClick={onback} className={cx("back-btn")}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <h4 className={cx("header-title")}>{title}</h4>
    </header>
  );
}

export default Header;

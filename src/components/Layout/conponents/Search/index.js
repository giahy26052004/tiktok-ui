import AcountItem from "~/components/AcountItem";
import Tippy from "@tippyjs/react/headless";
import { Wrapper as PopperWrapper } from "~/components/Popper";
import * as searchServices from "~/apiServices/searchServices";
import { useEffect, useState, useRef } from "react";
import classNames from "classnames/bind";
import styles from "./Search.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDebounce } from "~/hooks";
import {
  faMagnifyingGlass,
  faSpinner,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);
function Search() {
  const [showResult, setShowResult] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const inputref = useRef();
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounced = useDebounce(searchValue, 500);
  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResult([]);
      return;
    }
    setLoading(true);
    const fetchApi = async () => {
      setLoading(true);
      const result = await searchServices.Search(debounced)
      setSearchResult(result);
      setLoading(false);
    };
    fetchApi();
  }, [debounced]);
  const handleClear = () => {
    setSearchValue("");
    setSearchResult([]);
    inputref.current.focus();
  };
  const handleHideResult = () => {
    setShowResult(false);
  };

  return (
    <>
      <Tippy
        interactive
        visible={showResult && searchResult.length > 0}
        render={(attrs) => (
          <div className={cx("search-result")} tabIndex="-1" {...attrs}>
            <PopperWrapper>
              <h4 className={cx("search-title")}>Accounts</h4>
              {searchResult.map((result) => (
                <AcountItem key={result.id} data={result} />
              ))}
            </PopperWrapper>
          </div>
        )}
        onClickOutside={handleHideResult}
      >
        <div className={cx("search")}>
          <input
            ref={inputref}
            placeholder="Search accounts and videos"
            spellCheck="false"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setShowResult(true)}
          />
          {!!searchValue && !loading && (
            <button onClick={handleClear} className={cx("clear")}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          )}

          {/* { loading } */}
          {loading && (
            <button className={cx("loading")}>
              <FontAwesomeIcon icon={faSpinner} />
            </button>
          )}

          <button className={cx("search-btn")}>
            {" "}
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </Tippy>
    </>
  );
}

export default Search;

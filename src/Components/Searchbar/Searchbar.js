import { useState } from "react";
import PropTypes from "prop-types";
import s from "./Searchbar.module.css";
export default function Searchbar({ valueSubmit }) {
  const [input, setinput] = useState("");

  const handleInputChange = (e) => {
    const saveInputValue = e.currentTarget.value;
    setinput(saveInputValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    valueSubmit(input);
    setinput("");
  };

  return (
    <>
      <header className={s.Searchbar}>
        <form onSubmit={handleSubmit} className={s.SearchForm}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={s.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            onChange={handleInputChange}
            value={input}
            placeholder="Search images and photos"
          />
        </form>
      </header>
    </>
  );
}

Searchbar.proptTypes = {
  input: PropTypes.string,
};

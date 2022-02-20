import s from "./App.module.css";
import PropTypes from "prop-types";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useState } from "react";
import Searchbar from "./Components/Searchbar/Searchbar";
import ImageGalleryItem from "./Components/ImageGalleryItem/ImageGalleryItem";

function App() {
  const [imgName, setimgName] = useState("");

  const handleFormSubmit = (painting) => {
    setimgName(painting);
  };

  return (
    <>
      <Searchbar valueSubmit={handleFormSubmit} />
      <main className={s.App}>
        <ImageGalleryItem searchName={imgName} />
      </main>
    </>
  );
}

export default App;

App.propTypes = {
  imageName: PropTypes.string,
};

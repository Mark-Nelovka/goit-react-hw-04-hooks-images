import { useState, useEffect } from "react";
import s from "./App.module.css";
import PropTypes from "prop-types";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Searchbar from "./Components/Searchbar/Searchbar";
import fetchApi from "../src/Components/serviseApi.js/fecthApi";
import LoadMore from "../src/Components/Button/Button";
import Modal from "../src/Components/Modal/Modal";
import imgNotCorrectly from "../src/images/Упс.jpeg";
import { ThreeDots } from "react-loader-spinner";
import ImageGalleryItem from "./Components/ImageGalleryItem/ImageGalleryItem";

function App() {
  const [imgName, setimgName] = useState("");
  const [imageName, setImageName] = useState(null);
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("idle");
  const [showModalState, setShowModalState] = useState(false);
  const [idImage, setidImage] = useState(0);

  useEffect(() => {
    if (name !== imgName || page > 1) {
      setStatus("pending");
      setPage(1);
      setTimeout(() => {
        fetchApi(imgName, page)
          .then((res) => {
            if (imageName === null) {
              setImageName(res);
              setName(imgName);
              setidImage(0);
              setStatus("resolved");
              return;
            }
            if (page === 1) {
              setImageName(res);
              setName(imgName);
              setidImage(0);
              setStatus("resolved");
              return;
            }
            setImageName((prevState) => [...prevState, ...res]);
            setStatus("resolved");
          })
          .catch((error) => {
            setStatus("rejected");
          });
      }, 1000);
    }
  }, [imgName, page]);

  const loadMore = (e) => {
    e.preventDefault();
    setPage((prevState) => prevState + 1);
  };

  const toggleModal = () => {
    setShowModalState(!showModalState);
  };

  const handleFormSubmit = (painting) => {
    setimgName(painting);
  };

  const showModalFunc = (id) => {
    setShowModalState(!showModalState);
    setidImage(id);
  };

  return (
    <>
      <Searchbar valueSubmit={handleFormSubmit} />
      <main className={s.App}>
        <ImageGalleryItem searchName={imageName} modal={showModalFunc} />
        {status === "pending" ? (
          <div className={s.loaderWrapper}>
            <ThreeDots color="#00BFFF" height={80} width={80} />
          </div>
        ) : null}
        {status === "resolved" ? <LoadMore onClick={loadMore} /> : null}
        {status === "rejected" ? (
          <>
            <div className={s.containerDontCorrectly}>
              <p>
                <b>{`Картинку с именем ${imgName} не найдено или они закончились`}</b>
              </p>

              <img
                src={imgNotCorrectly}
                alt={"Pictures is not fined"}
                width="400px"
                height="400px"
              />
            </div>
          </>
        ) : (
          ""
        )}
        {showModalState ? (
          <Modal image={imageName} onClose={toggleModal} id={idImage} />
        ) : null}
      </main>
    </>
  );
}

export default App;

App.propTypes = {
  imageName: PropTypes.string,
};

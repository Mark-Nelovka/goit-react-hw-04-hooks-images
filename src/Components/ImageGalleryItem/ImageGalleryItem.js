import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import s from "./ImageGalleryItem.module.css";
import { ThreeDots } from "react-loader-spinner";
import ItemsCard from "../ImageGallery/ImageGallery";
import fetchApi from "../serviseApi.js/fecthApi";
import LoadMore from "../Button/Button";
import Modal from "../Modal/Modal";
import imgNotCorrectly from "../../images/Упс.jpeg";
export default function FetchItems({ searchName }) {
  const [imageName, setImageName] = useState([]);
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("idle");
  const [showModalState, setShowModalState] = useState(false);
  const [idImage, setidImage] = useState(0);

  useEffect(() => {
    if (name !== searchName) {
      setStatus("pending");
      setTimeout(() => {
        fetchApi(searchName, 1)
          .then((res) => {
            setPage(2);
            setImageName(res);
            setName(searchName);
            setidImage(0);
            setStatus("resolved");
          })
          .catch((error) => {
            setStatus("rejected");
          });
      }, 1000);
    }
  }, [searchName]);

  const loadMore = (e) => {
    e.preventDefault();
    setPage((prevState) => prevState + 1);
    setStatus("pending");
    setTimeout(() => {
      fetchApi(searchName, page)
        .then((res) => {
          setImageName((prevState) => [...prevState, ...res]);
          setStatus("resolved");
        })
        .catch((error) => {
          setStatus("rejected");
        });
    }, 1000);
  };

  const showModal = (e) => {
    const id = Number(e.target.id);
    setShowModalState(true);
    setidImage(id);
  };

  const toggleModal = () => {
    setShowModalState(false);
  };

  return (
    <>
      {status === "resolved" || status === "pending" ? (
        <>
          <ItemsCard>
            {imageName.map(({ id, webformatURL, tags }) => {
              return (
                <li className={s.item} key={id}>
                  <img
                    width="300px"
                    height="250px"
                    onClick={showModal}
                    id={id}
                    src={webformatURL}
                    alt={tags}
                  />
                </li>
              );
            })}
          </ItemsCard>
        </>
      ) : null}
      {status === "pending" ? (
        <div className={s.loaderWrapper}>
          <ThreeDots color="#00BFFF" height={80} width={80} />
        </div>
      ) : null}
      {status === "resolved" ? (
        <div className={s.containerBtn} onClick={loadMore}>
          <LoadMore />
        </div>
      ) : null}
      {status === "rejected" ? (
        <>
          <div className={s.containerDontCorrectly}>
            <p>
              <b>{`Картинку с именем ${searchName} не найдено или они закончились`}</b>
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
    </>
  );
}

FetchItems.propTypes = {
  name: PropTypes.string,
  page: PropTypes.number,
  status: PropTypes.string,
  showModal: PropTypes.bool,
};

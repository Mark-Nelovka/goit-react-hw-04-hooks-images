import s from "./Modal.module.css";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
const modalRoot = document.querySelector("#modal-root");

export default function Modal({ onClose, image, id }) {
  const [link, setlink] = useState({});

  useEffect(() => {
    const link = image.find((value) => value.id === id);
    setlink(link);

    window.addEventListener("keydown", handleModal);
    return () => {
      window.removeEventListener("keydown", handleModal);
    };
  }, [id]);

  const handleModal = (e) => {
    if (e.code === "Escape") {
      onClose();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={s.overlay} onClick={handleBackdropClick}>
      <img className={s.img} src={link.largeImageURL} alt={link.tags} />
    </div>,
    modalRoot
  );
}

Modal.proptTypes = {
  link: PropTypes.object,
};

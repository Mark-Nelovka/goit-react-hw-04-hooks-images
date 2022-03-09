import PropTypes from "prop-types";
import s from "./ImageGalleryItem.module.css";
import ItemsCard from "../ImageGallery/ImageGallery";
export default function FetchItems({ searchName, modal }) {
  const showModal = (e) => {
    const id = Number(e.target.id);
    modal(id);
  };

  return (
    <>
      <ItemsCard>
        {searchName.map(({ id, webformatURL, tags }) => {
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
  );
}

FetchItems.propTypes = {
  name: PropTypes.string,
  page: PropTypes.number,
  status: PropTypes.string,
  showModal: PropTypes.bool,
};

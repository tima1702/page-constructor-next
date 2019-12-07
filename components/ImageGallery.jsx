import React, {useState, useEffect, useCallback} from 'react'

import './styles/ImageGallery.scss'

const images = {
  url: 'https://picsum.photos/id',
  count: 5,
  size: 400
};

export default function ImageGallery({ blocks, setBlocks, isVisible, setGalleryState }) {
  const [imageUrls, setImageUrls] = useState([]);

  const hidden = isVisible ? '' : 'hidden';

  const handleImageClick = useCallback(target => {
    setBlocks([...blocks, {
      id: `image_${++blocks.length}`,
      type: 'image',
      url: target.src
    }]);

    setGalleryState(false)
  }, [blocks]);

  useEffect(() => {
    const arr = [];
    for (let i = 0; i < images.count; i++) {
      arr.push(`${images.url}/${i + 10}/${images.size}`)
    }

    setImageUrls(arr)
  }, []);

  return (
    <div className={`image-gallery ${hidden}`}>
      <div className="image-gallery__wrapper" onClick={() => setGalleryState(false)}>
        <ul className="image-gallery__list">
          <div className="image-gallery__list-wrapper">
            { imageUrls.map((url, index) => (
                <li key={`image_${index}`} className="image-gallery__list-item">
                  <img
                    className="image-gallery__img"
                    src={url}
                    alt={`Image ${index}`}
                    onClick={(e) => handleImageClick(e.target)}
                  />
                </li>
              )
            )}
          </div>
        </ul>
        <div className="image-gallery__control">
          <button
            onClick={() => setGalleryState(false)}
            className="image-gallery__button"
          >
            Отменить
          </button>
        </div>
      </div>
    </div>
  )
}
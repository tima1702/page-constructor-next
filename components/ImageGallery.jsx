import React, {useState, useEffect, useCallback} from 'react'

import './styles/ImageGallery.scss'

const images = {
  url: 'https://picsum.photos/id',
  count: 5,
  size: 250
};

export default function ImageGallery({ blocks, setBlocks, isVisible, setGalleryState }) {
  const [imageUrls, setImageUrls] = useState([]);

  const hiddenSlide = isVisible ? '' : 'hidden-slide';
  const hiddenFade = isVisible ? '' : 'hidden-fade';

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
    <div className="image-gallery">
      <div className={`image-gallery__wrapper ${hiddenFade}`}>
        <div className="animation-wrapper">
          <div className={`animation-content ${hiddenSlide}`}>
            <div className="image-gallery__list">
              <ul className="image-gallery__list-wrapper">
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
              </ul>
            </div>
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
      </div>
    </div>
  )
}
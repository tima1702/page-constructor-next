import React, { useCallback } from 'react'

import {
  FaImage,
  FaTextWidth,
  FaTimes
} from 'react-icons/fa';

import './styles/BottomMenu.scss'

export default function BottomMenu(
  {
    isVisible,
    title,
    blocks,
    setBlocks,
    isGalleryVisible,
    setGalleryState,
    setBottomMenuState
  }) {
  const hidden = isVisible ? '' : 'hidden';

  const items = [
    {
      title: "Изображение",
      type: 'image'
    },
    {
      title: "Текст",
      type: 'text'
    }
  ];

  const handleItemClick = useCallback(type => {
    if (type === 'image') {
      setGalleryState(!isGalleryVisible)
    } else if (type === 'text') {
      setBlocks([...blocks, { type, id: `text_${++blocks.length}` }])
    }

    setBottomMenuState(false)
  }, [blocks, setBlocks, isGalleryVisible]);


  return (
    <div className={`bottom-menu ${hidden}`}>
      <div className="bottom-menu__header">
        <h3 className="bottom-menu__h3">{ title }</h3>
        <div
          className="button button--add button--transparent"
          onClick={() => setBottomMenuState(false)}
        >
          <FaTimes />
        </div>
      </div>

      <div className="bottom-menu__list">
        {
          items.map((item, index) => {
            return (
              <li
                className="bottom-menu__list-item"
                key={item.type}
                onClick={() => handleItemClick(item.type)}
              >
                {item.type === 'image' && <FaImage/>}
                {item.type === 'text' && <FaTextWidth/>}
                {item.title}
              </li>
            )
          })
        }
      </div>
    </div>
  )
}
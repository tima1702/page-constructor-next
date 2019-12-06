import React, { useState, useCallback, useEffect } from "react";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import {
  FaBars,
  FaPlus
} from 'react-icons/fa';

import Popup from './Popup';
import BottomMenu from './BottomMenu';
import Block from './Block'
import ImageGallery from './ImageGallery';

import './styles/Button.scss'
import './styles/ConstructorApp.scss'

export default function ConstructorApp() {
  const [isPopupVisible, setPopupState] = useState(false);
  const [isGalleryVisible, setGalleryState] = useState(false);
  const [isBottomMenuVisible, setBottomMenuState] = useState(false);
  const [blocks, setBlocks] = useState([]);

  const handleMenuClick = useCallback(
    state => {
      setPopupState(!isPopupVisible)
    },
    [setPopupState, isPopupVisible]
  );


  const saveText = useCallback((text, id) => {
    const arr = blocks;

    const index = blocks.findIndex(el => el.id === id);
    arr[index].text = text;

    setBlocks(arr)
  }, [blocks]);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = useCallback(result => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      blocks,
      result.source.index,
      result.destination.index
    );

    setBlocks(items)
  }, [blocks]);

  return (
    <div className="constructor-app">
      <div
        className="button button--add button--transparent"
        onClick={() => setBottomMenuState(true)}
      >
        <FaPlus />
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="constructor-app__area"
            >
              { blocks.map((block, index) => (
                <Block
                  url={block.url}
                  type={block.type}
                  key={index}
                  index={index}
                  id={block.id}
                  defaultText={block.text}
                  saveText={saveText}
                />
              )) }
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Popup isVisible={isPopupVisible} setPopupState={setPopupState} />

      <BottomMenu
        title="Добавить новый блок"
        blocks={blocks}
        setBlocks={setBlocks}
        isGalleryVisible={isGalleryVisible}
        setGalleryState={setGalleryState}
        isVisible={isBottomMenuVisible}
        setBottomMenuState={setBottomMenuState}
      />

      <ImageGallery
        blocks={blocks}
        setBlocks={setBlocks}
        isVisible={isGalleryVisible}
        setGalleryState={setGalleryState}
      />
    </div>
  )
}
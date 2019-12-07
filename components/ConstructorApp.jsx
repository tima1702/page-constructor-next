import React, { useState, useCallback, useEffect } from "react";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { FaPlus } from 'react-icons/fa';

import BottomMenu from './BottomMenu';
import Block from './Block'
import ImageGallery from './ImageGallery';

import './styles/Button.scss'
import './styles/ConstructorApp.scss'

export default function ConstructorApp() {
  const [isGalleryVisible, setGalleryState] = useState(false);
  const [isBottomMenuVisible, setBottomMenuState] = useState(false);
  const [blocks, setBlocks] = useState([]);

  const saveInput = useCallback(input => {
    const arr = blocks;

    const index = blocks.findIndex(el => el.id === input.id);
    arr[index].text = input.value;

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

  const removeBlock = useCallback(id => {
    setBlocks(blocks.filter(block => block.id !== id))
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
                  saveInput={saveInput}
                  removeBlock={removeBlock}
                  blocks={blocks}
                />
              )) }
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

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
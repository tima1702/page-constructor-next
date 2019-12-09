import React, {useState, useCallback, useEffect} from "react"
import { Draggable } from 'react-beautiful-dnd'
import { Resizable} from 're-resizable'

import {
  FaTimes,
  FaCheck
} from 'react-icons/fa';

import "./styles/Block.scss"

export default function Block(
  { url,
    type,
    index,
    id,
    defaultText,
    saveInput,
    removeBlock,
    blocks,
    defaultSize,
    updateDefaultSize
  }) {
  const [inputValue, setInputValue] = useState(defaultText);
  const [imageSize, setImageSize] = useState(defaultSize);
  const [isControlVisible, setControlVisible] = useState(true);
  const [isDragEnabled, setDragEnabled] = useState(false);
  const [isResizeEnabled, setResizeEnabled] = useState({ bottomRight: true });

  const hiddenClass = isControlVisible ? '' : 'hidden';
  const activeClass = isControlVisible ? 'block--active' : '';

  let textInput = React.createRef();

  useEffect(() => {
    if (type === 'text') {
      setInputValue(defaultText);

      if (!defaultText) {
        toggleEditMode(false)
      }
    }
    if (type === 'image' && !defaultSize) {
      toggleEditMode(false)
    }
  }, [defaultText]);

  useEffect(() => {
    toggleEditMode(true)
  }, []);

  useEffect(() => {
    setImageSize(defaultSize || 250)
  }, [id]);

  const toggleEditMode = useCallback(val => {
    setDragEnabled(!val);
    setControlVisible(val);
    if (type === 'text') {
      if (val) {
        textInput.current.focus();
      } else {
        if (textInput.current) {
          textInput.current.blur();
        }
      }
    } else if (type === 'image') {
      setResizeEnabled({bottomRight: val});
    }
  },[isDragEnabled, isResizeEnabled, textInput], );

  const onChangeHandler = useCallback(target => {
    setInputValue(target.value);
  }, [textInput]);

  const onAcceptHandler = useCallback(() => {
    if (type === 'text') {
      if (textInput.current.value === '') return
      saveInput(textInput.current);
    } else if (type === 'image') {
      updateDefaultSize(id, imageSize)
    }

    toggleEditMode(false)
  }, [textInput]);

  const onCancelHandler = useCallback(() => {
    removeBlock(id);
    toggleEditMode(false)
  }, [blocks]);

  const onResizeHandler = useCallback((event, direction, ref, delta) => {
    const size = imageSize + delta.width;
    setImageSize(size)
  }, [blocks, id, imageSize]);

  return (
    <Draggable draggableId={`${type}_${index}`} index={index} isDragDisabled={!isDragEnabled}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="constructor-app__draggable"
        >
          <div className="block">
            {type === 'text' &&
              <div className={`block__text-container ${activeClass}`}>
                <div className={`block__text`}>
                  <input
                    className={"block__input"}
                    id={id}
                    key={id}
                    type="text"
                    value={inputValue || ''}
                    onFocus={() => toggleEditMode(true)}
                    onChange={e => onChangeHandler(e.target)}
                    ref={textInput}
                  />
                </div>
              </div>
            }
            {type === 'image' &&
              <Resizable
                size={{
                  width: imageSize,
                  height: imageSize
                }}
                onResizeStop={onResizeHandler}
                lockAspectRatio={true}
                className={`block__container ${activeClass}`}
                enable={isResizeEnabled}
              >
                <img
                  className={`block__img`}
                  id={id}
                  key={id}
                  src={url}
                  alt="Block image"
                  onClick={() => toggleEditMode(true)}
                />
              </Resizable>
            }
            <div className={`block__control ${hiddenClass}`}>
              <div
                className="button button--control button--transparent"
                onClick={onCancelHandler}
              >
                <FaTimes />
              </div>

              <div
                className="button button--control button--transparent"
                onClick={onAcceptHandler}
              >
                <FaCheck />
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  )
}
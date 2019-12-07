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
  const [text, setText] = useState('');
  const [displayControl, setDisplayControl] = useState('hidden');
  const [isDragDisabled, setDragDisabled] = useState(true);
  const [isResizeEnabled, setResizeEnabled] = useState({ bottomRight: true });
  const [imageSize, setImageSize] = useState(defaultSize);
  let textInput = React.createRef();

  useEffect(() => {
    if (type === 'text') {
      setText(defaultText);

      if (!defaultText) {
        setDisplayControl('')
      }
    }
    if (type === 'image' && !defaultSize) {
      setDisplayControl('')
    }
  }, [defaultText]);

  useEffect(() => {
    if (textInput.current) {
      textInput.current.focus();
    }
  }, []);

  useEffect(() => {
    setImageSize(defaultSize || 400)
  }, [id]);

  const onChangeHandler = useCallback(target => {
    setText(target.value);
  }, [textInput]);

  const onAcceptHandler = useCallback(() => {
    if (type === 'text') {
      textInput.current.blur();
      saveInput(textInput.current);
    }
    if (type === 'image') {
      setResizeEnabled({});
      updateDefaultSize(id, imageSize)
    }
    setDisplayControl('hidden');
    setDragDisabled(false)
  }, [textInput]);

  const onCancelHandler = useCallback(() => {
    removeBlock(id);
    setDragDisabled(false)
  }, [blocks]);

  const onResizeHandler = useCallback((event, direction, ref, delta) => {
    const size = imageSize + delta.width;
    setImageSize(size)
  }, [blocks, id, imageSize]);

  const onImageClickHandler = useCallback(() => {
    setResizeEnabled({ bottomRight: true });
    setDragDisabled(true);
    setDisplayControl('')
  }, [id]);

  return (
    <Draggable draggableId={`${type}_${index}`} index={index} isDragDisabled={isDragDisabled}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="constructor-app__draggable"
        >
          <div className="block">
            {type === 'text' &&
            <div className="block__text">
              <input
                className="block__input"
                id={id}
                key={id}
                type="text"
                value={text || ''}
                onFocus={() => setDisplayControl('')}
                onChange={e => onChangeHandler(e.target)}
                ref={textInput}
              />
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
                enable={isResizeEnabled}
              >
                <img
                  className="block__img"
                  id={id}
                  key={id}
                  src={url}
                  alt="Block image"
                  onClick={onImageClickHandler}
                />
              </Resizable>
            }
            <div className={`block__control ${displayControl}`}>
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
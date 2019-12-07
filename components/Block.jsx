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
    blocks
  }) {
  const [text, setText] = useState('');
  const [hidden, setHidden] = useState('hidden');
  let textInput = React.createRef();

  useEffect(() => {
    if (type === 'text') {
      setText(defaultText);

      if (!defaultText) {
        setHidden('')
      }
    }
  }, [defaultText]);

  useEffect(() => {
    if (textInput.current) {
      textInput.current.focus();
    }
  }, []);

  const onChangeHandler = useCallback(target => {
    setText(target.value);
  }, [textInput]);

  const onAcceptHandler = useCallback(() => {
    textInput.current.blur();
    saveInput(textInput.current);
    setHidden('hidden')
  }, [textInput]);

  const onCancelHandler = useCallback(() => {
    removeBlock(id)
  }, [blocks]);

  return (
    <Draggable draggableId={`${type}_${index}`} index={index}>
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
                onFocus={() => setHidden('')}
                onChange={e => onChangeHandler(e.target)}
                ref={textInput}
              />
              <div className={`block__control ${hidden}`}>
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
            }
            {type === 'image' &&
              <img
                className="block__img"
                id={id}
                key={id}
                src={url}
                alt="Block image"
              />
            }
          </div>
        </div>
      )}
    </Draggable>
  )
}
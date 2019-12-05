import React, {useState, useCallback} from "react"
import { Draggable } from 'react-beautiful-dnd';

import "./styles/Block.scss"

export default function Block({ url, type, index, id, defaultText, saveText }) {
  const [text, setText] = useState('');

  const onBlurHandler = useCallback(target => {
    saveText(target.value, target.id)
  }, [id]);

  const InnerDraggableItem = () => {
    if (type === 'image') {
      return (
        <img
          className="block__img"
          id={id}
          key={id}
          src={url}
          alt="Block image"
        />
      )
    } else if (type === 'text') {
      return (
        <input
          className="block__text"
          id={id}
          key={id}
          type="text"
          defaultValue={defaultText}
          onBlur={(e) => onBlurHandler(e.target)}
        />
      )
    }
  };

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
            <InnerDraggableItem />
          </div>
        </div>
      )}
    </Draggable>
  )
}
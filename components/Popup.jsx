import React from "react"
import { FaTimes } from 'react-icons/fa';

import "./styles/Popup.scss"

export default function Popup({ isVisible, setPopupState }) {
  const hidden = isVisible ? '' : 'hidden';


  return (
    <div className={`popup ${hidden}`}>
      <div
        className="button button--menu button--transparent"
        // onClick={handleMenuClick}
      >
        <FaTimes />
      </div>
      <PopupItem />
    </div>
  )
}

const PopupItem = () => (
  <div>
    item
  </div>
);
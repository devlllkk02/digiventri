// ----- Create Popup -----
import React, { useState, useEffect, useContext } from "react";
import "./CreatePopup.scss";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faSearch,
  faEllipsisV,
  faTimes,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../App";
import { db } from "../../firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";

function CreatePopup({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [opDate, setOpDate] = useState("");
  const [opQuantity, setOpQuantity] = useState("");
  const [opCost, setOpcost] = useState("");

  const ledgersCollectionRef = collection(db, "ledgers");

  const handleCreate = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    addDoc(ledgersCollectionRef, {
      title: title,
      opDate: new Date(opDate),
      opQuantity: Number(opQuantity),
      opCost: Number(opCost),
      opBalance: Number(opQuantity) * Number(opCost),
      clsQuantity: Number(opQuantity),
      clsCost: Number(opCost),
      clsBalance: Number(opQuantity) * Number(opCost),
      createdUser: user.uid,
      createdDate: new Date(),
    })
      .then((newLedger) => {
        console.log(newLedger.id);
        navigate(`/ledger/${newLedger.id}`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="createPopup">
      <div className="createPopup__container">
        <FontAwesomeIcon
          className="icon__close"
          icon={faTimes}
          onClick={() => setIsOpen(!isOpen)}
        />
        <div className="createPopup__topic">
          <p>CREATE INVENTORY LEDGER</p>
        </div>
        <div className="createPopup__title">
          <p className="popup_heading">Title</p>
          <input
            type="text"
            className="title_input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="createPopup__openingBalances">
          <div className="createPopup__openingBalances__heading">
            Opening Balances
          </div>
          <div className="createPopup__openingBalances__title">
            <p>Date</p>
            <p>Quantity</p>
            <p>Unit Cost</p>
          </div>
          <div className="createPopup__openingBalances__input">
            <div className="createPopup__openingBalances__date">
              <input
                type="date"
                value={opDate}
                onChange={(e) => setOpDate(e.target.value)}
              />
            </div>
            <div className="createPopup__openingBalances__quantity">
              <input
                type="text"
                value={opQuantity}
                onChange={(e) => setOpQuantity(e.target.value)}
              />
            </div>
            <div className="createPopup__openingBalances__cost">
              <input
                type="text"
                value={opCost}
                onChange={(e) => setOpcost(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="createPopup__share">
          <p className="createPopup__share__heading">Share Inventory Ledger</p>
          <div className="createPopup__share__searchbar">
            <input type="text" placeholder="Search" className="share_input" />
            <FontAwesomeIcon className="search__icon" icon={faSearch} />
          </div>
        </div>
        <div className="createPopup__box">
          <div className="createPopup__box__container">
            <FontAwesomeIcon className="icon__users" icon={faUsers} />
            <p>Add Participants</p>
          </div>
        </div>
        <div className="createPopup__button">
          <button
            className="popup_create_button"
            onClick={() => handleCreate()}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePopup;

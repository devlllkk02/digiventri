// ----- Dashboard -----
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faSearch,
  faEllipsisV,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

import { auth, db, storage } from "../../firebase";
import { collection, doc, onSnapshot } from "firebase/firestore";
import DropDown from "../Dropdown/Dropdown";
import CreatePopup from "./CreatePopup";
import { DateFormat } from "../../lib/DateFormat";

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [ledgers, setLedgers] = useState([]);
  const [myLedgers, setMyLedgers] = useState([]);
  const ledgersCollectionRef = collection(db, "ledgers");

  useEffect(() => {
    onSnapshot(ledgersCollectionRef, (snapshot) => {
      setLedgers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, []);

  useEffect(() => {
    //Filter My Documents
    const user = JSON.parse(localStorage.getItem("user"));
    let myDocuments = ledgers.filter((ledger) => {
      return ledger.createdUser == user.uid;
    });
    setMyLedgers(myDocuments);
  }, [ledgers]);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {myLedgers.length > 0 && (
        <div className="dashboard">
          <div className="dashboard__properties">
            <div className="dashboard__properties__button">
              <button className="dashboard_button" onClick={togglePopup}>
                Create Inventory Ledger <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            <div className="dashboard__properties__searchbar">
              <input type="text" placeholder="Search" />
              <FontAwesomeIcon className="search__icon" icon={faSearch} />
            </div>
            <div className="dashboard__properties__selectbar">
              <DropDown list={["My Documents", "Shared With Me"]} />
            </div>
          </div>
          <div className="dashboard__home">
            <div className="dashboard__table__title">
              <div className="column_1">Name</div>
              <div className="column_2">Date Created</div>
              <div className="column_3"></div>
            </div>
            <div className="dashboard__table__body">
              {myLedgers.map((ledger, index) => {
                let date = DateFormat(ledger.createdDate.toDate());
                return (
                  <div className="dashboard__table__item" key={index}>
                    <div className="column_1">
                      <Link
                        to={`/ledger/${ledger.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <p>{ledger.title}</p>
                      </Link>
                    </div>
                    <div className="column_2">{`${date.date}${date.suffix} ${date.month.long} ${date.year}`}</div>
                    <div className="column_3">
                      <FontAwesomeIcon
                        icon={faEllipsisV}
                        className="icon__threedots"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {isOpen && (
            <div className="dashboard__createPopup">
              <CreatePopup isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Dashboard;

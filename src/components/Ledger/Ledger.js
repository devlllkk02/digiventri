// ----- Ledger -----
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Ledger.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

import DropDown from "../Dropdown/Dropdown";
import { DateFormat } from "../../lib/DateFormat";

import { db } from "../../firebase";
import {
  addDoc,
  getDoc,
  setDoc,
  collection,
  doc,
  query,
  where,
  orderBy,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

function Ledger() {
  const { ledgerId } = useParams();

  const [type, setType] = useState("Purchased");
  const [date, setDate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [cost, setCost] = useState("");

  const [balQuantity, setBalQuantity] = useState("");
  const [balCost, setBalCost] = useState("");
  const [balBalance, setBalBalance] = useState("");

  const [ledger, setLedger] = useState("");
  const [items, setItems] = useState([]);
  const [closingRef, setClosingRef] = useState("");
  const [closing, setClosing] = useState({
    clsQuantity: "",
    clsCost: "",
    clsBalance: "",
  });

  const ledgerRef = doc(db, "ledgers", ledgerId);
  const itemsCollectionRef = collection(db, "items");
  const queryItems = query(
    itemsCollectionRef,
    where("ledgerId", "==", ledgerId)
  );

  //Getting Ledger and Items
  useEffect(() => {
    getDoc(ledgerRef)
      .then((doc) => {
        setLedger({ ...doc.data(), id: doc.id });
      })
      .catch((error) => console.log(error));

    onSnapshot(queryItems, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setItems(
        data.sort((a, b) => {
          return a.date.toDate() - b.date.toDate();
        })
      );
      // setItems(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, []);

  //Add Item
  useEffect(() => {
    if (balQuantity != "" && balCost != "" && balBalance != "") {
      console.log("value:", "q:", balQuantity, "c:", balCost, "b:", balBalance);
      addItem();
    }
  }, [balQuantity, balCost, balBalance]);

  const handleAddItem = () => {
    if (items.length == 0) {
      if (type === "Purchased") {
        setBalQuantity(ledger.opQuantity + quantity);
        setBalCost(
          (ledger.opCost * ledger.opQuantity + cost * quantity) /
            (ledger.opQuantity + quantity)
        );
        setBalBalance(
          (ledger.opQuantity + quantity) *
            ((ledger.opCost * ledger.opQuantity + cost * quantity) /
              (ledger.opQuantity + quantity))
        );
      }
      if (type === "Issued") {
        setBalQuantity(ledger.opQuantity - quantity);
        setBalCost(
          (ledger.opCost * ledger.opQuantity + cost * quantity) /
            (ledger.opQuantity + quantity)
        );
        setBalBalance(
          (ledger.opQuantity - quantity) *
            ((ledger.opCost * ledger.opQuantity + cost * quantity) /
              (ledger.opQuantity + quantity))
        );
      }
    }
    // Add Items
    else if (items.length > 0) {
      // const prevItem = items.reduce((prev, cur) => {
      //   return prev.date.toDate() < cur.date.toDate() ? prev : cur;
      // });
      console.log(new Date(date));

      const prevItem = items
        .reverse()
        .find((e) => e.date.toDate() <= new Date(date));
      console.log(prevItem);

      // PP
      if (type === "Purchased") {
        setBalQuantity(prevItem.balQuantity + quantity);
        setBalCost(
          (prevItem.balCost * prevItem.balQuantity + cost * quantity) /
            (prevItem.balQuantity + quantity)
        );
        setBalBalance(
          (prevItem.balQuantity + quantity) *
            ((prevItem.balCost * prevItem.balQuantity + cost * quantity) /
              (prevItem.balQuantity + quantity))
        );
      }
      // PI
      if (type === "Issued") {
        setBalQuantity(prevItem.balQuantity - quantity);
        setBalCost(
          (prevItem.balCost * prevItem.balQuantity + cost * quantity) /
            (prevItem.balQuantity + quantity)
        );
        setBalBalance(
          (prevItem.balQuantity - quantity) *
            ((prevItem.balCost * prevItem.balQuantity + cost * quantity) /
              (prevItem.balQuantity + quantity))
        );
      }
    }
  };

  const addItem = () => {
    // console.log(date);
    // console.log(type);
    // console.log(cost);
    // console.log(quantity);

    addDoc(itemsCollectionRef, {
      ledgerId: ledgerId,
      createdBy: ledger.createdUser,
      date: new Date(date),
      type: type,
      quantity: Number(quantity),
      cost: Number(cost),
      balance: Number(quantity) * Number(cost),
      balQuantity: balQuantity,
      balCost: balCost,
      balBalance: balBalance,
    })
      .then((newItem) => {
        // if (items.length == 0) {
        //   setClosingRef(doc(db, "items", items[items.length].id));
        // } else {
        //   setClosingRef(doc(db, "items", items[items.length - 1].id));
        // }
        // setClosing({
        //   clsQuantity: items[items.length - 1].balQuantity,
        //   clsCost: items[items.length - 1].balCost,
        //   clsBalance: items[items.length - 1].balBalance,
        // });
      })
      .catch((error) => console.log(error));
  };

  // useEffect(() => {
  //   if (closing && closingRef != "") {
  //     updateDoc(closingRef, closing);
  //     console.log(closing, closingRef);
  //   }
  // }, [closing, closingRef]);
  return (
    <>
      {ledger && (
        <div className="ledger">
          <div className="ledger__heading">
            <div className="ledger__heading__title">
              <p>Inventory Ledger 01</p>
            </div>
            <div className="ledger__heading__option">
              <DropDown list={["WAC", "FIFO"]} />
            </div>
            <div className="ledger__heading__settings">
              <FontAwesomeIcon className="icon__setting" icon={faCog} />
            </div>
          </div>
          <div className="ledger__properties">
            <div className="ledger__properties__date">
              <p>Date</p>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="ledger__properties__type">
              <p>Type</p>
              <DropDown
                className="ledger__properties__type__dropdown"
                dropdownItem={type}
                setDropdownItem={setType}
                list={["Purchased", "Issued"]}
              />
            </div>
            <div className="ledger__properties__quantity">
              <p>Quantity</p>
              <input
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>
            <div className="ledger__properties__cost">
              <p>Unit Cost</p>
              <input
                type="text"
                value={cost}
                onChange={(e) => setCost(Number(e.target.value))}
              />
            </div>
            <div className="ledger__properties__button">
              <p></p>
              <button onClick={() => handleAddItem()}>Add</button>
            </div>
          </div>
          <div className="ledger__table">
            {/* Table Header */}
            <div className="ledger__table__header">
              {/* Date */}
              <div className="ledger__table__date">
                <p>Date</p>
              </div>
              {/* Purchased */}
              <div className="ledger__table__purchased">
                <div className="ledger__table__purchased__top">
                  <p>Purchased</p>
                </div>
                <div className="ledger__table__purchased__bottom">
                  <div className="ledger__table__purchased__quantity">
                    <p>Quantity</p>
                  </div>
                  <div className="ledger__table__purchased__cost">
                    <p>Cost</p>
                  </div>
                  <div className="ledger__table__purchased__balance">
                    <p>Balance</p>
                  </div>
                </div>
              </div>
              {/* Issued */}
              <div className="ledger__table__issued">
                <div className="ledger__table__issued__top">
                  <p>Issued</p>
                </div>
                <div className="ledger__table__issued__bottom">
                  <div className="ledger__table__issued__quantity">
                    <p>Quantity</p>
                  </div>
                  <div className="ledger__table__issued__cost">
                    <p>Cost</p>
                  </div>
                  <div className="ledger__table__issued__balance">
                    <p>Balance</p>
                  </div>
                </div>
              </div>
              {/* Balanced */}
              <div className="ledger__table__balance">
                <div className="ledger__table__balance__top">
                  <p>Balanced</p>
                </div>
                <div className="ledger__table__balance__bottom">
                  <div className="ledger__table__balance__quantity">
                    <p>Quantity</p>
                  </div>
                  <div className="ledger__table__balance__cost">
                    <p>Cost</p>
                  </div>
                  <div className="ledger__table__balance__balance">
                    <p>Balance</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Table Opening */}
            {ledger &&
              [ledger].map((item, index) => {
                let date = DateFormat(item.opDate.toDate());
                return (
                  <div className="ledger__table__item" key={index}>
                    {/* Date */}
                    <div className="ledger__table__item__date">
                      <p>{`${date.date}/${date.month.numeric}/${date.year}`}</p>
                    </div>
                    {/* Purchased */}
                    <div className="ledger__table__item__purchased">
                      <div className="ledger__table__item__purchased__quantity">
                        <p></p>
                      </div>
                      <div className="ledger__table__item__purchased__cost">
                        <p></p>
                      </div>
                      <div className="ledger__table__item__purchased__balance">
                        <p></p>
                      </div>
                    </div>
                    {/* Issued */}
                    <div className="ledger__table__item__issued">
                      <div className="ledger__table__item__issued__quantity">
                        <p></p>
                      </div>
                      <div className="ledger__table__item__issued__cost">
                        <p></p>
                      </div>
                      <div className="ledger__table__item__issued__balance">
                        <p></p>
                      </div>
                    </div>
                    {/* Balanced */}
                    <div className="ledger__table__item__balance">
                      <div className="ledger__table__item__balance__quantity">
                        <p>{item.opQuantity}</p>
                      </div>
                      <div className="ledger__table__item__balance__cost">
                        <p>{item.opCost}</p>
                      </div>
                      <div className="ledger__table__item__balance__balance">
                        <p>{item.opBalance}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            {/* Table Items */}
            {items.map((item, index) => {
              let date = DateFormat(item.date.toDate());
              return (
                <div className="ledger__table__item" key={index}>
                  {/* Date */}
                  <div className="ledger__table__item__date">
                    <p>{`${date.date}/${date.month.numeric}/${date.year}`}</p>
                  </div>
                  {/* Purchased */}
                  <div className="ledger__table__item__purchased">
                    <div className="ledger__table__item__purchased__quantity">
                      {item.type == "Purchased" ? (
                        <p>{item.quantity}</p>
                      ) : (
                        <p></p>
                      )}
                    </div>
                    <div className="ledger__table__item__purchased__cost">
                      {item.type == "Purchased" ? (
                        <p>{item.cost.toFixed(2)}</p>
                      ) : (
                        <p></p>
                      )}
                    </div>
                    <div className="ledger__table__item__purchased__balance">
                      {item.type == "Purchased" ? (
                        <p>{item.balance}</p>
                      ) : (
                        <p></p>
                      )}
                    </div>
                  </div>
                  {/* Issued */}
                  <div className="ledger__table__item__issued">
                    <div className="ledger__table__item__issued__quantity">
                      {item.type == "Issued" ? <p>{item.quantity}</p> : <p></p>}
                    </div>
                    <div className="ledger__table__item__issued__cost">
                      {item.type == "Issued" ? (
                        <p>{item.cost.toFixed(2)}</p>
                      ) : (
                        <p></p>
                      )}
                    </div>
                    <div className="ledger__table__item__issued__balance">
                      {item.type == "Issued" ? <p>{item.balance}</p> : <p></p>}
                    </div>
                  </div>
                  {/* Balanced */}
                  <div className="ledger__table__item__balance">
                    <div className="ledger__table__item__balance__quantity">
                      <p>{item.balQuantity}</p>
                    </div>
                    <div className="ledger__table__item__balance__cost">
                      <p>{item.balCost.toFixed(2)}</p>
                    </div>
                    <div className="ledger__table__item__balance__balance">
                      <p>{Math.round(item.balBalance)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
            {/* Table Closing */}

            {ledger &&
              [ledger].map((item, index) => {
                return (
                  <div
                    className="ledger__table__closing"
                    key={index}
                    style={{ display: "none" }}
                  >
                    {/* Date */}
                    <div className="ledger__table__closing__date">
                      <p></p>
                    </div>
                    {/* Purchased */}
                    <div className="ledger__table__closing__purchased">
                      <div className="ledger__table__closing__purchased__quantity">
                        <p></p>
                      </div>
                      <div className="ledger__table__closing__purchased__cost">
                        <p></p>
                      </div>
                      <div className="ledger__table__closing__purchased__balance">
                        <p></p>
                      </div>
                    </div>
                    {/* Issued */}
                    <div className="ledger__table__closing__issued">
                      <div className="ledger__table__closing__issued__quantity">
                        <p></p>
                      </div>
                      <div className="ledger__table__closing__issued__cost">
                        <p></p>
                      </div>
                      <div className="ledger__table__closing__issued__balance">
                        <p></p>
                      </div>
                    </div>
                    {/* Balanced */}
                    <div className="ledger__table__closing__balance">
                      <div className="ledger__table__closing__balance__quantity">
                        <p>{item.clsQuantity}</p>
                      </div>
                      <div className="ledger__table__closing__balance__cost">
                        <p>{item.clsCost.toFixed(2)}</p>
                      </div>
                      <div className="ledger__table__closing__balance__balance">
                        <p>{item.clsBalance.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
}

export default Ledger;

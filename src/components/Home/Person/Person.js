// ----- Person -----
import React from "react";
import "./Person.scss";

function Person({ image, name }) {
  return (
    <div className="person">
      <div className="person__image">
        <img src={image} alt="" />
      </div>
      <div className="person__name">
        <p>{name}</p>
      </div>
    </div>
  );
}

export default Person;

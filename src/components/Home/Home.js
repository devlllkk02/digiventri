// ----- Home -----
import React from "react";
import { Link } from "react-router-dom";
import "./Home.scss";
import Person from "./Person/Person";

function Home() {
  return (
    <div className="home">
      {/* First Page */}
      <div class="home__firstPage">
        {/* Logo */}
        <div className="home__firstPage__logo">
          <img src="./images/logos/DIGIVENTRI-Logo-03.png" />
        </div>
        {/* Buttons */}
        <div className="home__firstPage__buttons">
          <table>
            <tbody>
              <tr>
                <td>
                  <div className="home__signup">
                    <Link to="/signup">
                      <button>SIGN UP</button>
                    </Link>
                  </div>
                </td>
                <td>
                  <div className="home__login">
                    <Link to="/login">
                      <button>LOGIN</button>
                    </Link>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* Second Page */}
      <div className="home__secondPage">
        <div className="home__secondPage__title">
          <p>OUR TEAM</p>
        </div>
        <div className="home__secondPage__body">
          <div className="home__secondPage__body__container">
            <div className="home__person">
              <Person
                image="./images/personPictures/Athmaja.jpg"
                name="Athmaja Madapatha"
              />
            </div>
            <div className="home__person">
              <Person
                image="./images/personPictures/Gayan.jpeg"
                name="Gayan Kodithuwakku"
              />
            </div>
            <div className="home__person">
              <Person
                image="./images/personPictures/Milindi.jpg"
                name="Milindi Seneviratne"
              />
            </div>
            <div className="home__person">
              <Person
                image="./images/personPictures/Naveen.png"
                name="Naveen Liyanage"
              />
            </div>
            <div className="home__person">
              <Person
                image="./images/personPictures/Nelmi.jpeg"
                name="Nelmi Kudagodage"
              />
            </div>
            <div className="home__person">
              <Person
                image="./images/personPictures/Oshadie.jpeg"
                name="Oshadie Gayanjala"
              />
            </div>
            <div className="home__person">
              <Person
                image="./images/personPictures/Thinithi.jpg"
                name="Thinithi Palayangoda"
              />
            </div>
            <div className="home__person">
              <Person
                image="./images/personPictures/Vihan.jpg"
                name="Vihan Gammanpila"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="homepage__footer">
        <p>Copyright © 2021 DIGIVENTRI. All Rights Reserved</p>
      </div>
    </div>
  );
}

export default Home;

import React from "react";
import Navbar from "../NavBar/Navbar"
import "./Home.css";


class Home extends React.Component {
  render() {
    return (
      <React.Fragment>

        <div className="Background">
          <Navbar />
          <div className="Title">
            Saving Throw
          </div>
        </div>

      </React.Fragment>
    );
  }
}

export default Home;
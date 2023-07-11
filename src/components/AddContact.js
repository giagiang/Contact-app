import React from "react";

class AddContact extends React.Component {
  render() {
    return (
      <div className="ui main">
        <h2> Add Contact</h2>
        <from className="ui form">
          <div className=" field ">
            <label>Name</label>
            <input type="text" name="name" placeholder="Name" />
          </div>
          <div className=" field ">
            <label>Name</label>
            <input type="text" name="email" placeholder="Email" />
          </div>
          <button className="ui  button blue "> add </button>
        </from>
      </div>
    );
  }
}

export default AddContact;

import React from "react";
import { Link } from "react-router-dom";
import user from "../images/user.jpg";
const ContactDetail = (props) => {
  const{name,email} = props.location.state.contact;
  console.log(props);
  return (
    <div className="main">
      <div className="ui card centered">
        <div className="image">
          <img src={user} alt="user" />
        </div>
        <div className="content">
          <div className="header">{name}</div>
          <div className="description">{email}</div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetail;

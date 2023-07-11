import React from "react";

const ContactList = (props) => {
  console.log(props);
  const renderContactList = props.contact.map((contact) => {
    return (
      <div className="item">
        <div className="content">
          <div className="header">{contact.name}</div>
          <div> {contact.email}</div>
        </div>
        <i className="trash aliternate outline icon "></i>
      </div>
    );
  });
  return <div className="ui called list"> Contact List</div>;
};

export default ContactList;

// rafce

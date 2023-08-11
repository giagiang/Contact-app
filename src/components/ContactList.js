import React from "react";
import ContactCard from "./ContactCard";
const ContactList = (props) => {
  console.log(props);
  const deleteContactHandler = (id) => {
    props.getContactId(id);
  };
  const contacts = [
    {
    id: "1",
    "name":"jacob", 
    "email": "jacob@gmail.com"
    },

  ];
  const renderContactList = props.contacts.map((contact) => {
    return (
      <ContactCard
        contact={contact}
        clickHandler={deleteContactHandler}
        key={contact.id}
      />
    );
  });
  return (
    <div class="main">
      <h2>Contact List</h2>
      <div className="ui called list">{renderContactList} </div>;
    </div>
  );
};
export default ContactList;

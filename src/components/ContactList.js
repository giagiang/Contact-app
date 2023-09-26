import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";
import { useContactsCrud } from "../context/ContactsCrudContext";

const ContactList = (props) => {
  const {
    contacts,
    retrieveContacts,
    searchTerm,
    searchResults,
    searchHandler,
  } = useContactsCrud();
  console.log("searchREsult", searchResults);
  useEffect(() => {
    retrieveContacts();
  }, []);
  const foundedContacts = searchTerm.length < 1 ? contacts : searchResults;
  const renderContactList =
    foundedContacts &&
    foundedContacts.map((contact) => {
      return <ContactCard contact={contact} key={contact.id} />;
    });
  const onUserSearch = (e) => {
    debugger;
    searchHandler(e.target.value);
  };
  debugger;

  return (
    <div className="main">
      <h2>
        Contact List
        <Link to="/add">
          <button className="ui button blue right">Add Contact</button>
        </Link>
      </h2>
      <div className="ui search">
        <div className="ui icon input">
          <input
            // ref={inputEl}
            type="text"
            placeholder="Search Contacts"
            className="prompt"
            value={searchTerm}
            onChange={(e) => onUserSearch(e)}
          />
          <i className="search icon"></i>
        </div>
      </div>
      <div className="ui called list">{renderContactList} </div>
    </div>
  );
};
export default ContactList;

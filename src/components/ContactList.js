import React, {useRef,useEffect} from "react"; 
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";
import { useContactsCrud } from "../context/ContactsCrudContext";


const ContactList = (props) => {
  const{contacts, retrieveContacts} = useContactsCrud();
  const inputEl = useRef("");
  // const deleteContactHandler = (id) => {
  //   props.getContactId(id);
  // };

  useEffect(()=>{
    retrieveContacts();
  },[]);
  const renderContactList = contacts.map((contact) => {
    return (
      <ContactCard
        contact={contact}
        key={contact.id}
      />
    );
  });
  const getSearchTerm = () => {
    props.searchKeyword(inputEl.current.value);
  };
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
            ref = {inputEl}
            type="text"
            placeholder="Search Contacts"
            className="prompt"
            value={props.term}
            onChange={getSearchTerm}
          />
          <i className="search icon"></i>
        </div>
      </div>
      <div className="ui called list">{renderContactList} </div>
    </div>
  );
};
export default ContactList;

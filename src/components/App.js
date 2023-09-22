import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import api from "../api/contacts";
import retrieveContacts from "../api/contacts";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import EditContact from "./EditContact";
import { ContactsCrudContextProvider } from "../context/ContactsCrudContext";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

 
  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResult(newContactList);
    } else {
      setSearchResult(contacts);
    }
  };

  useEffect(() => {
    // console.log("use effect get all contact run!!");
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
    };
    getAllContacts();
  }, []);

  useEffect(() => {}, [contacts]);

  return (
    <div className="ui container">
      {/* <Router> */}
      <Header />
      <ContactsCrudContextProvider>
        <Routes>
          <Route
            path="/"
            exact
            element={<ContactList />}
            // render={(props) => (
            //   <ContactList
            //     {...props}
            //     contacts={searchTerm.length < 1 ? contacts : searchResult}
            //     getContactId={removeContactHandler}
            //     term = {searchTerm}
            //     searchKeyword ={ searchHandler}
            //   />
            // )}
          />
          <Route path="/add" element={<AddContact />} />
          <Route path="/edit" element={<EditContact />} />
          <Route path="/contact/:id" element={<ContactDetail />} />
        </Routes>
      </ContactsCrudContextProvider>
      {/* </Router> */}
    </div>
  );
}

export default App;

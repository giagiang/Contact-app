import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { v4 as uuid } from "uuid";
import api from "../api/contacts";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import EditContact from "./EditContact";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult,setSearchResult] =useState([]);

  //RetrieveContacts
  const retrieveContact = async () => {
    const response = await api.get("/contact");
    return response.data;
  };

  const addContactHandler = async (contact) => {
    console.log("input contact,", contact);
    const data = {
      id: uuid(),
      ...contact,
    };
    const response = await api.post("/contact", data);
    console.log("output response", response);

    setContacts([response.data, ...contacts]);
  };
  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contact/${contact.id}`, contact);
    const { id, name, email } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };
  const removeContactHandler = async (id) => {
    await api.delete(`./contact/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };
  const searchHandler = (searchTerm) =>{
    setSearchTerm(searchTerm);
    if (searchTerm !==""){
        const newContactList = contacts.filter((contact)=>{
           return Object.values(contact)
           .join(" ")
           .toLowerCase()
           .includes(searchTerm.toLowerCase());
        });
        setSearchResult(newContactList)
    }
    else{
      setSearchResult(contacts);
    }
  };

  useEffect(() => {
    console.log("use effect get all contact run!!");
    const getAllContacts = async () => {
      const allContacts = await retrieveContact();
      if (allContacts) setContacts(allContacts);
    };
    getAllContacts();
  }, []);

  useEffect(() => {
  }, [contacts]);

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <ContactList
                {...props}
                contacts={searchTerm.length < 1 ? contacts : searchResult}
                getContactId={removeContactHandler}
                term = {searchTerm}
                searchKeyword ={ searchHandler}
              />
            )}
          />
          <Route
            path="/add"
            render={(props) => (
              <AddContact {...props} addContactHandler={addContactHandler} />
            )}
          />
          <Route
            path="/edit"
            render={(props) => (
              <EditContact
                {...props}
                updateContactHandler={updateContactHandler}
              /> 
            )}
          />
          <Route path="/contact/:id" component={ContactDetail} />
        </Switch>
      </Router>
    </div>  
  );
}

export default App;

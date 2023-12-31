import { createContext, useContext, useState } from "react";
import api from "../api/contacts";
import { v4 as uuid } from "uuid";

const contactsCrudContext = createContext();

export function ContactsCrudContextProvider({ children }) {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  //RetrieveContacts
  const retrieveContacts = async () => {
    const response = await api.get("/contact");
    if (response.data) {
      setContacts(response.data);
    }
  };
  // addContact
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
  // deleteContact
  const removeContactHandler = async (id) => {
    await api.delete(`./contact/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };
  // searchContact
  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        const values = Object.values(contact)
        const longString =  values
        .join(" ")
        .toLowerCase()
        return longString.includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }
  };
  // EditContact
  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contact/${contact.id}`, contact);
    const { id } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };
  const value = {
    contacts,
    searchTerm,
    searchResults,
    searchHandler,
    retrieveContacts,
    removeContactHandler,
    addContactHandler,
    updateContactHandler,
  };
  return (
    <contactsCrudContext.Provider value={value}>
      {children}
    </contactsCrudContext.Provider>
  );
}
export function useContactsCrud() {
  return useContext(contactsCrudContext);
}

import "./App.css";
import React from "react";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";

function App() {
  const contacts  = [
    {
      id :  "1",
      "name " : "ricciardo",
      "email" : "ricciardo@gmail.com"
    },
    {
      id :  "2",
      "name " : "Cristiano Ronaldo ",
      "email" : "siuuuuuuuo@gmail.com"
    },
    {
      id :  "3",
      "name " : "ric g",
      "email" : "ric g@gmail.com"
    }

  ]
  return (
    <div className="ui container">
      <Header />
      <AddContact />
      <ContactList  Contacts = {contacts}/>
    </div>
  );
}

export default App;

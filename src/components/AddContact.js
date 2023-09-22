import React, {useState} from "react";
import { useContactsCrud } from "../context/ContactsCrudContext";
import { useNavigate } from "react-router-dom";

const AddContact = () => {
    const [name,setName] =useState ("");
    const [email,setEmail] = useState("");
    const {addContactHandler}  =useContactsCrud();
    const navigate = useNavigate();

 const add = (e) => {
    e.preventDefault();
    if (name === "" || email === "") {
      alert("All the fields are mandatory! ");
      return;
    }
    addContactHandler({name,email});
    setName("");
    setEmail("");
    navigate("/");
  };
    return (
      <div className="ui main">
        <h2> Add Contact</h2>
        <form className="ui form" onSubmit={add}>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              value={name}
              name="name"
              placeholder="Name"
              onChange={(e) => setName( e.target.value )}
            />
          </div>
          <div className=" field ">
            <label>Email</label>
            <input
              type="text"
              value ={email}
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail( e.target.value )}
            />
          </div>
          <button className="ui button blue">Add đi </button>
        </form>
      </div>
    );
}

export default AddContact;

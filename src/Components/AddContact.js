import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContact, useContactDispatcher } from "../Provider/ContactProvider";

const AddContact = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
  });
  const dispatch = useContactDispatcher();

  const changeHandler = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const addContactHandler = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/posts", { id: Date.now, ...formValues });
    dispatch({ type: "ADD", name: formValues.name, email: formValues.email });
    setFormValues({
      name: "",
      email: "",
    });
  };

  return (
    <div className="add-contact">
      <form onSubmit={addContactHandler}>
        <label htmlFor="name">Name :</label>
        <input
          type="text"
          id="name"
          value={formValues.name}
          name="name"
          onChange={changeHandler}
        />
        <label>Email : </label>
        <input
          type="email"
          id="email"
          value={formValues.email}
          name="email"
          onChange={changeHandler}
        />
        <button className="btn btn-primary" type="submit">
          Add
        </button>
      </form>
      <Link to="/">Back To Home</Link>
    </div>
  );
};

export default AddContact;

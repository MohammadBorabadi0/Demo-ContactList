import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContact, useContactDispatcher } from "../Provider/ContactProvider";

const EditContact = ({ match }) => {
  const dispatch = useContactDispatcher();
  const { contactList } = useContact();
  const ContactId = Number(match.params.id);
  const findItem = contactList.find((i) => i.id === ContactId);

  const history = useHistory();

  const [editValue, setEditValue] = useState({
    name: findItem.name,
    email: findItem.email,
  });

  const changeHandler = (e) => {
    setEditValue({ ...editValue, [e.target.name]: e.target.value });
  };

  const saveHandler = (e, id) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/posts/${id}`, {
      // ...editValue,
      // id: id,
      name: editValue.name,
      email: editValue.email,
    });
    dispatch({
      type: "EDIT",
      id: id,
      name: editValue.name,
      email: editValue.email,
    });
    history.push("/");
  };

  return (
    <div className="add-contact">
      <form onSubmit={(e) => saveHandler(e, findItem.id)}>
        <input
          type="text"
          name="name"
          value={editValue.name}
          onChange={changeHandler}
        />
        <input
          type="email"
          name="email"
          value={editValue.email}
          onChange={changeHandler}
        />
        <button className="btn btn-primary" type="submit">
          Save
        </button>
        <Link to="/add">Back To Add Contact</Link>
      </form>
    </div>
  );
};

export default EditContact;

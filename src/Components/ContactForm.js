import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContact, useContactDispatcher } from "../Provider/ContactProvider";

const ContactForm = () => {
  const { contacts, contactList } = useContact();
  const dispatch = useContactDispatcher();

  const deleteHandler = (id) => {
    axios.delete(`http://localhost:3001/posts/${id}`);
    dispatch({ type: "REMOVE", id: id });
  };

  return (
    <div className="contact-form">
      <Link to="/add">
        <button className="btn btn-primary">Add Contact</button>
      </Link>
      <div>
        {contactList.map((item) => (
          <div key={item.id} className="contact-item">
            <h4>{item.name}</h4>
            <p>{item.email}</p>
            <div className="buttons">
              <Link to={`/edit/${item.id}`}>
                <button className="btn btn-edit">Edit</button>
              </Link>
              <button
                className="btn btn-danger"
                onClick={() => deleteHandler(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactForm;

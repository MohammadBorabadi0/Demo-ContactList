import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

// InitialState
const initialState = {
  contacts: [],
  counter: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      const count = state.counter + 1;
      return {
        ...state,
        contacts: [
          ...state.contacts,
          { name: action.name, email: action.email, id: state.counter },
        ],
        counter: count,
      };
    }
    case "REMOVE": {
      const filteredContact = state.contacts.filter((i) => i.id !== action.id);
      return {
        ...state,
        contacts: filteredContact,
        counter: state.counter,
      };
    }
    case "EDIT": {
      const updatedContacts = [...state.contacts];
      const index = updatedContacts.findIndex((i) => i.id === action.id);
      const updatedItem = updatedContacts[index];
      updatedItem.name = action.name;
      updatedItem.email = action.email;

      return {
        ...state,
        contacts: updatedContacts,
        counter: state.counter,
      };
    }
    default: {
      return state;
    }
  }
};

// Create Context
const ContactContext = createContext();
const ContactContextDispatcher = createContext();

const ContactProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [contactList, setContactList] = useState(state.contacts);

  // UseEffect
  useEffect(() => {
    const loadData = () =>
      axios
        .get("http://localhost:3001/posts")
        .then((res) => setContactList(res.data));
    loadData();
  }, [contactList]);

  return (
    <ContactContext.Provider value={{ state, contactList }}>
      <ContactContextDispatcher.Provider value={dispatch}>
        {children}
      </ContactContextDispatcher.Provider>
    </ContactContext.Provider>
  );
};

export default ContactProvider;

// Custom Hooks
export const useContact = () => useContext(ContactContext);
export const useContactDispatcher = () => useContext(ContactContextDispatcher);

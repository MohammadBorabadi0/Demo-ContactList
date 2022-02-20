import React from "react";
import { Route, Switch } from "react-router-dom";
import AddContact from "./Components/AddContact";
import ContactForm from "./Components/ContactForm";
import EditContact from "./Components/EditContact";
import ContactProvider from "./Provider/ContactProvider";

function App() {
  return (
    <div className="container">
      <ContactProvider>
        <Switch>
          <Route path="/edit/:id" component={EditContact} />
          <Route path="/add" component={AddContact} />
          <Route path="/" exact component={ContactForm} />
        </Switch>
      </ContactProvider>
    </div>
  );
}

export default App;

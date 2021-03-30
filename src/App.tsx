import React, { ReactElement, useReducer } from 'react';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import Layout from './componentes/Layout/Layout';
import Routing from './componentes/Routing/Routing';
import { initialStore, reducer } from "./usereducer/store";

/*
  Formulare:
  
*/

function App(): ReactElement {
  const [store, dispatch] = useReducer(reducer, initialStore);
  return (
    <Router>
      <Layout cart={store.cart}>
        <Routing cart={store.cart} dispatch={dispatch} />
      </Layout>
    </Router>
  );
}

export default App;

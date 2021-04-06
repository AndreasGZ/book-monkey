import React, { ReactElement } from 'react';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import Layout from './componentes/Layout/Layout';
import Routing from './componentes/Routing/Routing';
import StoreContextProvider from './componentes/StoreContextProvider/StoreContextProvider';

function App(): ReactElement {

  return (
    <Router>
      <StoreContextProvider>
        <Layout>
          <Routing />
        </Layout>
      </StoreContextProvider>
    </Router >
  );
}

export default App;

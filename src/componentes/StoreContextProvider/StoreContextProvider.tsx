import React, { createContext, ReactElement, useContext, useReducer } from "react";
import { Actions, initialStore, reducer, Store } from "../../usereducer/store";


interface StoreProps {
  store: Store;
  dispatch: React.Dispatch<Actions>;
}

interface Props {
  children: ReactElement;
}

const StoreContext = createContext({} as StoreProps);
StoreContext.displayName = "Store";

export const useStore = (): StoreProps => useContext(StoreContext);

export default function StoreContextProvider(props: Props): ReactElement {
  const [store, dispatch] = useReducer(reducer, initialStore);
  const value = { store, dispatch };
  return (
    <>
      <StoreContext.Provider value={value}>
        {props.children}
      </StoreContext.Provider>
    </>
  )
}
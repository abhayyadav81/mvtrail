

import React, {createContext, useReducer, useContext} from 'react';

const initialState = {
  Tab: 'Upcoming',
 
};



// Create context
const GlobalStateContext = createContext();

// Define reducer function
const reducer = (state, action) => {
  switch (action.Tab) {
    case 'Upcoming':
      return {
        ...state,
        Tab: 'Upcoming',
      
      };
    case 'Running':
      return {
        ...state,
        Tab: 'Running',
       
      };
    case 'Ride over':
      return {
        ...state,
        Tab: 'Ride over',
    
      };
    case 'Cancelled':
      return {
        ...state,
        Tab: 'Cancelled',
     
      };
    default:
      return state;
  }
};

// Create GlobalStateProvider component
export const GlobalStateProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log('statatatt',state);

  return (
    <GlobalStateContext.Provider
      value={{state, dispatch}}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Custom hook to use global state
export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};

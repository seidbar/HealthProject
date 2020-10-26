import React, {useState} from 'react';

const sampleData = [
  {name: 'Active Energy', goal: 450, value: 0, weight: 1},
  {name: 'Mindful Minutes', goal: 10, value: 0, weight: 1},
  {name: 'Step Count', goal: 8000, value: 0, weight: 1},
];

export const Context = React.createContext();

const Store = ({children}) => {
  const [state, setState] = useState(sampleData);

  return (
    <Context.Provider value={[state, setState]}>{children}</Context.Provider>
  );
};

export default Store;

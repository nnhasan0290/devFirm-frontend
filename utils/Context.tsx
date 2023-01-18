import React, { useState } from "react";

const AppContext = React.createContext<any>(null);

const ContextProvider = ({ children }: any) => {
  const [formData, setFormData] = useState({
    products: [{ productType: "", description: "", product: "", total: "" }],
    client: "",
    trip: "",
    date: "",
    image: {}
  });
  return (
    <AppContext.Provider value={{ formData, setFormData }}>
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;

export const GlobalStates = () => React.useContext(AppContext);

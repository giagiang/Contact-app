import { createContext, useContext } from "react";

const contactsCrudContext = createContext();

export function ContactsCrudContextProvider(children) {
  const [contact, setContacts] = useState([]);
  const value = {
    contact,
  };
  return (
    <contactsCrudContext.Provider value={value}>
      {children}
    </contactsCrudContext.Provider>
  );
}
export function useContactsCrud() {
  return useContext(contactsCrudContext);
}
  
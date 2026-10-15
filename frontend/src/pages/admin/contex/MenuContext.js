import React, { createContext, useState } from "react";

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
const [search, setSearch] = useState("");
  const openCreate = () => setIsCreateOpen(true);
  const closeCreate = () => setIsCreateOpen(false);

  return (
    <MenuContext.Provider
      value={{ isCreateOpen, openCreate, closeCreate, search,setSearch }}
    >
      {children}
    </MenuContext.Provider>
  );
};
import React, { createContext, useState } from "react";

export const LoadingContext = createContext();
const LoaderContext = ({ children }) => {
  const [loading, setLoading] = useState(false);
  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export default LoaderContext;

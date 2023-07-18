import React, { createContext, useState } from "react";

const AuthContext = createContext<any>({});

export const AuthProvider = ({ children }: any) => {
  const [visibleContext, setVisibleContext] = useState(false);

  return (
    <AuthContext.Provider value={{ setVisibleContext, visibleContext }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

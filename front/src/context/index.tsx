import React, { createContext, useState } from "react";

const AuthContext:React.Context<any> = createContext<any>({});

export const AuthProvider = ({ children }: any) => {
  const [visibleContext, setVisibleContext] = useState<boolean>(false);

  return (
    <AuthContext.Provider value={{ setVisibleContext, visibleContext }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

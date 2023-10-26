import React, { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react';

type AuthState = {
  userToken: string | null;
};

type AuthAction = { type: 'LOGIN'; userToken: string } | { type: 'LOGOUT' };

type AuthContextType = {
  userLogin: AuthState;
  dispatch: Dispatch<AuthAction>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function authReducer(userLogin: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN':
      return { ...userLogin, userToken: action.userToken };
    case 'LOGOUT':
      return { ...userLogin, userToken: null };
    default:
      return userLogin;
  }
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userLogin, dispatch] = useReducer(authReducer, { userToken: null });

  return <AuthContext.Provider value={{ userLogin, dispatch }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;

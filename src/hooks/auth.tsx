import React, { createContext, ReactNode, useContext } from "react";
import * as AuthSession from "expo-auth-session";

// react node - typagem para elemento filho

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContextData {
  user: User;
  signInWithGoogle(): Promise<void>;
}

async function signInWithGoogle() {
  try {
    const CLIENT_ID =
      "1002460393313-nchc299cf0sqi00sukcbiqmo0co6i758.apps.googleusercontent.com";
    const REDIRECT_URI = "https://auth.expo.io/@maurianimaciel/gofinances";
    const RESPONSE_TYPE = "token";
    const SCOPE = encodeURI("profile email"); // para que o espaço seja formatado na uri

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

    console.log(authUrl);

    const response = await AuthSession.startAsync({ authUrl });

    console.log("response", response);
  } catch (err) {
    throw new Error(err as string);
  }
}

// criando o contento
export const AuthContext = createContext({} as IAuthContextData);

// o hook

function AuthProvider({ children }: AuthProviderProps) {
  const user = {
    id: "123",
    name: "Mauriani",
    email: "maurianim@gmail.com",
  };
  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}

// contexto que criei
function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };

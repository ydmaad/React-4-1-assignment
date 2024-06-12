import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

import SharedRouter from "./shared/Router";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <SharedRouter />
      </AuthProvider>
    </>
  );
}

export default App;

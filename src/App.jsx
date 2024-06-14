import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

import SharedRouter from "./shared/Router";
import { AuthProvider } from "./context/AuthContext";
import QueryClientSetup from "./QueryClientSetup";

function App() {
  return (
    <>
      <QueryClientSetup>
        <AuthProvider>
          <SharedRouter />
        </AuthProvider>
      </QueryClientSetup>
    </>
  );
}

export default App;

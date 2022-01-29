import React from "react";

import "./App.css";
import { ApiProvider } from "../contexts/ApiContext";
import { Header } from "./Header";
import ImageFeed from "./ImageFeed";

function App() {
  return (
    <div fluid className="App">
      <ApiProvider>
        <Header />
        <ImageFeed />
      </ApiProvider>
    </div>
  );
}

export default App;
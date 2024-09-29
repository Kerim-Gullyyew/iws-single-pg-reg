import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TagManager from "react-gtm-module";
import DashLayout from "./components/layout/DashLayout";
import NewPage from "./pages/NewPage";
import Success from "./pages/Success";

const tagManagerArgs = {
  gtmId: "GTM-KQK64CKD",
};

TagManager.initialize(tagManagerArgs);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashLayout />}>
          <Route index element={<NewPage />} />
          <Route path="/success" element={<Success />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

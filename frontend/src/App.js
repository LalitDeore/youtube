import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Feed from "./components/Feed";
import SearchResult from "./components/SearchResult";
import VideoDetails from "./components/VideoDetails";
import { AppContext } from "./context/contextApi";
import Login from "./components/login";
import Signup from "./components/signup";

const App = () => {
  return (
    <AppContext>
      <BrowserRouter>
        <div className="flex flex-col h-full">
          <Routes>
            <Route
              path="/"
              exact
              element={
                <>
                  <Header />
                  <Feed />
                </>
              }
            />
            <Route
              path="/searchResult/:searchQuery"
              element={
                <>
                  <Header />
                  <SearchResult />
                </>
              }
            />
            <Route
              path="/video/:id"
              element={
                <>
                  <Header />
                  <VideoDetails />
                </>
              }
            />
            <Route path="/signUp" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppContext>
  );
};
export default App;

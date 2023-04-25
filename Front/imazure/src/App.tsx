import React from "react";
import "./App.css";
import Layout from "./components/Layout";
import routes from "./routes";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import PageNotFound from "./Pages/PageNotFound";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {routes.map((route: any, index: number) => (
            <Route
              path={route.path}
              key={"route-key-" + index}
              element={<route.component />}
            />
          ))}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

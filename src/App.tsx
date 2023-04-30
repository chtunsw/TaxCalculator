import React from "react";
import ThemeProvider from "./theme/ThemeProvider";
import Layout from "./layout/Layout";
import Homepage from "./pages/home/HomePage";

const App = () => {
  return (
    <ThemeProvider>
      <Layout>
        <Homepage />
      </Layout>
    </ThemeProvider>
  );
};

export default App;

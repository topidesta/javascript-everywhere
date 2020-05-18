import React from "react";
import Pages from "./pages";

// global styled
import GlobalStyles from "./components/GlobalStyle";

const App = () => {
  return (
    <div>
      <GlobalStyles />
      <Pages />
    </div>
  );
};

export default App;

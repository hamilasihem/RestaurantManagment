import React from "react";
import { renderRoutes, routes } from "./routes/Routes";

const App = () => {
  return <>{renderRoutes(routes)}</>;
};

export default App;

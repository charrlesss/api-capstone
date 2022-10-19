import React from "react";
import "./assets/google-style.css";
import { InitialBackroundComponent } from "./features/shared/presentation/components/initial-backround-component";

const App: React.FC = (): JSX.Element => {
  return (
    <React.Fragment>
      <InitialBackroundComponent />
    </React.Fragment>
  );
};

export default App;

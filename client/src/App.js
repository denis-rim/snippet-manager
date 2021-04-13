import Router from "./Router";
import "./style/index.scss";
import axios from "axios";

axios.defaults.withCredentials = true;

const App = () => {
  return (
    <div className="container">
      <Router />
    </div>
  );
};

export default App;

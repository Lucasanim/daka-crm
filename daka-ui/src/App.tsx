import { HashRouter } from "react-router-dom";
import "./App.css";
import { ConfigProvider } from "antd";
import RootRouter from "./infrastructure/router/RootRouter";

function App() {
  return (
    <HashRouter>
      <ConfigProvider>
        <RootRouter />
      </ConfigProvider>
    </HashRouter>
  );
}

export default App;

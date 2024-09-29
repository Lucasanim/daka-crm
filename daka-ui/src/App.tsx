import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { ConfigProvider } from "antd";
import RootRouter from "./infrastructure/router/RootRouter";

function App() {
  return (
    <BrowserRouter>
      <ConfigProvider>
        <RootRouter />
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;

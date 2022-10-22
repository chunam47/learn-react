import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import ProductFeature from "./features/Product";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="*" element={<ProductFeature />}></Route>
      </Routes>
      {/* <ProductFeature /> */}
    </div>
  );
}

export default App;

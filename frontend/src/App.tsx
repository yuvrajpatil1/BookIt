import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DetailsPage from "./pages/DetailsPage";
import CheckoutPage from "./pages/CheckoutPage";
import ResultPage from "./pages/ResultPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#F9F9F9]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/experience/:id" element={<DetailsPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

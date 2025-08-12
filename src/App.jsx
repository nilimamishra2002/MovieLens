import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chart1 from "./pages/Chart1";
import Chart2 from "./pages/Chart2";
import Chart3 from "./pages/Chart3";
import Chart4 from "./pages/Chart4";
import Chart5 from "./pages/Chart5";
import Chart6 from "./pages/Chart6";
import PDFViewer from "./components/PDFViewer";
import RawVsProcessed from "./pages/RawVsProcessed"; // <-- Make sure the path matches your file structure


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chart1" element={<Chart1 />} />
        <Route path="/chart2" element={<Chart2 />} />
        <Route path="/chart3" element={<Chart3 />} />
        <Route path="/chart4" element={<Chart4 />} />
        <Route path="/chart5" element={<Chart5 />} />
        <Route path="/chart6" element={<Chart6 />} />
        <Route path="/raw-dataset" element={<RawVsProcessed />} />
      </Routes>
    </Router>
  );
}

export default App;

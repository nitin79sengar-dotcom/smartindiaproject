
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import DestinationDetails from "./pages/DestinationDetails";
import AIPlanner from "./pages/AIPlanner";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Explore / Home */}
        <Route path="/" element={<Home />} />

        {/* Tourism Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Destination Details */}
        <Route
          path="/destination/:id"
          element={<DestinationDetails />}
        />

        {/* AI Travel Planner */}
        <Route
          path="/ai-planner"
          element={<AIPlanner />}
        />

        {/* Fallback */}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;




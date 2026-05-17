import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IntelliDocsLanding from "./pages/IntelliDocsLanding";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import NotFound from "./pages/NotFound";
import HowToUse from "./pages/HowToUse";

function App() {
  return (
    <Router>
      <div className="relative">
        <Routes>
          <Route path="/" element={<IntelliDocsLanding />} />
          <Route path="/how-to-use" element={<HowToUse />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

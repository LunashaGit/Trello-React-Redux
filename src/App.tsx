// Import Packages
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      {/* Configure the Routes by App */}
      <Route path="*" element={<App />} />
    </Routes>
  );
}

export default App;

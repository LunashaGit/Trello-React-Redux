// Import Packages
import { Routes, Route } from "react-router-dom";

// Import Components
import HomePage from "./assets/Pages/HomePage";
import Register from "./assets/Pages/Register";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./assets/Slices/authSlice";
function App() {
  const store = configureStore({
    reducer: {
      auth: authReducer,
    },
  });

  return (
    <Provider store={store}>
      <Routes>
        {/* Configure the Routes by App */}
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Provider>
  );
}

export default App;

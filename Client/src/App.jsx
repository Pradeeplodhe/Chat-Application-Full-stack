// import { Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/Login.jsx";
// import Signup from "./pages/Signup.jsx";
// import Chat from "./pages/Chat.jsx";
// import Profile from "./pages/Profile.jsx";
// import { useContext } from "react";
// import { AuthContext } from "./context/AuthContext.jsx";

// function App() {
//   const { user } = useContext(AuthContext);

//   return (
//     <Routes>
//       <Route path="/" element={user ? <Navigate to="/chat" /> : <Login />} />
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/chat" element={user ? <Chat /> : <Navigate to="/" />} />
//       <Route path="/profile" element={user ? <Profile /> : <Navigate to="/" />} />
//     </Routes>
//   );
// }

// export default App;




import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Chat from "./pages/Chat.jsx";
import Profile from "./pages/Profile.jsx";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext.jsx";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/chat" /> : <Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/chat" element={user ? <Chat /> : <Navigate to="/" />} />
      <Route path="/profile" element={user ? <Profile /> : <Navigate to="/" />} />
    </Routes>
  );
}

export default App;

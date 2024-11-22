import { useRef, Suspense, lazy } from "react";
import "./styles/App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Error from "./pages/Error";
import SideNav from "./components/SideNav";
import TopNav from "./components/TopNav";
import Footer from "./components/Footer";
import Loading from "./components/Loading";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const AddTransaction = lazy(() => import("./pages/AddTransaction"));
const ViewTransactions = lazy(() => import("./pages/ViewTransactions"));
const Charts = lazy(() => import("./pages/Charts"));
const Profile = lazy(() => import("./pages/Profile"));

function App() {
  const sidebar = useRef(null);
  const handleSidebar = () => {
    if (sidebar.current) {
      sidebar.current.classList.toggle("hide");
    }
  };

  const location = useLocation();

  const guest =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <>
      {guest ? (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Error />} />
        </Routes>
      ) : (
        <div className="wrapper">
          <SideNav sidebarRef={sidebar} />
          <div className="main">
            <TopNav handleSidebar={handleSidebar} />
            <main className="content">
              <Suspense fallback={<Loading />}>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/addTransaction" element={<AddTransaction />} />
                  <Route
                    path="/viewTransaction"
                    element={<ViewTransactions />}
                  />
                  <Route path="/charts" element={<Charts />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="*" element={<Error />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </div>
      )}
    </>
  );
}

export default App;

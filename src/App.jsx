import { useRef, Suspense, lazy } from "react";
import "./assets/styles/App.css";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegistrationMsg from "./pages/RegistrationMsg";
import Error from "./pages/Error";
import SideNav from "./components/SideNav";
import TopNav from "./components/TopNav";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import { useSelector } from "react-redux";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import AccountActivation from "./pages/AccountActivation";
import { Slide, ToastContainer } from "react-toastify";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const AddTransaction = lazy(() => import("./pages/AddTransaction"));
const ViewTransactions = lazy(() => import("./pages/ViewTransactions"));
const Charts = lazy(() => import("./pages/Charts"));
const Profile = lazy(() => import("./pages/Profile"));
const Categories = lazy(() => import("./pages/Categories"));

function App() {
  const userState = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const sidebar = useRef(null);
  const handleSidebar = () => {
    if (sidebar.current) {
      sidebar.current.classList.toggle("hide");
    }
  };
  const handleMobileSidebar = () => {
    if (window.innerWidth <= 768 && sidebar.current) {
      sidebar.current.classList.add("hide");
    }
  };
  window.addEventListener("resize", () => {
    if (window.innerWidth <= 768 && sidebar.current) {
      sidebar.current.classList.add("hide");
    } else {
      sidebar.current.classList.remove("hide");
    }
  });
  const location = useLocation();

  const guest =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/registrationMsg" ||
    location.pathname.startsWith("/accountActivation") ||
    location.pathname === "/forgetPassword" ||
    location.pathname.startsWith("/resetPassword");

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Slide}
      />
      {guest ? (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/registrationMsg" element={<RegistrationMsg />} />
          <Route
            path="/accountActivation/:receivedEmail/:otp/:receivedToken"
            element={<AccountActivation />}
          />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route
            path="/resetPassword/:receivedEmail/:receivedToken"
            element={<ResetPassword />}
          />
          <Route path="*" element={<Error />} />
        </Routes>
      ) : (
        <>
          {userState.user.email ? (
            <div className="wrapper">
              <SideNav
                sidebarRef={sidebar}
                handleMobileSidebar={handleMobileSidebar}
              />
              <div className="main">
                <TopNav handleSidebar={handleSidebar} />
                <main className="content">
                  <Suspense fallback={<Loading />}>
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route
                        path="/addTransaction"
                        element={<AddTransaction />}
                      />
                      <Route
                        path="/viewTransactions"
                        element={<ViewTransactions />}
                      />
                      <Route path="/categories" element={<Categories />} />
                      <Route path="/charts" element={<Charts />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="*" element={<Error />} />
                    </Routes>
                  </Suspense>
                </main>
                <Footer />
              </div>
            </div>
          ) : (
            navigate("/login")
          )}
        </>
      )}
    </>
  );
}

export default App;

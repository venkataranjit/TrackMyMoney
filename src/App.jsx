import { useRef } from "react";
import Dashboard from "./components/Dashboard";
import SideNav from "./components/SideNav";
import "./styles/App.css";
import TopNav from "./components/TopNav";
import Footer from "./components/Footer";
import { HashRouter, Routes, Route } from "react-router-dom";

function App() {
  const sidebar = useRef(null);
  const handleSidebar = () => {
    if (sidebar.current) {
      sidebar.current.classList.toggle("hide");
    }
  };
  return (
    <>
      <HashRouter>
        <div className="wrapper">
          <SideNav sidebarRef={sidebar} />
          <div className="main">
            <TopNav handleSidebar={handleSidebar} />
            <main className="content">
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </div>
      </HashRouter>
    </>
  );
}

export default App;

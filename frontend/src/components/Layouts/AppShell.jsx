import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import AppRoutes from "../../routes";
import "./AppShell.css";

const AppShell = () => {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-shell__main">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
};

export default AppShell;

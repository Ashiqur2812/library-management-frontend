import { Outlet } from "react-router";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

function App() {

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;

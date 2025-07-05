import { Outlet } from "react-router";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

function App() {

  return (
    <div className="w-11/12 mx-auto lg:w-11/12 md:w-11/12 xl:container">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;

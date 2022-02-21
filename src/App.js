import "./App.css";
import Home from "./components/Home";
import MyWorkSection from "./components/MyWorkSection";
import Navbar from "./components/Navbar";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { useEffect } from "react";

function App() {
  const handleState = () => {
    window.splitbee.track("Button Click");
  };

  useEffect(() => {
    window.addEventListener("load", handleState);
    return () => {
      window.removeEventListener("load", handleState);
    };
  });

  return (
    <div className="App">
      <Navbar />
      <Home />
      <MyWorkSection />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;

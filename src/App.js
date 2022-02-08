import "./App.css";
import Home from "./components/Home";
import MyWorkSection from "./components/MyWorkSection";
import Navbar from "./components/Navbar";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
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

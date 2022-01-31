import "./App.css";
import Home from "./components/Home";
import MyWorkSection from "./components/MyWorkSection";
import Navbar from "./components/Navbar";
import Contact from "./components/Contact";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Home />
      <MyWorkSection />
      <Contact />
    </div>
  );
}

export default App;

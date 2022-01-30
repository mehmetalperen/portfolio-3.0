import "./App.css";
import Home from "./components/Home";
import MyWorkSection from "./components/MyWorkSection";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Home />
      <MyWorkSection />
    </div>
  );
}

export default App;

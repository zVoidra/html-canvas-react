import Clock from "./components/Clock/Clock";
import Sol from "./components/Sol/Sol";
import Panorama from "./components/Panorama/Panorama";
import "./App.css";

function App() {
  return (
    <div className="AppContainer">
      <h1>Hello!</h1>
      <Sol />
      <Clock />
      <Panorama />
    </div>
  );
}

export default App;

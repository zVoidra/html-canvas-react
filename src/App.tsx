import Clock from "./components/Clock/Clock";
import Sol from "./components/Sol/Sol";
import Panorama from "./components/Panorama/Panorama";
import "./App.css";
import Line from "./components/Lines/Lines";

function App() {
  return (
    <div className="AppContainer">
      <h1>Hello!</h1>
      <Sol />
      <Clock />
      <Panorama />
      <h1>Lines</h1>
      <Line />
    </div>
  );
}

export default App;

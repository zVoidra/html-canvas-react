import Clock from "./components/Clock/Clock";
import Sol from "./components/Sol/Sol";
import "./App.css";

function App() {
  return (
    <div className="AppContainer">
      <h1>Hello!</h1>
      <Sol />
      <Clock />
    </div>
  );
}

export default App;

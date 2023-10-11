import ClockList from "./components/clockList/ClockList";
import LocalClock from "./components/localClock/LocalClock";

const App = () => {
  return (
    <div>
      <LocalClock />
      <ClockList />
    </div>
  );
};

export default App;

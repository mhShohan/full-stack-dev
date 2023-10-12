import ClockList from "./components/clockList/ClockList";
import LocalClock from "./components/localClock/LocalClock";
import useClock from "./hooks/useClock";

const App = () => {
  useClock(new Date());
  return (
    <div>
      <LocalClock />
      <ClockList />
    </div>
  );
};

export default App;

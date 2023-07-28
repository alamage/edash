import { createSignal, type Component } from "solid-js";
import { Today } from "./components/Today";
import { Time } from "./components/Time";
import { PowerManagement } from "./components/PowerManagement";
import { Volume } from "./components/Volume";

const App: Component = () => {
  return (
    <div class="w-screen h-screen flex flex-row gap-5 items-center justify-center select-none bg-black text-white">
      <div class="h-full p-5 flex flex-col items-center justify-between">
        <Today />
        <Time />
        <div class="w-full text-2xl flex flex-row items-center justify-between">
          <Volume />
          <PowerManagement />
        </div>
      </div>
    </div>
  );
};

export default App;

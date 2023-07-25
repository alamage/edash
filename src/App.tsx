import { type Component } from "solid-js";
import { DateTime } from "./components/DateTime";
import { PowerManagement } from "./components/PowerManagement";
import { Volume } from "./components/Volume";

const App: Component = () => {
  return (
    <div class="w-screen h-screen flex flex-row gap-5 items-center justify-center select-none bg-black text-white">
      <div class="flex flex-col">
        <div>
          <DateTime />
        </div>
        <div class="mt-10">
          <PowerManagement />
        </div>
      </div>
    </div>
  );
};

export default App;

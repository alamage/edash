import { createSignal, type Component } from "solid-js";

const [dateTime, setDateTime] = createSignal<Date>(new Date());

setInterval(() => {
  setDateTime(new Date());
}, 1000);

export const DateTime: Component = () => {
  return (
    <div class="flex flex-col items-center justify-center">
      <div class="font-mono text-2xl">{dateTime().toDateString()}</div>
      <div class="font-mono text-4xl">{dateTime().toLocaleTimeString()}</div>
    </div>
  );
};

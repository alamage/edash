import { createSignal, onMount, type Component } from "solid-js";

declare var bridge;
const [volume, setVolume] = createSignal(0);

onMount(() => {
  setInterval(() => {
    bridge.getVolume().then((value) => {
      setVolume(value);
    });
  }, 200);
});

export const Volume: Component = () => {
  return (
    <div class="flex flex-col">
      <input
        type="range"
        orient="vertical"
        style="-webkit-appearance: slider-vertical;"
        min="0"
        max="100"
        step="10"
        value={volume()}
        onChange={(e) => {
          setVolume(parseInt(e.target.value));
          bridge.setVolume(volume());
        }}
      />
    </div>
  );
};

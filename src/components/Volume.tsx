import { createSignal, onMount, type Component } from "solid-js";

declare var bridge;
const [volume, setVolume] = createSignal(0);

function resyncVolume() {
  bridge.getVolume().then((value) => {
    setVolume(value);
  });
}

window.addEventListener("focus", () => {
  resyncVolume();
  const timer = setInterval(() => {
    resyncVolume();
  }, 500);
  window.addEventListener("blur", () => clearInterval(timer));
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
          bridge.setVolume(parseInt(e.target.value));
          setVolume(parseInt(e.target.value));
        }}
      />
    </div>
  );
};

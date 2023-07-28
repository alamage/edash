import { createSignal, type Component, Show } from "solid-js";
import { DashButton } from "./DashButton";
import { RiMediaVolumeUpFill as VolumeIcon } from "solid-icons/ri";
import { RiMediaVolumeMuteFill as VolumeMutedIcon } from "solid-icons/ri";

declare var bridge;
const [volume, setVolume] = createSignal(0);
const [muted, setMuted] = createSignal(false);

function resyncVolume() {
  bridge.getVolume().then((value) => {
    setVolume(value);
  });
  bridge.getMuteState().then((value) => {
    setMuted(value);
  });
}

window.addEventListener("focus", () => {
  resyncVolume();
  const timer = setInterval(() => {
    resyncVolume();
  }, 200);
  window.addEventListener("blur", () => clearInterval(timer));
});

export const Volume: Component = () => {
  return (
    <div class="flex flex-row text-2xl gap-2 items-center justify-center align-center">
      <Show when={muted()}>
        <DashButton tooltip="Unmute" onclick={() => bridge.toggleMute()}>
          <VolumeMutedIcon />
        </DashButton>
      </Show>
      <Show when={!muted()}>
        <DashButton tooltip="Mute" onclick={() => bridge.toggleMute()}>
          <VolumeIcon />
        </DashButton>
        <input
          class="hover:cursor-pointer accent-slate-500"
          type="range"
          min="0"
          max="100"
          step="10"
          value={volume()}
          onChange={(e) => {
            bridge.setVolume(parseInt(e.target.value));
            setVolume(parseInt(e.target.value));
          }}
        />
      </Show>
    </div>
  );
};

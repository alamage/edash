import { createSignal, type Component } from "solid-js";
import { DashButton } from "./DashButton";

declare var bridge;

export const PowerManagement: Component = () => {
  return (
    <div class="flex flex-row">
      <DashButton name="Suspend" onclick={() => bridge.suspend()} />
      <DashButton name="Reboot" onclick={() => bridge.reboot()} />
      <DashButton name="Shutdown" onclick={() => bridge.shutdown()} />
    </div>
  );
};

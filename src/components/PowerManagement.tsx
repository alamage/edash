import { type Component } from "solid-js";
import { DashButton } from "./DashButton";
import { TbClockPause as SuspendIcon } from "solid-icons/tb";
import { RiDeviceRestartLine as RestartIcon } from "solid-icons/ri";
import { RiDeviceShutDownLine as ShutDownIcon } from "solid-icons/ri";

declare var bridge;

export const PowerManagement: Component = () => {
  return (
    <div class="flex flex-row gap-5">
      <DashButton tooltip="Suspend" onclick={() => bridge.suspend()}>
        <SuspendIcon />
      </DashButton>
      <DashButton tooltip="Restart" onclick={() => bridge.reboot()}>
        <RestartIcon />
      </DashButton>
      <DashButton tooltip="Shut Down" onclick={() => bridge.shutdown()}>
        <ShutDownIcon />
      </DashButton>
    </div>
  );
};

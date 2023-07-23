import { type Component, type JSX } from "solid-js";

interface Props {
  onclick: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
  name: string;
}

export const DashButton: Component<Props> = ({ onclick, name }) => {
  return (
    <button
      class="p-2 bg-zinc-400 text-black text-xs uppercase font-bold m-2 hover:bg-zinc-200 active:bg-zinc-300"
      onclick={onclick}
    >
      {name}
    </button>
  );
};

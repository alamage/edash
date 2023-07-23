import { createSignal, type Component } from "solid-js";

declare var bridge;
const [response, setResponse] = createSignal("");

function ping() {
  bridge.ping().then((value) => setResponse(value));
}

export const PingPongExample: Component = () => {
  return (
    <div>
      <button onclick={ping}>Ping</button>
      <p>{response()}</p>
    </div>
  );
};

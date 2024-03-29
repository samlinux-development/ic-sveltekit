import { writable } from "svelte/store";

// @ts-ignore
import { idlFactory } from "../declarations/backend/backend.did.js";
import { Actor, HttpAgent } from "@dfinity/agent";

import type { ActorSubclass } from "@dfinity/agent";
import type { _SERVICE } from "../declarations/backend/backend.did";

/**
 * Creates an actor for the Backend canister
 */
type OptionsType = {
  agentOptions?: import("@dfinity/agent").HttpAgentOptions;
  actorOptions?: import("@dfinity/agent").ActorConfig;
};

type ReturnType = {
  actor: import("@dfinity/agent").ActorSubclass<import("../declarations/backend/backend.did")._SERVICE>;
};

export function createActor(options?:OptionsType):ReturnType {
  const hostOptions = {
    host:
      process.env.DFX_NETWORK === "ic"
        ? `https://${process.env.CANISTER_ID_BACKEND}.ic0.app`
        : undefined,
  };
  if (!options) {
    options = {
      agentOptions: hostOptions,
    };
  } else if (!options.agentOptions) {
    options.agentOptions = hostOptions;
  } else {
    options.agentOptions.host = hostOptions.host;
  }

  const agent = new HttpAgent({ ...options.agentOptions });
  
  // Fetch root key for certificate validation during development
  if (process.env.DFX_NETWORK !== "ic") {
    agent.fetchRootKey().catch((err) => {
      console.warn(
        "Unable to fetch root key. Check to ensure that your local replica is running"
      );
      console.error(err);
    });
  }

  // Creates an actor with using the candid interface and the HttpAgent
  return Actor.createActor(idlFactory, {
    agent,
    canisterId: process.env.CANISTER_ID_BACKEND || "",
    ...options?.actorOptions,
  });
}
// create type
export const ic = writable<ReturnType>({
  actor: createActor() as unknown as ActorSubclass<_SERVICE>,
});
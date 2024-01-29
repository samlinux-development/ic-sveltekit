<p align="left" >
  <img width="240"  src="static/icAcademy.png">
</p>

# SvelteKit Dapp template

This repository is meant to give [SvelteKit](https://kit.svelte.dev/) developers an easy on-ramp to get started with developing decentralized applications (Dapps in short) for the Internet Computer blockchain.

Svelte  version:  4.2.9   
SvelteKit version: 2.5.0  
@dfinity/agent: 0.20.2   

## What is this repository for?
This repository is made for my personal use, but feel free to use it as a template for your own projects.


## Getting started
Make sure you have [node.js](https://nodejs.org/) installed. Node.js version 16 or later is required.

```
git clone https://github.com/samlinux-development/ic-svelte-starter.git
cd ic-svelte-starter.git
npm install
```

## DFX

Install `dfx` by running

```
sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
```

### Start and stop the local replica

Open a new terminal window _in the project directory_, and run the following command to start the local replica. The replica will not start unless `dfx.json` exists in the current directory.

```
dfx start --background
```

When you're done with development, or you're switching to a different dfx project, running

```
dfx stop
```

from the project directory will stop the local replica.

## Build & run the dapp

To build and deploy the project locally run

```
dfx deploy
```

When the process completes you'll have a frontend canister running locally. To find the frontend canister's ID, run

```
dfx canister id frontend
```

It will output something similar to `rno2w-sqaaa-aaaaa-aaacq-cai`. Copy this ID and open it in the browser using `http://<canister ID>.localhost:4943`, eg. `http://rno2w-sqaaa-aaaaa-aaacq-cai.localhost:4943`.

## Local development

You can serve the frontend in development mode like you normally develop an app using the command.

```
npm run dev
```

## Deploying to the playground

To test your dApp under the Internet Computer's environment, you can deploy it to the [Motoko Playground](https://m7sm4-2iaaa-aaaab-qabra-cai.raw.ic0.app/).

```
dfx deploy --playground
```

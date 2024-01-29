import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';
import inject from '@rollup/plugin-inject';

import { readFileSync } from 'fs';
import { join } from 'path';

const network = process.env.VITE_DFX_NETWORK ?? 'local';
const host = network === 'local' ? 'http://127.0.0.1:4943' : 'https://ic0.app';

const readCanisterIds = ({ prefix }: { prefix?: string }): Record<string, string> => {
	const canisterIdsJsonFile =
		network === 'ic'
			? join(process.cwd(), 'canister_ids.json')
			: join(process.cwd(), '.dfx', network, 'canister_ids.json');

	try {
		type Details = {
			ic?: string;
			local?: string;
		};
		const config: Record<string, Details> = JSON.parse(readFileSync(canisterIdsJsonFile, 'utf-8'));

		return Object.entries(config).reduce((acc, current:[string, Details]) => {
			const [canisterName, canisterDetails] = current;
			return {
				...acc,
				[`${prefix ?? ''}${canisterName.toUpperCase()}_CANISTER_ID`]:canisterDetails[network as keyof Details]
			};
		}, {});
	} catch (e) {
		throw Error(`Could not get canister ID from ${canisterIdsJsonFile}: ${e}`);
	}
};

const config = {
	plugins: [sveltekit()],
	build: {
		target: 'es2020',
		rollupOptions: {
			// Polyfill Buffer for production build
			plugins: [
				inject({
					modules: { Buffer: ['buffer', 'Buffer'] }
				})
			]
		}
		
	},
	optimizeDeps: {
		esbuildOptions: {
			// Node.js global to browser globalThis
			define: {
				global: 'globalThis'
			}
		}
	},
	server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4943",
        changeOrigin: true,
      },
    },
  }
};

export default defineConfig(({ mode }) => {
  process.env = {
		...process.env,
		...loadEnv(mode ?? 'development', process.cwd()),
		...readCanisterIds({ prefix: 'VITE_' }),
		VITE_DFX_NETWORK: network,
		VITE_HOST: host
	};

	return {
		...config,
		// Backwards compatibility for auto generated types of dfx that are meant for webpack and process.env
		// needed if network == playground
		define: {
			'process.env': {
				...readCanisterIds({ prefix: '' }),
				DFX_NETWORK: network,
				DFX_HOST: host
			}
		}
	}

});

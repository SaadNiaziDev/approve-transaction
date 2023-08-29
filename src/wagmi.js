import { createConfig, configureChains, mainnet } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { bsc, bscTestnet } from "viem/chains";

const { publicClient, webSocketPublicClient } = configureChains([mainnet, bscTestnet], [publicProvider()]);

const chains = [mainnet, bscTestnet];

export const config = createConfig({
	autoConnect: true,
	connectors: [
		new MetaMaskConnector({
			chains: chains,
			options: {
				shimDisconnect: true,
			},
		}),
	],
	publicClient,
	webSocketPublicClient,
});

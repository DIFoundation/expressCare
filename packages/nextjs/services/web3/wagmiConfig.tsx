import { wagmiConnectors } from "./wagmiConnectors";
import { Chain, createClient, fallback, http } from "viem";
import { hardhat, mainnet } from "viem/chains";
import { createConfig } from "wagmi";
import scaffoldConfig from "~~/scaffold.config";
import { getEtherscanHttpUrl } from "~~/utils/helper/networks";

const { targetNetworks } = scaffoldConfig;

// We always want to have mainnet enabled (ENS resolution, ETH price, etc). But only once.
export const enabledChains = targetNetworks.find((network: Chain) => network.id === 1)
  ? targetNetworks
  : ([...targetNetworks, mainnet] as const);

export const wagmiConfig = createConfig({
  chains: enabledChains,
  connectors: wagmiConnectors(),
  ssr: true,
  client: ({ chain }) => {
    let rpcFallbacks = [http()];
    
    // Add Etherscan RPC if API key is available
    const etherscanUrl = getEtherscanHttpUrl(chain.id);
    if (etherscanUrl && scaffoldConfig.etherscanKey) {
      rpcFallbacks.unshift(http(`${etherscanUrl}?apikey=${scaffoldConfig.etherscanKey}`));
    }
    
    return createClient({
      chain,
      transport: fallback(rpcFallbacks),
      ...(chain.id !== (hardhat as Chain).id ? { pollingInterval: scaffoldConfig.pollingInterval } : {}),
    });
  },
});

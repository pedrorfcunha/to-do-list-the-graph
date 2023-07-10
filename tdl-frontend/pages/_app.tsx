import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { configureChains, sepolia, WagmiConfig, createConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { getDefaultWallets, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { ChakraProvider } from '@chakra-ui/react';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sepolia],
  [alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || '' }), publicProvider()],
);

const { connectors } = getDefaultWallets({
  appName: 'To do list App',
  projectId: 'TDL_THE_GRAPH',
  chains,
});

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  connectors,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <WagmiConfig config={config}>
        <RainbowKitProvider chains={chains} theme={darkTheme()}>
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  );
}

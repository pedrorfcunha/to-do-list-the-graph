import type { AppProps } from 'next/app';
import { configureChains, sepolia, WagmiConfig, createConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { getDefaultWallets, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { ChakraProvider } from '@chakra-ui/react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import '@rainbow-me/rainbowkit/styles.css';
import '@/styles/globals.css';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sepolia],
  [alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || '' }), publicProvider()],
);

const { connectors } = getDefaultWallets({
  appName: "To do list App",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '',
  chains,
});

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  connectors,
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://api.studio.thegraph.com/query/49520/todo-list/v0.0.2',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <ApolloProvider client={client}>
        <WagmiConfig config={config}>
          <RainbowKitProvider chains={chains} theme={darkTheme()}>
            <ChakraProvider>
              <Component {...pageProps} />
            </ChakraProvider>
          </RainbowKitProvider>
        </WagmiConfig>
      </ApolloProvider>
    </div>
  );
}

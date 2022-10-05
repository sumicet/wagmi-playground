import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { configureChains, chain, createClient, WagmiConfig } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';

const { provider, webSocketProvider } = configureChains(
    [chain.polygonMumbai],
    [
        jsonRpcProvider({
            rpc: chain => ({
                http: 'https://matic-mumbai.chainstacklabs.com',
            }),
        }),
    ]
);

const metaMask = new MetaMaskConnector({
    chains: [chain.polygonMumbai],
    options: {
        shimDisconnect: true,
    },
});

const coinbase = new CoinbaseWalletConnector({
    chains: [chain.polygonMumbai],
    options: {
        appName: 'IDK',
    },
});

const client = createClient({
    autoConnect: true,
    provider,
    webSocketProvider,
    connectors: [metaMask, coinbase],
});

const theme = extendTheme({
    config: {
        initialColorMode: 'dark',
        useSystemColorMode: false,
        cssVarPrefix: 'wagmi-playground',
    },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <WagmiConfig client={client}>
                <App />
            </WagmiConfig>
        </ChakraProvider>
    </React.StrictMode>
);

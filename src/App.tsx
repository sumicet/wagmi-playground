import { Button, Center, HStack } from '@chakra-ui/react';
import { chain, useConnect, useNetwork, useSwitchNetwork } from 'wagmi';

function App() {
    const { connect, connectors } = useConnect();

    return (
        <Center width='100%'>
            <HStack>
                {connectors
                    .filter(connector => connector.ready)
                    .map(connector => (
                        <Button
                            key={connector.name}
                            onClick={() => connect({ connector, chainId: chain.polygonMumbai.id })}
                        >
                            Connect {connector.name}
                        </Button>
                    ))}
            </HStack>
        </Center>
    );
}

export default App;

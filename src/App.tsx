import { chain, useConnect } from 'wagmi';

function App() {
    const { connect, connectors } = useConnect();

    return (
        <div>
            {connectors
                .filter(connector => connector.ready)
                .map(connector => (
                    <button
                        key={connector.name}
                        onClick={() => connect({ connector, chainId: chain.polygonMumbai.id })}
                    >
                        Connect {connector.name}
                    </button>
                ))}
        </div>
    );
}

export default App;

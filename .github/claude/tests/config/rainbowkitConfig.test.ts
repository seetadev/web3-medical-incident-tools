import { rainbowkitConfig } from '@/config/rainbowkitConfig';

// Mock the getDefaultConfig function
jest.mock('@rainbow-me/rainbowkit', () => ({
  getDefaultConfig: jest.fn((config) => ({
    ...config,
    connectors: [],
    publicClient: {},
    webSocketPublicClient: {},
  })),
}));

// Mock the chains
jest.mock('wagmi/chains', () => ({
  optimismSepolia: {
    id: 11155420,
    name: 'Optimism Sepolia',
    network: 'optimism-sepolia',
  },
  polygonAmoy: {
    id: 80002,
    name: 'Polygon Amoy',
    network: 'polygon-amoy',
  },
}));

describe('RainbowKit Configuration', () => {
  it('exports a valid configuration object', () => {
    expect(rainbowkitConfig).toBeDefined();
    expect(typeof rainbowkitConfig).toBe('object');
  });

  it('has correct app name configuration', () => {
    expect(rainbowkitConfig.appName).toBe('Rootstock Rainbowkit');
  });

  it('has correct project ID configuration', () => {
    expect(rainbowkitConfig.projectId).toBe('73bfede1812912189a63f8b354eac692');
  });

  it('includes required chains configuration', () => {
    expect(rainbowkitConfig.chains).toBeDefined();
    expect(Array.isArray(rainbowkitConfig.chains)).toBe(true);
    expect(rainbowkitConfig.chains.length).toBe(2);
  });

  it('includes optimismSepolia chain', () => {
    const optimismSepoliaChain = rainbowkitConfig.chains.find(
      (chain: any) => chain.name === 'Optimism Sepolia'
    );
    expect(optimismSepoliaChain).toBeDefined();
    expect(optimismSepoliaChain.id).toBe(11155420);
  });

  it('includes polygonAmoy chain', () => {
    const polygonAmoyChain = rainbowkitConfig.chains.find(
      (chain: any) => chain.name === 'Polygon Amoy'
    );
    expect(polygonAmoyChain).toBeDefined();
    expect(polygonAmoyChain.id).toBe(80002);
  });

  it('has valid project ID format', () => {
    const projectId = rainbowkitConfig.projectId;
    expect(projectId).toMatch(/^[a-fA-F0-9]{32}$/);
  });

  it('contains all required configuration properties', () => {
    expect(rainbowkitConfig).toHaveProperty('appName');
    expect(rainbowkitConfig).toHaveProperty('projectId');
    expect(rainbowkitConfig).toHaveProperty('chains');
  });

  it('app name is a non-empty string', () => {
    expect(typeof rainbowkitConfig.appName).toBe('string');
    expect(rainbowkitConfig.appName.length).toBeGreaterThan(0);
  });

  it('project ID is a valid WalletConnect project ID', () => {
    expect(typeof rainbowkitConfig.projectId).toBe('string');
    expect(rainbowkitConfig.projectId.length).toBe(32);
  });
});
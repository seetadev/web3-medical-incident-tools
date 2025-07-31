import { rsktestnet } from '@/lib/utils/RootstockTestnet';

describe('Rootstock Testnet Configuration', () => {
  it('has correct chain ID', () => {
    expect(rsktestnet.id).toBe(31);
  });

  it('has correct chain name', () => {
    expect(rsktestnet.name).toBe('Rootstock Testnet');
  });

  it('has correct native currency configuration', () => {
    expect(rsktestnet.nativeCurrency).toEqual({
      decimals: 18,
      name: 'Rootstock Smart Bitcoin',
      symbol: 'tRBTC',
    });
  });

  it('has correct RPC URLs', () => {
    expect(rsktestnet.rpcUrls.default.http).toEqual([
      'https://public-node.testnet.rsk.co'
    ]);
  });

  it('has correct block explorer configuration', () => {
    expect(rsktestnet.blockExplorers.default).toEqual({
      name: 'Explorer',
      url: 'https://explorer.testnet.rsk.co'
    });
  });

  it('has correct multicall3 contract configuration', () => {
    expect(rsktestnet.contracts.multicall3).toEqual({
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 2771150,
    });
  });

  it('has all required properties for a valid chain config', () => {
    expect(rsktestnet).toHaveProperty('id');
    expect(rsktestnet).toHaveProperty('name');
    expect(rsktestnet).toHaveProperty('nativeCurrency');
    expect(rsktestnet).toHaveProperty('rpcUrls');
    expect(rsktestnet).toHaveProperty('blockExplorers');
    expect(rsktestnet).toHaveProperty('contracts');
  });

  it('has valid multicall3 address format', () => {
    const address = rsktestnet.contracts.multicall3.address;
    expect(address).toMatch(/^0x[a-fA-F0-9]{40}$/);
  });

  it('has valid RPC URL format', () => {
    const rpcUrl = rsktestnet.rpcUrls.default.http[0];
    expect(rpcUrl).toMatch(/^https?:\/\/.+/);
  });

  it('has valid explorer URL format', () => {
    const explorerUrl = rsktestnet.blockExplorers.default.url;
    expect(explorerUrl).toMatch(/^https?:\/\/.+/);
  });
});
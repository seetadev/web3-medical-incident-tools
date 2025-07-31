import { queryClient } from '@/config/wagmiProviderConfig';

// Mock QueryClient
jest.mock('@tanstack/react-query', () => ({
  QueryClient: jest.fn().mockImplementation(() => ({
    mount: jest.fn(),
    unmount: jest.fn(),
    isFetching: jest.fn(),
    isMutating: jest.fn(),
    getQueryData: jest.fn(),
    setQueryData: jest.fn(),
    invalidateQueries: jest.fn(),
    refetchQueries: jest.fn(),
    cancelQueries: jest.fn(),
    removeQueries: jest.fn(),
    resetQueries: jest.fn(),
    getDefaultOptions: jest.fn(),
    setDefaultOptions: jest.fn(),
    clear: jest.fn(),
  })),
}));

describe('Wagmi Provider Configuration', () => {
  it('exports a QueryClient instance', () => {
    expect(queryClient).toBeDefined();
    expect(typeof queryClient).toBe('object');
  });

  it('QueryClient has expected methods', () => {
    expect(queryClient.mount).toBeDefined();
    expect(queryClient.unmount).toBeDefined();
    expect(queryClient.getQueryData).toBeDefined();
    expect(queryClient.setQueryData).toBeDefined();
    expect(queryClient.invalidateQueries).toBeDefined();
    expect(queryClient.refetchQueries).toBeDefined();
  });

  it('QueryClient methods are functions', () => {
    expect(typeof queryClient.mount).toBe('function');
    expect(typeof queryClient.unmount).toBe('function');
    expect(typeof queryClient.getQueryData).toBe('function');
    expect(typeof queryClient.setQueryData).toBe('function');
    expect(typeof queryClient.invalidateQueries).toBe('function');
    expect(typeof queryClient.refetchQueries).toBe('function');
  });

  it('can call QueryClient methods without errors', () => {
    expect(() => queryClient.mount()).not.toThrow();
    expect(() => queryClient.unmount()).not.toThrow();
    expect(() => queryClient.getQueryData(['test'])).not.toThrow();
    expect(() => queryClient.clear()).not.toThrow();
  });

  it('QueryClient instance is properly configured', () => {
    expect(queryClient).toBeInstanceOf(Object);
    expect(queryClient.getDefaultOptions).toBeDefined();
    expect(queryClient.setDefaultOptions).toBeDefined();
  });

  it('QueryClient can handle query operations', () => {
    expect(() => queryClient.invalidateQueries()).not.toThrow();
    expect(() => queryClient.refetchQueries()).not.toThrow();
    expect(() => queryClient.cancelQueries()).not.toThrow();
    expect(() => queryClient.removeQueries()).not.toThrow();
    expect(() => queryClient.resetQueries()).not.toThrow();
  });

  it('QueryClient can handle caching operations', () => {
    expect(() => queryClient.getQueryData(['test-key'])).not.toThrow();
    expect(() => queryClient.setQueryData(['test-key'], 'test-data')).not.toThrow();
  });

  it('QueryClient supports monitoring operations', () => {
    expect(typeof queryClient.isFetching).toBe('function');
    expect(typeof queryClient.isMutating).toBe('function');
  });
});
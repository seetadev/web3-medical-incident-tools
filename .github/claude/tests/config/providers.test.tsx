import React from 'react';
import { render } from '@testing-library/react';
import Providers from '@/config/providers';

// Mock dependencies
jest.mock('wagmi', () => ({
  WagmiProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="wagmi-provider">{children}</div>
  ),
}));

jest.mock('@rainbow-me/rainbowkit', () => ({
  RainbowKitProvider: ({ children, theme }: { children: React.ReactNode; theme: any }) => (
    <div data-testid="rainbowkit-provider" data-theme={JSON.stringify(theme)}>
      {children}
    </div>
  ),
  darkTheme: (config: any) => ({ type: 'dark', ...config }),
}));

jest.mock('@tanstack/react-query', () => ({
  QueryClientProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="query-client-provider">{children}</div>
  ),
}));

jest.mock('@/config/wagmiProviderConfig', () => ({
  queryClient: {},
}));

jest.mock('@/config/rainbowkitConfig', () => ({
  rainbowkitConfig: {},
}));

describe('Providers Component', () => {
  const TestChild = () => <div data-testid="test-child">Test Child</div>;

  it('renders all provider wrappers correctly', () => {
    const { getByTestId } = render(
      <Providers>
        <TestChild />
      </Providers>
    );

    expect(getByTestId('wagmi-provider')).toBeInTheDocument();
    expect(getByTestId('query-client-provider')).toBeInTheDocument();
    expect(getByTestId('rainbowkit-provider')).toBeInTheDocument();
    expect(getByTestId('test-child')).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    const { getByTestId } = render(
      <Providers>
        <TestChild />
      </Providers>
    );

    expect(getByTestId('test-child')).toBeInTheDocument();
  });

  it('applies dark theme configuration to RainbowKit', () => {
    const { getByTestId } = render(
      <Providers>
        <TestChild />
      </Providers>
    );

    const rainbowkitProvider = getByTestId('rainbowkit-provider');
    const themeData = JSON.parse(rainbowkitProvider.getAttribute('data-theme') || '{}');
    
    expect(themeData).toMatchObject({
      type: 'dark',
      accentColor: '#f28a0e',
      accentColorForeground: 'black',
    });
  });

  it('wraps providers in correct order', () => {
    const { container } = render(
      <Providers>
        <TestChild />
      </Providers>
    );

    // Check nesting order: WagmiProvider > QueryClientProvider > RainbowKitProvider > children
    const wagmiProvider = container.querySelector('[data-testid="wagmi-provider"]');
    const queryProvider = wagmiProvider?.querySelector('[data-testid="query-client-provider"]');
    const rainbowkitProvider = queryProvider?.querySelector('[data-testid="rainbowkit-provider"]');
    const testChild = rainbowkitProvider?.querySelector('[data-testid="test-child"]');

    expect(wagmiProvider).toBeInTheDocument();
    expect(queryProvider).toBeInTheDocument();
    expect(rainbowkitProvider).toBeInTheDocument();
    expect(testChild).toBeInTheDocument();
  });

  it('handles multiple children correctly', () => {
    const { getByTestId } = render(
      <Providers>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
      </Providers>
    );

    expect(getByTestId('child-1')).toBeInTheDocument();
    expect(getByTestId('child-2')).toBeInTheDocument();
  });

  it('provides proper TypeScript props interface', () => {
    // This test ensures the component accepts children prop correctly
    expect(() => {
      render(
        <Providers>
          <TestChild />
        </Providers>
      );
    }).not.toThrow();
  });
});
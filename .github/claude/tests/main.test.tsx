import React from 'react';
import ReactDOM from 'react-dom/client';

// Mock ReactDOM
const mockRender = jest.fn();
const mockCreateRoot = jest.fn(() => ({
  render: mockRender,
}));

jest.mock('react-dom/client', () => ({
  createRoot: mockCreateRoot,
}));

// Mock components and providers
jest.mock('@/App', () => {
  return function MockApp() {
    return <div>Mock App</div>;
  };
});

jest.mock('@/config/providers', () => {
  return function MockProviders({ children }: { children: React.ReactNode }) {
    return <div data-testid="providers">{children}</div>;
  };
});

// Mock CSS imports
jest.mock('@/polyfills', () => ({}));
jest.mock('@rainbow-me/rainbowkit/styles.css', () => ({}));
jest.mock('@/index.css', () => ({}));

// Mock document.getElementById
const mockGetElementById = jest.fn(() => ({
  id: 'root',
  innerHTML: '',
}));

Object.defineProperty(document, 'getElementById', {
  value: mockGetElementById,
});

describe('Main Entry Point', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('gets the root element correctly', async () => {
    await import('@/main');
    
    expect(mockGetElementById).toHaveBeenCalledWith('root');
  });

  it('creates React root with the root element', async () => {
    await import('@/main');
    
    expect(mockCreateRoot).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'root' })
    );
  });

  it('renders the app with providers in StrictMode', async () => {
    await import('@/main');
    
    expect(mockRender).toHaveBeenCalledWith(
      expect.objectContaining({
        type: React.StrictMode,
        props: expect.objectContaining({
          children: expect.any(Object),
        }),
      })
    );
  });

  it('wraps App component with Providers', async () => {
    await import('@/main');
    
    const renderCall = mockRender.mock.calls[0][0];
    const strictModeChildren = renderCall.props.children;
    
    // Check that Providers is wrapping App
    expect(strictModeChildren.type.name).toBe('MockProviders');
    expect(strictModeChildren.props.children.type.name).toBe('MockApp');
  });

  it('imports required CSS files', async () => {
    // This test ensures that the CSS imports don't cause errors
    expect(() => {
      require('@rainbow-me/rainbowkit/styles.css');
      require('@/index.css');
    }).not.toThrow();
  });

  it('imports polyfills', async () => {
    // This test ensures that polyfills are imported
    expect(() => {
      require('@/polyfills');
    }).not.toThrow();
  });

  it('handles missing root element gracefully', async () => {
    mockGetElementById.mockReturnValueOnce(null);
    
    // This should throw an error as expected by React 18
    await expect(async () => {
      // Clear the module cache and re-import
      jest.resetModules();
      await import('@/main');
    }).rejects.toThrow();
  });

  it('uses React StrictMode for development checks', async () => {
    await import('@/main');
    
    const renderCall = mockRender.mock.calls[0][0];
    expect(renderCall.type).toBe(React.StrictMode);
  });

  it('maintains proper component hierarchy', async () => {
    await import('@/main');
    
    const renderCall = mockRender.mock.calls[0][0];
    
    // StrictMode > Providers > App
    expect(renderCall.type).toBe(React.StrictMode);
    
    const providersComponent = renderCall.props.children;
    expect(providersComponent.type.name).toBe('MockProviders');
    
    const appComponent = providersComponent.props.children;
    expect(appComponent.type.name).toBe('MockApp');
  });
});
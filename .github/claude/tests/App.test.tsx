import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '@/App';

// Mock components
jest.mock('@/components/Navbar', () => {
  return function MockNavbar() {
    return <nav data-testid="navbar">Mock Navbar</nav>;
  };
});

jest.mock('@/pages', () => ({
  Home: function MockHome() {
    return <div data-testid="home-page">Mock Home Page</div>;
  },
}));

jest.mock('@/pages/Attestation', () => {
  return function MockFieldAdder() {
    return <div data-testid="attestation-page">Mock Attestation Page</div>;
  };
});

describe('App Component', () => {
  const renderApp = (initialEntries = ['/']) => {
    return render(
      <MemoryRouter initialEntries={initialEntries}>
        <App />
      </MemoryRouter>
    );
  };

  it('renders the main app structure', () => {
    renderApp();
    
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    expect(main).toHaveClass('min-h-screen', 'flex', 'flex-col', 'justify-between');
  });

  it('always renders the Navbar component', () => {
    renderApp();
    
    const navbar = screen.getByTestId('navbar');
    expect(navbar).toBeInTheDocument();
  });

  it('renders Home page on root route', () => {
    renderApp(['/']);
    
    const homePage = screen.getByTestId('home-page');
    expect(homePage).toBeInTheDocument();
  });

  it('renders Attestation page on /a route', () => {
    renderApp(['/a']);
    
    const attestationPage = screen.getByTestId('attestation-page');
    expect(attestationPage).toBeInTheDocument();
  });

  it('renders Navbar on all routes', () => {
    renderApp(['/']);
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    
    renderApp(['/a']);
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });

  it('has proper semantic HTML structure', () => {
    renderApp();
    
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('applies correct CSS classes to main container', () => {
    renderApp();
    
    const main = screen.getByRole('main');
    expect(main).toHaveClass('min-h-screen');
    expect(main).toHaveClass('flex');
    expect(main).toHaveClass('flex-col');
    expect(main).toHaveClass('justify-between');
  });

  it('handles route navigation correctly', () => {
    const { rerender } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
    expect(screen.queryByTestId('attestation-page')).not.toBeInTheDocument();
    
    rerender(
      <MemoryRouter initialEntries={['/a']}>
        <App />
      </MemoryRouter>
    );
    
    expect(screen.getByTestId('attestation-page')).toBeInTheDocument();
    expect(screen.queryByTestId('home-page')).not.toBeInTheDocument();
  });

  it('maintains consistent layout across routes', () => {
    renderApp(['/']);
    const mainHome = screen.getByRole('main');
    expect(mainHome).toHaveClass('min-h-screen', 'flex', 'flex-col', 'justify-between');
    
    renderApp(['/a']);
    const mainAttestation = screen.getByRole('main');
    expect(mainAttestation).toHaveClass('min-h-screen', 'flex', 'flex-col', 'justify-between');
  });

  it('handles unknown routes gracefully', () => {
    renderApp(['/unknown-route']);
    
    // Should still render navbar and main structure
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    
    // But no page components should be rendered
    expect(screen.queryByTestId('home-page')).not.toBeInTheDocument();
    expect(screen.queryByTestId('attestation-page')).not.toBeInTheDocument();
  });
});
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '@/components/Navbar';

// Mock RainbowKit ConnectButton
jest.mock('@rainbow-me/rainbowkit', () => ({
  ConnectButton: ({ showBalance, chainStatus }: any) => (
    <div data-testid="connect-button" data-show-balance={showBalance}>
      Connect Wallet
    </div>
  ),
}));

const renderNavbar = () => {
  return render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
};

describe('Navbar Component', () => {
  it('renders the navbar with correct structure', () => {
    renderNavbar();
    
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveClass('sticky', 'top-4', 'flex', 'items-center', 'justify-between');
  });

  it('displays the app logo/title as a link', () => {
    renderNavbar();
    
    const logoLink = screen.getByRole('link');
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');
    
    const logoText = screen.getByText('DeciReport');
    expect(logoText).toBeInTheDocument();
    expect(logoText).toHaveClass('font-extrabold', 'text-2xl');
  });

  it('renders the ConnectButton with correct props', () => {
    renderNavbar();
    
    const connectButton = screen.getByTestId('connect-button');
    expect(connectButton).toBeInTheDocument();
    expect(connectButton).toHaveAttribute('data-show-balance', 'false');
    expect(connectButton).toHaveTextContent('Connect Wallet');
  });

  it('has proper styling classes applied', () => {
    renderNavbar();
    
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass(
      'sticky',
      'top-4',
      'flex',
      'items-center',
      'justify-between',
      'py-3',
      'px-5',
      'rounded-full',
      'mt-4',
      'w-full',
      'max-w-[1200px]',
      'mx-auto',
      'bg-gray-600/20',
      'backdrop-blur-lg',
      'z-[100]'
    );
  });

  it('maintains accessibility standards', () => {
    renderNavbar();
    
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
    
    const logoLink = screen.getByRole('link');
    expect(logoLink).toBeInTheDocument();
  });
});
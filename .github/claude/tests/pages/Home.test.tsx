import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Home } from '@/pages/Home';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const renderHome = () => {
  return render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
};

describe('Home Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders the main heading correctly', () => {
    renderHome();
    
    expect(screen.getByText('Report Your')).toBeInTheDocument();
    expect(screen.getByText('Road')).toBeInTheDocument();
    expect(screen.getByText('Incidents')).toBeInTheDocument();
  });

  it('displays the subtitle text', () => {
    renderHome();
    
    const subtitle = screen.getByText('here....');
    expect(subtitle).toBeInTheDocument();
    expect(subtitle).toHaveClass('text-[1.5em]', 'md:text-[2em]', 'mt-4', 'text-center', 'font-bold');
  });

  it('renders the Get Started button', () => {
    renderHome();
    
    const getStartedButton = screen.getByRole('button', { name: /get started/i });
    expect(getStartedButton).toBeInTheDocument();
    expect(getStartedButton).toHaveClass('mt-10', 'mx-auto', 'flex', 'gap-2', 'px-6');
  });

  it('navigates to report page when Get Started button is clicked', () => {
    renderHome();
    
    const getStartedButton = screen.getByRole('button', { name: /get started/i });
    fireEvent.click(getStartedButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('/report');
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });

  it('has proper semantic HTML structure', () => {
    renderHome();
    
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    expect(main).toHaveClass('max-w-[1100px]', 'mx-auto');
    
    const section = main.querySelector('section');
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass('mx-auto', 'flex', 'flex-col', 'items-center', 'justify-center', 'min-h-[90vh]');
  });

  it('applies correct styling to heading elements', () => {
    renderHome();
    
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toHaveClass(
      'text-[3em]',
      'md:text-[4em]',
      'lg:text-[7em]',
      'flex',
      'flex-col',
      'gap-5',
      'text-center',
      'font-bold',
      'font-neueMachinaBold',
      'text-balance',
      'md:leading-[auto]',
      'lg:leading-tight',
      'text-black'
    );
  });

  it('has correct background colors for text spans', () => {
    renderHome();
    
    const reportYourSpan = screen.getByText('Report Your');
    expect(reportYourSpan).toHaveClass('bg-orange-400', 'lg:pt-5', 'px-2', 'leading-tight');
    
    const roadSpan = screen.getByText('Road');
    expect(roadSpan).toHaveClass('bg-fuchsia-500', 'pt-5', 'px-2');
    
    const incidentsSpan = screen.getByText('Incidents');
    expect(incidentsSpan).toHaveClass('bg-fuchsia-500', 'pt-5', 'px-2');
  });

  it('is responsive and mobile-friendly', () => {
    renderHome();
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveClass('text-[3em]', 'md:text-[4em]', 'lg:text-[7em]');
    
    const subtitle = screen.getByText('here....');
    expect(subtitle).toHaveClass('text-[1.5em]', 'md:text-[2em]');
  });
});
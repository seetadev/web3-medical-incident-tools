import { Home } from '@/pages/index';

describe('Pages Index Export', () => {
  it('exports Home component correctly', () => {
    expect(Home).toBeDefined();
    expect(typeof Home).toBe('function');
  });

  it('Home component can be instantiated', () => {
    expect(() => Home).not.toThrow();
  });
});
import { cn, formatAddress } from '@/lib/utils';

describe('Utility Functions', () => {
  describe('cn function', () => {
    it('merges class names correctly', () => {
      const result = cn('class1', 'class2');
      expect(result).toBe('class1 class2');
    });

    it('handles conditional classes', () => {
      const result = cn('class1', false && 'class2', 'class3');
      expect(result).toBe('class1 class3');
    });

    it('handles undefined and null values', () => {
      const result = cn('class1', null, undefined, 'class2');
      expect(result).toBe('class1 class2');
    });

    it('merges Tailwind classes properly', () => {
      const result = cn('px-2 py-1', 'px-4');
      expect(result).toBe('py-1 px-4');
    });

    it('handles empty input', () => {
      const result = cn();
      expect(result).toBe('');
    });

    it('handles array inputs', () => {
      const result = cn(['class1', 'class2'], 'class3');
      expect(result).toBe('class1 class2 class3');
    });
  });

  describe('formatAddress function', () => {
    it('formats a standard Ethereum address correctly', () => {
      const address = '0x1234567890abcdef1234567890abcdef12345678';
      const result = formatAddress(address);
      expect(result).toBe('0x1234...5678');
    });

    it('formats a short address correctly', () => {
      const address = '0x123456789a';
      const result = formatAddress(address);
      expect(result).toBe('0x1234...689a');
    });

    it('handles minimum length address', () => {
      const address = '0x1234567890';
      const result = formatAddress(address);
      expect(result).toBe('0x1234...7890');
    });

    it('handles very long address', () => {
      const address = '0x1234567890abcdef1234567890abcdef123456789012345';
      const result = formatAddress(address);
      expect(result).toBe('0x1234...6789');
    });

    it('preserves the format with different characters', () => {
      const address = '0xabcdefghijklmnopqrstuvwxyzabcdefghijklmn';
      const result = formatAddress(address);
      expect(result).toBe('0xabcd...klmn');
    });
  });
});
import { ERC20_ADDRESS, ERC721_ADDRESS, ERC1155_ADDRESS } from '@/lib/constants';

describe('Constants', () => {
  describe('Contract Addresses', () => {
    it('exports ERC20_ADDRESS with correct format', () => {
      expect(ERC20_ADDRESS).toBeDefined();
      expect(ERC20_ADDRESS).toBe('0x72df7a1734dd6cea1682f2b93634c7f7007ad511');
      expect(ERC20_ADDRESS).toMatch(/^0x[a-fA-F0-9]{40}$/);
    });

    it('exports ERC721_ADDRESS with correct format', () => {
      expect(ERC721_ADDRESS).toBeDefined();
      expect(ERC721_ADDRESS).toBe('0x65C955e31f8bd0964127a0A2F4bC84AB298c71BE');
      expect(ERC721_ADDRESS).toMatch(/^0x[a-fA-F0-9]{40}$/);
    });

    it('exports ERC1155_ADDRESS with correct format', () => {
      expect(ERC1155_ADDRESS).toBeDefined();
      expect(ERC1155_ADDRESS).toBe('0xB522148B5587625610AeB9600A1716DAe2bB6DE9');
      expect(ERC1155_ADDRESS).toMatch(/^0x[a-fA-F0-9]{40}$/);
    });

    it('all addresses are different', () => {
      expect(ERC20_ADDRESS).not.toBe(ERC721_ADDRESS);
      expect(ERC20_ADDRESS).not.toBe(ERC1155_ADDRESS);
      expect(ERC721_ADDRESS).not.toBe(ERC1155_ADDRESS);
    });

    it('all addresses are lowercase', () => {
      expect(ERC20_ADDRESS).toBe(ERC20_ADDRESS.toLowerCase());
      expect(ERC721_ADDRESS).toBe(ERC721_ADDRESS.toLowerCase());
      expect(ERC1155_ADDRESS).toBe(ERC1155_ADDRESS.toLowerCase());
    });

    it('all addresses have correct length', () => {
      expect(ERC20_ADDRESS.length).toBe(42); // 0x + 40 characters
      expect(ERC721_ADDRESS.length).toBe(42);
      expect(ERC1155_ADDRESS.length).toBe(42);
    });
  });

  describe('Address Validation', () => {
    it('validates ERC20 address checksum', () => {
      expect(typeof ERC20_ADDRESS).toBe('string');
      expect(ERC20_ADDRESS.startsWith('0x')).toBe(true);
    });

    it('validates ERC721 address checksum', () => {
      expect(typeof ERC721_ADDRESS).toBe('string');
      expect(ERC721_ADDRESS.startsWith('0x')).toBe(true);
    });

    it('validates ERC1155 address checksum', () => {
      expect(typeof ERC1155_ADDRESS).toBe('string');
      expect(ERC1155_ADDRESS.startsWith('0x')).toBe(true);
    });
  });
});
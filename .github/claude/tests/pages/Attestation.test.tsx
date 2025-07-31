import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FieldAdder from '@/pages/Attestation';

// Mock the SignProtocolClient
jest.mock('@ethsign/sp-sdk', () => ({
  SignProtocolClient: jest.fn().mockImplementation(() => ({
    createSchema: jest.fn(),
    getSchema: jest.fn(),
    createAttestation: jest.fn(),
  })),
  SpMode: {
    OnChain: 'onchain',
  },
  EvmChains: {
    polygonAmoy: 'polygonAmoy',
  },
}));

// Mock viem/accounts
jest.mock('viem/accounts', () => ({
  privateKeyToAccount: jest.fn().mockReturnValue({ address: '0x123' }),
}));

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  ChevronDown: () => <div data-testid="chevron-down-icon" />,
  Plus: () => <div data-testid="plus-icon" />,
  X: () => <div data-testid="x-icon" />,
}));

describe('FieldAdder Component', () => {
  let mockClient: any;

  beforeEach(() => {
    const { SignProtocolClient } = require('@ethsign/sp-sdk');
    mockClient = {
      createSchema: jest.fn(),
      getSchema: jest.fn(),
      createAttestation: jest.fn(),
    };
    SignProtocolClient.mockImplementation(() => mockClient);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the field adder form correctly', () => {
    render(<FieldAdder />);
    
    expect(screen.getByText('Schema Management')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Field name')).toBeInTheDocument();
    expect(screen.getByDisplayValue('uint256')).toBeInTheDocument();
    expect(screen.getByText('Add Field')).toBeInTheDocument();
  });

  it('allows adding fields to the schema', async () => {
    render(<FieldAdder />);
    
    const fieldNameInput = screen.getByPlaceholderText('Field name');
    const addButton = screen.getByText('Add Field');
    
    fireEvent.change(fieldNameInput, { target: { value: 'testField' } });
    fireEvent.click(addButton);
    
    await waitFor(() => {
      expect(screen.getByText('testField (uint256)')).toBeInTheDocument();
    });
  });

  it('prevents adding empty field names', () => {
    render(<FieldAdder />);
    
    const addButton = screen.getByText('Add Field');
    const initialFieldCount = screen.queryAllByTestId('x-icon').length;
    
    fireEvent.click(addButton);
    
    const finalFieldCount = screen.queryAllByTestId('x-icon').length;
    expect(finalFieldCount).toBe(initialFieldCount);
  });

  it('allows removing fields from the schema', async () => {
    render(<FieldAdder />);
    
    const fieldNameInput = screen.getByPlaceholderText('Field name');
    const addButton = screen.getByText('Add Field');
    
    // Add a field
    fireEvent.change(fieldNameInput, { target: { value: 'testField' } });
    fireEvent.click(addButton);
    
    await waitFor(() => {
      expect(screen.getByText('testField (uint256)')).toBeInTheDocument();
    });
    
    // Remove the field
    const removeButton = screen.getByTestId('x-icon');
    fireEvent.click(removeButton);
    
    await waitFor(() => {
      expect(screen.queryByText('testField (uint256)')).not.toBeInTheDocument();
    });
  });

  it('handles different data types selection', () => {
    render(<FieldAdder />);
    
    const select = screen.getByDisplayValue('uint256');
    
    fireEvent.change(select, { target: { value: 'string' } });
    expect(select).toHaveValue('string');
    
    fireEvent.change(select, { target: { value: 'boolean' } });
    expect(select).toHaveValue('boolean');
  });

  it('creates schema when button is clicked', async () => {
    mockClient.createSchema.mockResolvedValue({ schemaId: 'test-schema-id' });
    
    render(<FieldAdder />);
    
    // Add a field first
    const fieldNameInput = screen.getByPlaceholderText('Field name');
    const addButton = screen.getByText('Add Field');
    
    fireEvent.change(fieldNameInput, { target: { value: 'testField' } });
    fireEvent.click(addButton);
    
    // Create schema
    const createSchemaButton = screen.getByText('Create Schema');
    fireEvent.click(createSchemaButton);
    
    await waitFor(() => {
      expect(mockClient.createSchema).toHaveBeenCalledWith({
        name: 'SDK Test',
        data: [{ name: 'testField', type: 'uint256' }],
      });
    });
  });

  it('handles schema creation errors', async () => {
    mockClient.createSchema.mockRejectedValue(new Error('Schema creation failed'));
    
    render(<FieldAdder />);
    
    const createSchemaButton = screen.getByText('Create Schema');
    fireEvent.click(createSchemaButton);
    
    await waitFor(() => {
      expect(screen.getByText('Failed to create schema. Please try again.')).toBeInTheDocument();
    });
  });

  it('fetches schema when schema ID is provided', async () => {
    const mockSchemaData = [
      { name: 'field1', type: 'string' },
      { name: 'field2', type: 'uint256' },
    ];
    
    mockClient.getSchema.mockResolvedValue({ data: mockSchemaData });
    
    render(<FieldAdder />);
    
    const schemaIdInput = screen.getByPlaceholderText('Schema ID');
    const fetchButton = screen.getByText('Fetch Schema');
    
    fireEvent.change(schemaIdInput, { target: { value: 'test-schema-id' } });
    fireEvent.click(fetchButton);
    
    await waitFor(() => {
      expect(mockClient.getSchema).toHaveBeenCalledWith('test-schema-id');
    });
  });

  it('handles schema fetching errors', async () => {
    mockClient.getSchema.mockRejectedValue(new Error('Schema not found'));
    
    render(<FieldAdder />);
    
    const schemaIdInput = screen.getByPlaceholderText('Schema ID');
    const fetchButton = screen.getByText('Fetch Schema');
    
    fireEvent.change(schemaIdInput, { target: { value: 'invalid-id' } });
    fireEvent.click(fetchButton);
    
    await waitFor(() => {
      expect(screen.getByText('Failed to fetch schema. Please try again.')).toBeInTheDocument();
    });
  });

  it('creates attestation with provided data', async () => {
    const mockSchemaData = [
      { name: 'field1', type: 'string' },
      { name: 'signer', type: 'address' },
    ];
    
    mockClient.getSchema.mockResolvedValue({ data: mockSchemaData });
    mockClient.createAttestation.mockResolvedValue({ attestationId: 'test-attestation' });
    
    render(<FieldAdder />);
    
    // First fetch schema
    const schemaIdInput = screen.getByPlaceholderText('Schema ID');
    const fetchButton = screen.getByText('Fetch Schema');
    
    fireEvent.change(schemaIdInput, { target: { value: 'test-schema-id' } });
    fireEvent.click(fetchButton);
    
    await waitFor(() => {
      expect(screen.getByText('field1:')).toBeInTheDocument();
      expect(screen.getByText('signer:')).toBeInTheDocument();
    });
    
    // Fill attestation data
    const field1Input = screen.getByDisplayValue('');
    fireEvent.change(field1Input, { target: { value: 'test value' } });
    
    // Create attestation
    const createAttestationButton = screen.getByText('Create Attestation');
    fireEvent.click(createAttestationButton);
    
    await waitFor(() => {
      expect(mockClient.createAttestation).toHaveBeenCalled();
    });
  });

  it('shows loading state during operations', async () => {
    mockClient.createSchema.mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve({ schemaId: 'test' }), 100))
    );
    
    render(<FieldAdder />);
    
    const createSchemaButton = screen.getByText('Create Schema');
    fireEvent.click(createSchemaButton);
    
    expect(createSchemaButton).toBeDisabled();
    
    await waitFor(() => {
      expect(createSchemaButton).not.toBeDisabled();
    });
  });
});
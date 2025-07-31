# Web3 Medical Incident Tools

A decentralized application for reporting and managing medical incidents using blockchain technology and the Sign Protocol for secure, immutable attestations on the Web3 infrastructure.

## 🚀 Features

- **Decentralized Incident Reporting**: Submit medical incident reports directly to the blockchain
- **Web3 Wallet Integration**: Connect with multiple wallets via RainbowKit
- **Schema-Based Attestations**: Create custom data schemas using Sign Protocol
- **Immutable Records**: All incident reports are stored as permanent blockchain attestations
- **Multi-Chain Support**: Built with support for Polygon Amoy and Optimism Sepolia testnets
- **Responsive UI**: Modern, mobile-friendly interface with custom typography
- **Type-Safe Development**: Full TypeScript implementation for enhanced reliability

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI framework with hooks and context
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Fast build tool and development server
- **TailwindCSS** - Utility-first CSS framework for rapid styling
- **React Router DOM** - Client-side routing and navigation
- **Lucide React** - Modern icon library

### Blockchain & Web3
- **Sign Protocol SDK** (@ethsign/sp-sdk) - Decentralized attestation infrastructure
- **Wagmi** - React hooks for Ethereum development
- **Viem** - TypeScript interface for Ethereum
- **RainbowKit** - Wallet connection interface
- **TanStack Query** - Data fetching and caching

### Development Tools
- **PostCSS** - CSS post-processing
- **ESLint** - Code linting and quality
- **Custom Fonts** - NeueMachina typography family

### Supported Networks
- Polygon Amoy Testnet
- Optimism Sepolia Testnet
- Rootstock Testnet (configured)

## 📁 Project Structure

```
web3-medical-incident-tools/
├── Incident-Report/           # Main application directory
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   └── Navbar.tsx    # Navigation with wallet connection
│   │   ├── pages/            # Application pages
│   │   │   ├── Home.tsx      # Landing page
│   │   │   └── Attestation.tsx # Schema creation and incident reporting
│   │   ├── config/           # Web3 and provider configurations
│   │   │   ├── rainbowkitConfig.ts
│   │   │   ├── wagmiProviderConfig.ts
│   │   │   └── providers.tsx
│   │   ├── lib/              # Utilities and constants
│   │   │   ├── utils/        # Helper functions and chain configs
│   │   │   ├── types/        # TypeScript type definitions
│   │   │   ├── constants/    # App constants and addresses
│   │   │   └── functions/    # Business logic functions
│   │   └── main.tsx          # Application entry point
│   ├── public/               # Static assets
│   │   └── fonts/           # Custom NeueMachina font family
│   └── package.json         # Dependencies and scripts
└── README.md
```

## 🔧 Installation & Setup

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Web3 Wallet** (MetaMask, WalletConnect compatible)
- **Testnet ETH** for transaction fees

### Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/anisharma07/web3-medical-incident-tools.git
cd web3-medical-incident-tools
```

2. **Navigate to the main application**
```bash
cd Incident-Report
```

3. **Install dependencies**
```bash
npm install
# or
yarn install
```

4. **Set up environment variables**
```bash
# Create .env file with your configuration
cp .env.example .env
# Add your private key and RPC URLs
```

5. **Start the development server**
```bash
npm run dev
# or
yarn dev
```

## 🎯 Usage

### Development
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check
```

### Connecting Your Wallet
1. Click the "Connect Wallet" button in the navigation bar
2. Select your preferred wallet (MetaMask, WalletConnect, etc.)
3. Switch to a supported testnet (Polygon Amoy or Optimism Sepolia)
4. Ensure you have testnet tokens for transaction fees

### Creating Incident Reports
1. Navigate to the attestation page (`/a`)
2. Define your incident report schema with custom fields
3. Submit the schema to create an on-chain attestation template
4. Fill out incident details using your created schema
5. Sign and submit the attestation to the blockchain

## 📱 Platform Support

- **Web Browsers**: Chrome, Firefox, Safari, Edge (desktop and mobile)
- **Wallet Support**: MetaMask, WalletConnect, Coinbase Wallet, Rainbow Wallet
- **Networks**: Polygon Amoy, Optimism Sepolia, Rootstock Testnet
- **Mobile**: Responsive design works on all mobile devices

## 🧪 Testing

Currently, the project uses a basic testing setup. To run tests:

```bash
npm test
```

*Note: Comprehensive test suite is planned for future releases*

## 🔄 Deployment

### Building for Production
```bash
npm run build
```

### Deployment Options
- **Vercel**: Connect your GitHub repo for automatic deployments
- **Netlify**: Drag and drop the `dist` folder after building
- **IPFS**: Deploy to distributed storage for true decentralization
- **Traditional Hosting**: Upload `dist` contents to any static hosting service

### Environment Configuration
Ensure the following environment variables are set:
```bash
VITE_WALLETCONNECT_PROJECT_ID=your_project_id
VITE_PRIVATE_KEY=your_private_key (for backend operations)
```

## 📊 Performance & Optimization

- **Code Splitting**: Automatic route-based code splitting with Vite
- **Tree Shaking**: Unused code elimination in production builds
- **Asset Optimization**: Automatic image and font optimization
- **Caching**: TanStack Query provides intelligent data caching
- **Bundle Size**: Optimized Web3 dependencies for minimal bundle size

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use the existing TailwindCSS classes for consistency
- Test Web3 functionality on testnets before submitting
- Ensure responsive design principles
- Document new features and API changes

### Code Style
- Use TypeScript for all new files
- Follow existing naming conventions
- Add proper error handling for Web3 operations
- Include JSDoc comments for complex functions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 SEETA

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## 🙏 Acknowledgments

- **Sign Protocol** - For providing the attestation infrastructure
- **RainbowKit Team** - For the excellent wallet connection UX
- **Wagmi Contributors** - For React hooks that make Web3 development easier
- **Vite Team** - For the lightning-fast build tool
- **TailwindCSS** - For the utility-first CSS framework

## 📞 Support & Contact

- **Repository Issues**: [GitHub Issues](https://github.com/anisharma07/web3-medical-incident-tools/issues)
- **Documentation**: Check the `/docs` folder for additional documentation
- **Community**: Join our discussions in GitHub Discussions

### Getting Help

1. Check existing GitHub issues for similar problems
2. Create a new issue with detailed reproduction steps
3. Join community discussions for general questions
4. Review the code comments for implementation details

---

**⚠️ Important Security Note**: This application is currently in development and uses testnet configurations. Do not use mainnet private keys or submit sensitive data until the security audit is complete.
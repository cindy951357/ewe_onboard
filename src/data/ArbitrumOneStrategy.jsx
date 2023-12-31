/**
(WETH-USDC.e) 0xC2fEd5466ADE44451EE20aEF6cd4cd3aB046BD71
(ARB-USDC.e) 0x085c49DE1d1f94e6846fB8Eb7b65581819A1e08b
(WETH-ARB) 0xFCb00b689fBb30848a7603312051446a7549a3aB
(WBTC-WETH) 0x72Cf5C2D4ceC7BAdf1f373D48d36e6518E40F255
(USDC-USDT) 0x3c432BBDbC780948366082bE593336C3Dd62483D
 */

export const arbitrumStrategies = [
    {
        token: "WETH-USDC.e",
        address: "0xC2fEd5466ADE44451EE20aEF6cd4cd3aB046BD71",
        priceAddresses: [
            "0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612",
            "0x50834F3163758fcC1Df9973b6e91f0F0F0434aD3"
        ],
        decimals: [18, 6],
    }, {
        token: "ARB-USDC.e",
        address: "0x085c49DE1d1f94e6846fB8Eb7b65581819A1e08b",
        priceAddresses: [
            "0xb2A824043730FE05F3DA2efaFa1CBbe83fa548D6",
            "0x50834F3163758fcC1Df9973b6e91f0F0F0434aD3"
        ],
        decimals: [18, 6],
    }, {
        token: "WETH-ARB",
        address: "0xFCb00b689fBb30848a7603312051446a7549a3aB",
        priceAddresses: [
            "0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612",
            "0xb2A824043730FE05F3DA2efaFa1CBbe83fa548D6"
        ],
        decimals: [18, 18],
    }, {
        token: "WBTC-WETH",
        address: "0x72Cf5C2D4ceC7BAdf1f373D48d36e6518E40F255",
        priceAddresses: [
            "0xd0C7101eACbB49F3deCcCc166d238410D6D46d57",
            "0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612"
        ],
        decimals: [8, 18],
    }, {
        token: "USDC-USDT",
        address: "0x3c432BBDbC780948366082bE593336C3Dd62483D",
        priceAddresses: [
            "0x50834F3163758fcC1Df9973b6e91f0F0F0434aD3",
            "0x3f3f5dF88dC9F13eac63DF89EC16ef6e7E25DdE7"
        ],
        decimals: [6, 6],
    }
]
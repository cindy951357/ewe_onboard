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
        priceAddress: "0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612",
        priceAddresses: [
            "0x62CAe0FA2da220f43a51F86Db2EDb36DcA9A5A08 ",
            "0x1692Bdd32F31b831caAc1b0c9fAF68613682813b"
        ]
    }, {
        token: "ARB-USDC.e",
        address: "0x085c49DE1d1f94e6846fB8Eb7b65581819A1e08b",
        priceAddress: "0xb2A824043730FE05F3DA2efaFa1CBbe83fa548D6",
        priceAddresses: [
            "",
            ""
        ]
    }, {
        token: "WETH-ARB",
        address: "0xFCb00b689fBb30848a7603312051446a7549a3aB",
        priceAddress: "",
        priceAddresses: [
            "",
            ""
        ]
    }, {
        token: "WBTC-WETH",
        address: "0x72Cf5C2D4ceC7BAdf1f373D48d36e6518E40F255",
        priceAddress: "0xc5a90A6d7e4Af242dA238FFe279e9f2BA0c64B2e",
        priceAddresses: [
            "",
            ""
        ]
    }, {
        token: "USDC-USDT",
        address: "0x3c432BBDbC780948366082bE593336C3Dd62483D",
        priceAddress: "0x50834F3163758fcC1Df9973b6e91f0F0F0434aD3",
        priceAddresses: [
            "",
            ""
        ]
    }
]
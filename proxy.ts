import { paymentProxyFromConfig } from "@x402/next";
import { HTTPFacilitatorClient } from "@x402/core/server";
import { ExactEvmScheme } from "@x402/evm/exact/server";
import { NextRequest } from "next/server";

const evmPayeeAddress = "0xc76392342e2fc5af82039d85e3f7a8a1105b3bce" as `0x${string}`;
const facilitatorUrl = process.env.FACILITATOR_URL || "https://x402.org/facilitator";
const EVM_NETWORK = "eip155:8453" as const;

const facilitatorClient = new HTTPFacilitatorClient({ url: facilitatorUrl });

const x402PaymentProxy = paymentProxyFromConfig(
  {
    "/api/price": {
      accepts: [
        { payTo: evmPayeeAddress, scheme: "exact", price: "$0.01", network: EVM_NETWORK },
      ],
      description: "Price check - 1 cent USDC on Base",
    },
  },
  facilitatorClient,
  [
    { network: EVM_NETWORK, server: new ExactEvmScheme() },
  ]
);

export const proxy = async (req: NextRequest) => {
  if (req.nextUrl.pathname.startsWith("/api/price")) {
    return (x402PaymentProxy as any)(req);
  }
  return undefined;
};

export const config = {
  matcher: ["/api/price/:path*"],
};

import { env } from "@/env.mjs";

export const pricingData = [
  {
    id: 1,
    productId: env.NEXT_PUBLIC_CREEM_ONETIME_MIN,
    price: 9.9,
    quantity: 100,
  },
  {
    id: 2,
    productId: env.NEXT_PUBLIC_CREEM_ONETIME_MED,
    price: 24.9,
    quantity: 300,
  },
  {
    id: 3,
    productId: env.NEXT_PUBLIC_CREEM_ONETIME_MAX,
    price: 46.9,
    quantity: 600,
  },
];

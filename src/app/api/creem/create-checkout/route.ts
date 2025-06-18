import { NextResponse } from "next/server";
import { CreemService } from "@/lib/creem";
import { createCheckoutSession } from "@/supabase/checkout_sessions";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { productId, discountCode, successUrl } = body;

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const creemService = CreemService.getInstance();
    const checkoutSession = await creemService.createCheckoutSession({
      product_id: productId,
      discount_code: discountCode,
      success_url: successUrl,
    });

    await createCheckoutSession({
      checkoutId: checkoutSession.id,
      userId: session.user.id,
      sessionType: "ONE_TIME",
      productId: productId,
      amount: 0, // 暂时设置为0，因为Creem API没有返回金额
      successRedirectUrl: checkoutSession.success_url,
    });

    return NextResponse.json(checkoutSession);
  } catch (error) {
    console.error("Payment error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const customerId = searchParams.get("customerId");

    if (!customerId) {
      return NextResponse.json({ error: "Customer ID is required" }, { status: 400 });
    }

    const creemService = CreemService.getInstance();
    const billingPortalSession = await creemService.createBillingPortalSession({
      customer_id: customerId,
    });

    return NextResponse.json(billingPortalSession);
  } catch (error) {
    console.error("Billing portal error:", error);
    return NextResponse.json(
      { error: "Failed to create billing portal session" },
      { status: 500 }
    );
  }
} 
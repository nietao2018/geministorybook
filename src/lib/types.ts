export interface CreateCheckoutSessionParams {
    id: string;
    product_id: string;
    request_id?: string;
    discount_code?: string;
    customer?: {
        id?: string;
        email?: string;
    };
    custom_field?: Array<{
        name: string;
        type: string;
        required?: boolean;
    }>;
    success_url?: string;
    metadata?: Record<string, any>[];
}

export interface CheckoutSession {
    product_id: string;
    success_url: string;
    discount_code: string,

}

export interface Customer {
    id: string;
    email: string;
}

export interface GetCustomerParams {
    customer_id?: string;
    email?: string;
}

export interface GetSubscriptionParams {
    subscription_id: string;
}

export interface Subscription {
    id: string;
    status: string;
}

export interface CancelSubscriptionParams {
    id: string;
}

export interface RedirectParams {
    checkout_id: string;
    order_id: string;
    customer_id: string;
    subscription_id: string;
    product_id: string;
}

export interface ValidateLicenseParams {
    key: string;
    instance_id: string;
}

export interface LicenseValidation {
    valid: boolean;
}

export interface ActivateLicenseParams {
    key: string;
    instance_name: string;
}

export interface LicenseActivation {
    instance_id: string;
}

export interface DeactivateLicenseParams {
    key: string;
    instance_id: string;
}

export interface LicenseDeactivation {
    success: boolean;
}

export interface Product {
    id: string;
    name: string;
    price: number;
    currency: string;
}

export interface CreateProductParams {
    name: string;
    price: number;
    currency: string;
    billing_type: string;
    description?: string;
}

export interface ProductSearchParams {
    page_number?: number;
    page_size?: number;
}

export interface ProductListResponse {
    products: Product[];
    total: number;
}

export interface CreateDiscountParams {
    name: string;
    type: 'percentage' | 'fixed';
    amount: number;
    duration: 'forever' | 'once' | 'repeating';
    code?: string;
    currency?: string;
    percentage?: number;
    expiry_date?: string;
    max_redemptions?: number;
    duration_in_months?: number;
    applies_to_products?: string[];
}

export interface DiscountCode {
    id: string;
    code: string;
}

export interface TransactionSearchParams {
    customer_id?: string;
    page_number?: number;
    page_size?: number;
}

export interface TransactionListResponse {
    transactions: any[];
    total: number;
}

export interface CreateBillingPortalSessionParams {
    customer_id: string;
}

export interface BillingPortalSession {
    customer_portal_link: string;
} 
import axios from 'axios';
import { env } from "@/env.mjs";
import {
    CreateCheckoutSessionParams,
    CheckoutSession,
    Customer,
    GetCustomerParams,
    GetSubscriptionParams,
    Subscription,
    CancelSubscriptionParams,
    RedirectParams,
    ValidateLicenseParams,
    LicenseValidation,
    ActivateLicenseParams,
    LicenseActivation,
    DeactivateLicenseParams,
    LicenseDeactivation,
    Product,
    CreateProductParams,
    ProductSearchParams,
    ProductListResponse,
    CreateDiscountParams,
    DiscountCode,
    TransactionSearchParams,
    TransactionListResponse,
    CreateBillingPortalSessionParams,
    BillingPortalSession
} from './types';

export class CreemService {
    private static instance: CreemService;
    private client: any;

    private constructor() {
        this.client = axios.create({
            baseURL: env.CREEM_API_URL,
            headers: {
                'x-api-key': `${env.CREEM_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
    }

    public static getInstance(): CreemService {
        if (!CreemService.instance) {
            CreemService.instance = new CreemService();
        }
        return CreemService.instance;
    }

    async createCheckoutSession(params: CheckoutSession): Promise<CreateCheckoutSessionParams> {
        try {
            const response = await this.client.post('/v1/checkouts', params);
            return response.data;
        } catch (error) {
            throw new Error('Failed to create checkout session');
        }
    }

    async getCustomer(params: GetCustomerParams): Promise<Customer> {
        try {
            const response = await this.client.get('/customers', { params });
            return response.data;
        } catch (error) {
            throw new Error('Failed to get customer');
        }
    }

    async getSubscription(params: GetSubscriptionParams): Promise<Subscription> {
        try {
            const response = await this.client.get(`/subscriptions/${params.subscription_id}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to get subscription');
        }
    }

    async cancelSubscription(params: CancelSubscriptionParams): Promise<void> {
        try {
            await this.client.post(`/subscriptions/${params.id}/cancel`);
        } catch (error) {
            throw new Error('Failed to cancel subscription');
        }
    }

    async validateLicense(params: ValidateLicenseParams): Promise<LicenseValidation> {
        try {
            const response = await this.client.post('/licenses/validate', params);
            return response.data;
        } catch (error) {
            throw new Error('Failed to validate license');
        }
    }

    async activateLicense(params: ActivateLicenseParams): Promise<LicenseActivation> {
        try {
            const response = await this.client.post('/licenses/activate', params);
            return response.data;
        } catch (error) {
            throw new Error('Failed to activate license');
        }
    }

    async deactivateLicense(params: DeactivateLicenseParams): Promise<LicenseDeactivation> {
        try {
            const response = await this.client.post('/licenses/deactivate', params);
            return response.data;
        } catch (error) {
            throw new Error('Failed to deactivate license');
        }
    }

    async createProduct(params: CreateProductParams): Promise<Product> {
        try {
            const response = await this.client.post('/products', params);
            return response.data;
        } catch (error) {
            throw new Error('Failed to create product');
        }
    }

    async searchProducts(params: ProductSearchParams): Promise<ProductListResponse> {
        try {
            const response = await this.client.get('/products', { params });
            return response.data;
        } catch (error) {
            throw new Error('Failed to search products');
        }
    }

    async createDiscountCode(params: CreateDiscountParams): Promise<DiscountCode> {
        try {
            const response = await this.client.post('/discount-codes', params);
            return response.data;
        } catch (error) {
            throw new Error('Failed to create discount code');
        }
    }

    async searchTransactions(params: TransactionSearchParams): Promise<TransactionListResponse> {
        try {
            const response = await this.client.get('/transactions', { params });
            return response.data;
        } catch (error) {
            throw new Error('Failed to search transactions');
        }
    }

    async createBillingPortalSession(params: CreateBillingPortalSessionParams): Promise<BillingPortalSession> {
        try {
            const response = await this.client.post('/billing-portal/sessions', params);
            return response.data;
        } catch (error) {
            throw new Error('Failed to create billing portal session');
        }
    }
}
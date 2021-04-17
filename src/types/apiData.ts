export type AuthorInfo = {
  description: string
  photo_url: string
}

export type CancelSubscription = {
  subscriptionId: string
}

export type CreateStripeCustomerPayload = {
  email: string
}

export type CreateStripeSubscription = {
  customerId: string
  paymentMethodId: string
  priceId: string
}

export type RetryCreateStripeSubscription = {
  customerId: string
  paymentMethodId: string
  invoiceId: string
  priceId: string
}

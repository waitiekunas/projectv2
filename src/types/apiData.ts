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

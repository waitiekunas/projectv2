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

export type RegisterView = {
  customerId: string
  authorId: string
  date: Date
}

export type AuthorLessonsListReq = {
  authorId: string
}

export type AuthorLessonsInfo = {
  id: string
  lesson_name: string
}

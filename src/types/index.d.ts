export {}

declare module "*.png" {
  const value: any
  export = value
}
declare module "*.jpg" {
  const value: any
  export = value
}
declare module "*.json" {
  const value: any
  export = value
}
declare global {
  interface Window {
    gtag: (event: string, action: string, data: {}) => void
  }
}

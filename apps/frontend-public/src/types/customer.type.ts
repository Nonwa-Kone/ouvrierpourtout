export type tCustomer = {
  _id?: string
  firstName?: string
  lastName?: string
  phoneNumber?: string
  address?: tAdresse
  gender?: string
  email?: string
}

export type tAdresse = {
  country?: string
  city?: string
  municipality?: string
  street?: string
  zipCode?: string
}

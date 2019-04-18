import { validateEmail } from '../utils'

export const shippingValidation = values => {
  const errors = {}

  if (!values.shipping_address || !values.shipping_address.first_name) {
    if (!errors.shipping_address) {
      errors.shipping_address = {}
    }

    errors.shipping_address.first_name = 'Required'
  }

  if (!values.shipping_address || !values.shipping_address.last_name) {
    if (!errors.shipping_address) {
      errors.shipping_address = {}
    }

    errors.shipping_address.last_name = 'Required'
  }

  if (!values.shipping_address || !values.shipping_address.line_1) {
    if (!errors.shipping_address) {
      errors.shipping_address = {}
    }

    errors.shipping_address.line_1 = 'Required'
  }

  if (!values.shipping_address || !values.shipping_address.city) {
    if (!errors.shipping_address) {
      errors.shipping_address = {}
    }

    errors.shipping_address.city = 'Required'
  }

  if (!values.shipping_address || !values.shipping_address.county) {
    if (!errors.shipping_address) {
      errors.shipping_address = {}
    }

    errors.shipping_address.county = 'Required'
  }

  if (!values.shipping_address || !values.shipping_address.postcode) {
    if (!errors.shipping_address) {
      errors.shipping_address = {}
    }

    errors.shipping_address.postcode = 'Required'
  }

  if (!values.shipping_address || !values.shipping_address.country) {
    if (!errors.shipping_address) {
      errors.shipping_address = {}
    }

    errors.shipping_address.country = 'Required'
  }

  return errors
}

export const billingValidation = values => {
  const errors = {}

  if (!values.billingIsShipping) {
    if (!values.billing_address || !values.billing_address.first_name) {
      if (!errors.billing_address) {
        errors.billing_address = {}
      }

      errors.billing_address.first_name = 'Required'
    }

    if (!values.billing_address || !values.billing_address.last_name) {
      if (!errors.billing_address) {
        errors.billing_address = {}
      }

      errors.billing_address.last_name = 'Required'
    }

    if (!values.billing_address || !values.billing_address.line_1) {
      if (!errors.billing_address) {
        errors.billing_address = {}
      }

      errors.billing_address.line_1 = 'Required'
    }

    if (!values.billing_address || !values.billing_address.city) {
      if (!errors.billing_address) {
        errors.billing_address = {}
      }

      errors.billing_address.city = 'Required'
    }

    if (!values.billing_address || !values.billing_address.county) {
      if (!errors.billing_address) {
        errors.billing_address = {}
      }

      errors.billing_address.county = 'Required'
    }

    if (!values.billing_address || !values.billing_address.postcode) {
      if (!errors.billing_address) {
        errors.billing_address = {}
      }

      errors.billing_address.postcode = 'Required'
    }

    if (!values.billing_address || !values.billing_address.country) {
      if (!errors.billing_address) {
        errors.billing_address = {}
      }

      errors.billing_address.country = 'Required'
    }
  }

  // if (!values.customer || !values.customer.name) {
  //   if (!errors.customer) {
  //     errors.customer = {}
  //   }

  //   errors.customer.name = 'Required'
  // }

  if (!values.customer || !values.customer.email) {
    if (!errors.customer) {
      errors.customer = {}
    }

    errors.customer.email = 'Required'
  }

  if (
    values.customer &&
    values.customer.email &&
    !validateEmail(values.customer.email)
  ) {
    if (!errors.customer) {
      errors.customer = {}
    }

    errors.customer.email = 'Invalid email'
  }

  if (
    values.createCustomer &&
    (!values.customer || !values.customer.password)
  ) {
    if (!errors.customer) {
      errors.customer = {}
    }

    errors.customer.password = 'Required'
  }

  if (!values.stripe || !values.stripe.complete) {
    if (!errors.stripe) {
      errors.stripe = {}
    }

    errors.stripe.complete = 'Required'
  }

  console.log(errors)

  return errors
}

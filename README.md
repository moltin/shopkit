# Moltin Embeddable Cart + Checkout

> A buy button, a cart, a checkout, a customer login. All without writing a single line of JavaScript!

[Read more about Shopkit](https://www.moltin.com/commerce-solutions/embeddable-cart)

## User Install

1. Login to your [Moltin Dashboard](https://dashboard.moltin.com) and select your store
2. Take note of your `client_id`
3. Enable Stripe as a payment gateway (add your secret key as "login")

## Contributing

1. Clone repo
2. Use `yarn` to install dependencies
3. Run `yarn dev` and webpack will open `example/index.html`

The example playground uses the `demo.moltin.com` API keys.

## Publishing

Shopkit versioning is based on semver and the angular commit convention. Releasing is automatically triggered by semantic-release.

We should recommend users use the specific version `unpkg` url, e.g. `https://unpkg.com/@moltin/shopkit@1.0.0/index.js`.

You can optionally deploy to `btn.moltin.com` which should be used for those wanting to develop on master. You can deploy by running `yarn deploy`.

# Moltin Embeddable Cart + Checkout

> A buy button, a cart, a checkout, a customer login. All without writing a single line of JavaScript!

[Read more about Shopkit](https://www.moltin.com/commerce-solutions/embeddable-cart)

## Installation

You can use Shopkit anywhere you can insert custom HTML.

### Step 1

First, you'll need to enable Stripe as a payment gateway via the [Dashboard UI](https://dashboard.moltin.com/app/settings/gateways/stripe) or [API](https://docs.moltin.com/api/payments/gateways/configure-stripe) directly.

You'll find your Stripe `publishable key` and `secret key` via the [Stripe Dashboard](https://dashboard.stripe.com).

**Shopkit only works with Stripe during BETA.**

### Step 2

Add the following snippet before the `</body>` tag on your website to enable Shopkit. You'll want to populate your Moltin `client id` and Stripe `publishable key` here.

```html
<script
  src="https://btn.moltin.com"
  data-moltin-client-id="..."
  data-moltin-stripe-publishable-key="..."
></script>
```

### Step 3

Add a Cart button with the following code:

```html
<span class="moltin-cart-button"></span>
```

You can change the buttons behaviour with additional properties.

### Step 4

Add a Buy button with the following code:

```html
<span class="moltin-buy-button" data-moltin-product-id="..."></span>
```

You can change the buttons behaviour with additional properties. You can also use the button with a custom product outside of Moltin.

## Buy Button

You can add as many Buttons to your website as you like. All you need is:

```html
<span class="moltin-cart-button" data-moltin-product-id="..."></span>
```

### Text

The default text for a button is `Add to Cart`. You can change the default text by providing a `data-moltin-text="Add to Basket"` attribute to your button.

#### Example

```html
<span
  class="moltin-buy-button"
  data-moltin-product-id="..."
  data-moltin-text="Add to Basket"
></span>
```

### Open cart on click

The default behaviour when clicking on a button is to silently add the items to the cart and update the cart button total.

You can automatically open the cart once an item has been added by providing a `data-moltin-open-cart="true"` attribute to your button.

#### Example

```html
<span
  class="moltin-buy-button"
  data-moltin-product-id="..."
  data-moltin-open-cart="true"
></span>
```

### Custom item

You can add custom items to the cart that don't belong inside your Moltin catalog.

Simply omit the `data-moltin-product-id` attribute and add all of the following attributes:

```html
<span
  class="moltin-buy-button"
  data-moltin-type="custom"
  data-moltin-product-name="T-Shirt"
  data-moltin-product-sku="unique-sku-here"
  data-moltin-product-price="1000"
></span>
```

## Cart button

You can add as many cart buttons to your page. All you need is:

```html
<span class="moltin-cart-button"></span>
```

### Text

The default text for a cart button is `Cart`. You can change the default text by providing a `data-moltin-text="Basket"` attribute to your button.

#### Example

```html
<span class="moltin-cart-button" data-moltin-text="Basket"></span>
```

### Show total

By default the cart button shows the number of items in the cart alongside the text defined above. You can change this behaviour by providing a `data-moltin-show-total="true"` attribute to your button.

#### Example

```html
<span class="moltin-cart-button" data-moltin-show-total="true"></span>
```

## Global configuration

### Override styles

By default Shopkit ships with a blue theme. You can change the colours by overriding the CSS classes.
Somewhere in your `<head>` you will want to add the following:

```html
<style>
  .shopkit-primary {
    background: orange !important;
  }
  .shopkit-primary-text {
    color: orange !important;
  }
</style>
```

## Contributing

1. Clone repo
2. Use `yarn` to install dependencies
3. Run `yarn dev` and webpack will open `example/index.html`

The example playground uses the `demo.moltin.com` API keys.

## Publishing

Shopkit versioning is based on semver and the angular commit convention. Releasing is automatically triggered by semantic-release.

We should recommend users use the specific version `unpkg` url, e.g. `https://unpkg.com/@moltin/shopkit@1.0.0/index.js`.

You can optionally deploy to `btn.moltin.com` which should be used for those wanting to develop on master. You can deploy by running `yarn deploy`.

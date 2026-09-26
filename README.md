# Order Tracker Plus

TASK 1 — ORDER TRACKING SCREEN ⭐

Design and implement a modern, professional mobile Order Tracking screen for an e-commerce application.

The current application only displays:
- Processing
- Shipped
- Out for Delivery
- Delivered

Users report that the current status is difficult to understand. Redesign and implement the experience so delivery status is clear at a glance.

Requirements:
- Clear visual delivery progress/timeline
- Current order status
- Estimated delivery date/time
- Order/product summary
- Clear way to contact support
- Appropriate loading/empty/error states where relevant
- Responsive design for approximately 360–430px mobile widths
- Clean spacing, typography, hierarchy, and visual consistency
- Meaningful interactions such as viewing order details, contacting support, or reporting a delivery issue

The UI must handle all three situations:

1. Delayed Order — the estimated delivery time has passed or the order is significantly delayed. Clearly communicate the delay and provide an appropriate next step.

2. Delivered but Not Received — the system says the order was delivered, but the customer reports they did not receive it. Provide an appropriate next step or support action.

3. Tracking Not Available Yet — the order exists, but tracking information is not available yet. Avoid an empty or broken-looking screen.

Show how the same product experience adapts to all three states.

Technical requirements are flexible: React.js  frontend framework; CSS / Tailwind / CSS Modules / another styling approach; any reasonable UI/icon library. Backend integration is not required — mock/static data is acceptable.

=

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/7c45229c-9614-4bc4-9280-e9035ac07375).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

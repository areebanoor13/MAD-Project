# Match & Merge Shopping App

React Native JavaScript shopping app built with Expo, based on the supplied 22-screen design export.

## Run in VS Code

1. Install Node.js 20.19.4 LTS or newer.
2. Open this folder in VS Code.
3. In the integrated terminal, run:

   ```bash
   npm install
   npm start
   ```

4. Open Expo Go on your phone and scan the QR code, or start an Android emulator and press `a`.

## Main folders

- `App.js` — app entry, fonts, providers, and navigation root.
- `frontend/screens/` — app screens.
- `frontend/components/` — reusable UI components.
- `frontend/navigation/` — Drawer, Stack, and bottom-tab navigators.
- `frontend/context/` — in-memory account, wishlist, and cart state.
- `frontend/data/` — local catalog and category data.
- `frontend/services/` — Fake Store API and product mapping.
- `frontend/styles/` — shared colors, typography, and global styles.
- `assets/images/` — logo icon and the supplied design-export photos.

## Notes

- The API collection is a separate item in the Drawer and fetches live products from `https://fakestoreapi.com/products`. Makeup opens its own local catalogue, not the API screen.
- The Categories tab always opens the three-card Clothes / Makeup / Accessories overview. Clothes and Accessories open Male / Female choices before their product subcategories.
- The API returns USD prices; this class demo displays an approximate PKR price using a fixed rate of Rs. 280 per USD. This is not a live exchange rate.
- Authentication is a demo flow, not a backend account system. The demo saves the profile email, cart, and wishlist locally on the device with AsyncStorage; it does not sync to a server.
- The checkout is a demonstration. It does not collect card details, charge a payment method, or create a real delivery order.
- Sign in is required before an item can be added to the cart or checkout can be opened. Authentication is a local demo flow, not a backend account system; the password field is not stored or verified by a server. The newsletter form is a visual demo and does not save addresses or send email.
- The cart applies a 20% discount only when its subtotal is greater than Rs. 1,200. Exactly Rs. 1,200 does not qualify.
- The campaign banner and checkout copy show an offer end date of 20 October.

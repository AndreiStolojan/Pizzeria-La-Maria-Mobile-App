# Pizzeria La Maria Mobile App

A React Native mobile application prototype for a restaurant ordering and reservation experience. The app includes menu browsing, cart management, user authentication, reservations, profile data, and QR-based loyalty points.

## Features

- Mobile navigation with stack and bottom tab flows
- Menu category screens for restaurant products
- Cart state management with Redux Toolkit
- Order confirmation flow
- User login and sign-up with Firebase Authentication
- Reservation form with local persistence through AsyncStorage
- Profile screen backed by Firebase data
- QR scanner for loyalty point updates
- Firebase Firestore integration
- Expo camera, image, location, and font integrations

## Tech Stack

- React Native
- Expo
- React Navigation
- Redux Toolkit
- Firebase Authentication
- Cloud Firestore
- Firebase Storage
- AsyncStorage
- Expo Camera
- Expo Location
- JavaScript

## Project Type

Production-style portfolio project.

This project models a real restaurant mobile app workflow, but it should be treated as a prototype. It demonstrates mobile UI, navigation, authentication, local state, and Firebase integration rather than a fully released production app.

## Getting Started

Install dependencies:

```bash
npm install
```

Start the Expo development server:

```bash
npm start
```

Run on Android:

```bash
npm run android
```

Run on iOS:

```bash
npm run ios
```

Run on web:

```bash
npm run web
```

## Environment Variables

Firebase configuration is loaded from environment variables through `react-native-dotenv`.

Create a local environment file with values for:

```text
FIREBASE_API_KEY
FIREBASE_AUTH_DOMAIN
FIREBASE_PROJECT_ID
FIREBASE_STORAGE_BUCKET
FIREBASE_MESSAGING_SENDER_ID
FIREBASE_APP_ID
```

## Notes

The repository includes generated iOS build files. For long-term maintenance, these should usually be excluded from version control and regenerated locally when needed.

Before production use, the app would need stricter validation, security rule review, payment/order backend integration, automated tests, and release configuration.

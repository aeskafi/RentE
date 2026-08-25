# RentE - Premium Car Rental & Fleet Discovery Platform

Welcome to **RentE**, a modern, responsive, and production-grade Car Rental & Fleet Discovery platform. Built using Next.js (App Router), Tailwind CSS (v4), TypeScript, and Leaflet Maps, this project presents an integrated SaaS ecosystem that bridges physical rental offices (Hubs) and pickup-ready individual listings under a single cobalt-blue design identity.

🎥 **Featured on YouTube**: Check out the walk-throughs and design reviews on my YouTube channel: **[WalkCookLive](https://www.youtube.com/@walkcooklive)**.

---

## 📖 Table of Contents
1. [Project Overview](#-project-overview)
2. [Core Features](#-core-features)
3. [Original Design Prompt & Objective](#-original-design-prompt--objective)
4. [Visual Inspirations](#-visual-inspirations)
5. [Technical Challenges Solved](#-technical-challenges-solved)
6. [Next Development Stages](#-next-development-stages)
7. [Local Setup Instructions](#-local-setup-instructions)

---

## 🌟 Project Overview
RentE provides renters with an instant vehicle discovery interface and offers rental companies and private hosts a comprehensive admin telemetry board. The design is heavily inspired by high-end, clean design standards featuring royal cobalt blue accents, slate neutrals, soft border layers, and instant smooth dark/light mode transitions.

---

## ⚡ Core Features
* **Unified Global Navigation & Dropdowns**: Public pages feature a persistent, blurred glass header with a smooth light/dark mode toggle, interactive notifications drawer (unread statuses, mark-all-read), and user portal links.
* **Responsive Search List Grid**: Replicates visual grid listings with comprehensive left-sidebar filters (car brand, price ranges, year, transmission, fuel type, seat capacity).
* **Dual-Layer Interactive Map Discovery**: Dynamically loads a Leaflet Map interface featuring custom cobalt blue price tags for individual cars and distinct hub office markers.
* **Stateful Telemetry Admin Dashboard**: A complete operator workspace containing:
  * **Dashboard**: Utilization graphs, transaction logs, and live tracking snippets.
  * **Listing**: Complete fleet inventory management with a mock form to dynamically add vehicles.
  * **Calendar**: A Gantt-style booking timeline showing weekly reservations.
  * **Tracking**: Full-screen live location telemetry.
  * **Statistics**: Revenue growth metrics (+12.5%) and category demand share charts.
  * **Transaction**: Comprehensive invoice ledgers.

---

## 📝 Original Design Prompt & Objective
The platform was built following this core design brief:

```text
Act as a Senior Principal Product Designer and Lead Full-Stack Frontend Engineer specializing in Next.js (App Router), Tailwind CSS, TypeScript, and modern Map-based interfaces.

### OBJECTIVE
I want you to analyze the reference images and UI/UX inspirations located in:
`[ABSOLUTE_PATH_TO_YOUR_DESKTOP_FOLDER]`

Based on that visual audit, design and implement a complete, production-grade, and testable responsive UI/UX for a Car Rental & Fleet Discovery Platform with seamless mobile-first responsiveness.

---

### CORE BUSINESS DOMAIN & KEY FEATURES
1. **Interactive Dual-Layer Map Discovery**:
   - **Pickup Ready Vehicles**: Dynamic markers for available cars with real-time popup previews (model, pricing, distance, instant booking trigger).
   - **Permanent Rental Hubs / Offices (Free Listing Benefit)**: Distinct, persistent markers for physical rental agencies/offices across the city, allowing local business discovery and direct office booking.
   - **Filter & Search Bar**: Floating/docked search with date/time pickers, car types (EV, SUV, Sedan, Luxury), pickup radius, and hub-vs-individual filters.
2. **Detail & Booking Flow**:
   - Vehicle detail drawer/modal with high-res gallery, specs, deposit info, and pickup location directions.
   - Rental Hub public profile page (showcasing their entire on-site fleet and contact details).
3. **Mobile-First Responsive Layout**:
   - Desktop: Side-by-side or split layout (interactive map on the right/center, collapsible list/filters on the left).
   - Mobile/Tablet: Fullscreen interactive map with bottom-sheet drawer (swipeable cards for nearby cars/hubs), floating action buttons, and a clean mobile navigation bar.

---

### EXECUTION STEPS
1. **Visual Audit**:
   - Scan all image files in the provided path.
   - Extract the design system: Color palette (Primary, Secondary, Accent, Neutral shades), Typography scale, Border radiuses, Shadow elevations, and Component styling patterns.
2. **Architecture & Project Setup**:
   - Structure a clean Next.js App Router project structure (`/app`, `/components/ui`, `/components/map`, `/components/cards`, `/hooks`, `/types`, `/lib`).
   - Setup Tailwind config reflecting the extracted design tokens.
3. **Component Implementation**:
   - Implement map integration (using React-Leaflet or Mapbox GL with custom markers and clustering).
   - Create fully interactive mock states (filtering, selecting a vehicle, viewing a hub, responsive bottom sheets, and tab switching).
   - Include clear TypeScript definitions and realistic mock data (at least 10+ vehicles across multiple rental hubs).

Please start by summarizing the visual guidelines you extracted from the folder, and then proceed directly into building and organizing the codebase.
```

---

## 🎨 Visual Inspirations
The mockups and visual guidelines used to design the layout structure are stored in the repository:
* `assets/main.webp` — public home landing page structure.
* `assets/search-carlist-without-map.webp` — grid search and filter sidebar layout.
* `assets/original-67a1f791d663f6808c8f2c3bab916dae.webp` — colors and UI specifications.
* `assets/admin-dashboard.webp` — administrator telemetry dashboard.

---

## 🛠️ Technical Challenges Solved

During the implementation process, several critical technical issues were analyzed and resolved:
1. **Next.js SSR vs. Leaflet Client-Only Imports**:
   * *Problem*: Leaflet queries window and document variables immediately upon import, breaking standard Next.js Server-Side Rendering (SSR).
   * *Solution*: Created a dynamic import wrapper in `components/map/index.tsx` using `next/dynamic` with `{ ssr: false }` to defer mapping scripts to client hydration.
2. **Tailwind CSS v4 Class-Based Dark Mode**:
   * *Problem*: Tailwind v4 defaults dark mode exclusively to the `prefers-color-scheme` media query, ignoring custom JavaScript click toggles.
   * *Solution*: Declared a custom class variant `@variant dark (&:where(.dark, .dark *))` in `app/globals.css`, binding dark tokens to standard CSS custom properties.
3. **TypeScript Type Literal Assertion in Forms**:
   * *Problem*: Dynamically added form values (like `'Sedan'`, `'Automatic'`, `'Electric'`) compile as generic strings rather than strict literal unions, throwing TS2322 errors.
   * *Solution*: Applied `as const` type assertions to inline object models to enforce compile-time safety.
4. **Constrained Sidebar Input Overflows**:
   * *Problem*: Squeezing search inputs and date fields horizontally inside a fixed `w-[440px]` map sidebar led to horizontal layout breaks.
   * *Solution*: Re-structured input containers to stack vertically and split dates into a clean `grid-cols-2` configuration.

---

## 🚀 Next Development Stages
1. **Real-time Telemetry Updates**: Connect the simulated admin tracking coordinates to a WebSocket server to push real-time car coordinates.
2. **Stripe Payment Gateways**: Integrate checkout buttons on card actions to trigger real payment capture flows.
3. **Database Integration**: Bind state triggers to a backend database (e.g. PostgreSQL/Prisma) to persist new vehicle registries.

---

## 💻 Local Setup Instructions

Ensure you have [Node.js](https://nodejs.org/) installed, then follow these steps:

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application.

3. **Production Compilation**:
   ```bash
   npm run build
   ```

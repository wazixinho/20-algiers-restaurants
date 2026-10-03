# Algiers Premier 20 Gastronomic Applications Suite

A production-ready suite of 20 standalone, bespoke web applications built for the most culturally notable, historic, and highly rated restaurants across Algiers, Algeria.

---

## 🏛️ Restaurant Directory & App Matrix

| # | Slug (`id`) | Restaurant Name | Cuisine & Aesthetic | Location |
|---|---|---|---|---|
| 1 | `el-djenina` | [Restaurant El Djenina](file:///apps/el-djenina) | Traditional Algerian, Ottoman-Maghrebi Palace | Sidi M'Hamed / Telemly |
| 2 | `le-bardo` | [Restaurant Le Bardo](file:///apps/le-bardo) | Contemporary Algerian, Chic Intimate | Alger-Centre (Bardo) |
| 3 | `le-dauphin` | [Restaurant Le Dauphin](file:///apps/le-dauphin) | Mediterranean Seafood, Maritime Heritage | Port d'Alger (La Pêcherie) |
| 4 | `le-tantra` | [Restaurant Le Tantra](file:///apps/le-tantra) | French Haute Cuisine, Glamorous Lounge Terrace | Bois des Arcades, El Madania |
| 5 | `le-caracoya` | [Restaurant Le Caracoya](file:///apps/le-caracoya) | Classic French, Historic Art-Nouveau Fountain Patio | Alger-Centre (Rue de Pierre) |
| 6 | `al-boustan` | [Restaurant Al Boustan](file:///apps/al-boustan) | Authentic Lebanese, Panoramic Bay & Cedar Woods | Bois des Arcades, El Madania |
| 7 | `sfindja` | [Restaurant Sfindja](file:///apps/sfindja) | Contemporary Mediterranean, Zen Terrace Bistro | El Biar (Chemin Sfindja) |
| 8 | `chez-sauveur` | [Restaurant Chez Sauveur](file:///apps/chez-sauveur) | Historic Maritime Seafood since 1960 | Port El Djamila (La Madrague) |
| 9 | `la-scala` | [Restaurant La Scala](file:///apps/la-scala) | French Fine Dining, Operatic Luxury | El Biar (Val d'Hydra) |
| 10 | `dar-zellige` | [Restaurant Dar Zellige](file:///apps/dar-zellige) | Traditional Algerian, Poolside Andalusian Palace | Hydra (Djenane El Malik) |
| 11 | `dar-yemma-casbah` | [Restaurant Dar Yemma Casbah](file:///apps/dar-yemma-casbah) | Casbah Ancestral Cuisine, Maternal Heritage | UNESCO Casbah of Algiers |
| 12 | `la-palmeraie` | [Restaurant La Palmeraie](file:///apps/la-palmeraie) | Maghrebi & Andalusian, Oriental Oasis Riad | Dely Ibrahim (Aïn Allah) |
| 13 | `le-normand` | [Restaurant Le Normand](file:///apps/le-normand) | French Terroir & Game, Vintage Wood-Paneled Bistro | Alger-Centre (Frères Allahoum) |
| 14 | `l-auberge-du-moulin` | [Restaurant L'Auberge du Moulin](file:///apps/l-auberge-du-moulin) | Traditional Mechoui, Historic Stone Hearth Mill | Chéraga (Abane Ramdane) |
| 15 | `bellagiorno` | [Restaurant Bellagiorno](file:///apps/bellagiorno) | Artisanal Italian, Open-Air Garden Lounge | Bir Mourad Raïs (Saïd Hamdine) |
| 16 | `la-trattoria-sheraton` | [La Trattoria - Sheraton](file:///apps/la-trattoria-sheraton) | Upscale Italian, Mediterranean Sunset Resort | Staouéli (Club des Pins) |
| 17 | `el-mordjane-sofitel` | [El Mordjane - Sofitel](file:///apps/el-mordjane-sofitel) | Traditional Algerian Haute Gastronomy, 5-Star Hotel | El Hamma (Jardin Botanique) |
| 18 | `le-bearnais` | [Restaurant Le Béarnais](file:///apps/le-bearnais) | Classic French, Historic Haussmannian Brasserie | Alger-Centre (Ahmed Khalfi) |
| 19 | `beef-cote-steakhouse` | [Beef Côte Steakhouse](file:///apps/beef-cote-steakhouse) | Premium Steakhouse, Dry-Aged Cuts & Charcoal Flames | Val d'Hydra, El Biar |
| 20 | `dwiret-el-azz` | [Restaurant Dwiret El Azz](file:///apps/dwiret-el-azz) | 17th-Century Moorish Mansion & Haute Gastronomy | Hydra (Abdelkader Gadouche) |

---

## 🛠️ Architecture & Features

Each application in `./apps/{{slug}}/` is an independent, production-ready React + TypeScript + Vite project styled with Tailwind CSS, customized with the venue's distinctive branding color palette and aesthetic guidelines.

### Public Features
- **Hero Banner**: High-impact visuals tailored to the cuisine, dynamic title, aesthetic keywords tags, and prominent reservation CTA.
- **Story & Heritage Section**: In-depth narrative of the restaurant's origin, philosophy, and district prestige.
- **Dynamic Categorized Menu**: Tabbed navigation across Starters, Mains, Desserts, and Signature Beverages with real-time search filtering, culinary descriptions, and authentic DZD pricing.
- **Operating Hours & Location**: Live "Open Today" / "Closed" status engine, weekly operating hours table, address, and click-to-call `tel:` link.
- **Table Reservation Modal**: Interactive booking system with party size, date/time pickers, and instant confirmation receipt.

### Hidden Admin Interface
- **Route**: `/#/admin` or `/admin` (strictly omitted from public headers/footers).
- **Authentication**: Secured login screen with credentials:
  - **Username**: `admin`
  - **Password**: `admin123!`
- **Capabilities**:
  - Full CRUD menu item manager (add, edit title/price/description, delete items).
  - Weekly operational schedule editor (modify opening hours per day).
  - Contact information editor (modify phone number and street address).
  - Instant local storage persistence (`localStorage`) with one-click factory reset and JSON export options.

---

## 🚀 Running and Building

### Run Any Restaurant App in Dev Mode:
```bash
cd apps/el-djenina
npm run dev
```

### Build a Specific Restaurant App:
```bash
cd apps/el-djenina
npm run build
```

### Build All 20 Restaurant Apps:
```bash
node scripts/build_all.js
```

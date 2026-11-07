<!-- genvibe-memory covers:eApla7aMWcSsCdbb -->
## What this app is
Cidade Viva is a mobile-style, gamified neighborhood interactive map app. The existing project is a React Native (Expo) app; a prior request also described a mobile-style web app.

## Working (confirmed)
- Page `/` had no crash or failed backend request after the latest change. (check: crash check on `/`)
- All four tabs opened after the latest detail-image changes. (check: all four tabs opened)

## Claimed, not yet confirmed
- The agent says the map uses a pixel-art base with localized storefronts, interactive promotion pins/cards, search and filters, and zoom controls. The green image-crop effect is said to be web-only, with a green-tint fallback on native.
- The agent says Explore, Ana Silva’s profile, store pages with hours and promotions, and navigation are included.
- The agent says the four neighborhood merchant images (Padaria, Convenience Store Family, Açaí Vendor, and Quentinha/Restaurant) are positioned on the street in front of their corresponding houses at proportional size. Smaller “%” pins sit to their right and open promotions; status is green for open and red for closed.
- The agent says the Convenience Store map image uses the exact URL supplied earlier; its complete value was not recorded in that turn.
- The agent says store detail screens show a main store image, hours, description, menu, reviews, promotion and reservation buttons. Explore and Search cards include image zoom, open/closed status, and discount labels; Search has “Abertas” and “Com promoção” filters. The Mapa, Explorar, Buscar, and Perfil tabs are said to be active.
- The agent says the Conveniência da Família detail image uses `https://ktiwocwgcnvfffxjhmrm.supabase.co/storage/v1/object/public/assets/gv-ed976qut/1793920926549-Prompt_family_of_convenience_store_owners_tall_father_with_s-1-.jpg`; the map sprite is unchanged. It now claims all detail hero photos display whole, stretched to fill the frame without cropping or empty bars.
- The agent reported changes to `src/data/mockData.ts`, `src/components/CityMap.tsx`, `src/components/StoreCard.tsx`, `app/(tabs)/explore.tsx`, `app/(tabs)/search.tsx`, `app/(tabs)/_layout.tsx`, and `app/store/[id].tsx`. Earlier reported files: `app.json`, `app/(tabs)/index.tsx`, `app/(tabs)/profile.tsx`, `src/theme/colors.ts`, and `src/components/StatusDot.tsx`.
- The agent reported `yarn install && yarn dev` and `npx expo install expo-image react-native-svg` (exit 0).

## Open bugs
—

## Design
- Requested cyberpunk, dark mode, isometric pixel-art aesthetic; placeholder images are acceptable.
- Requested colors: background `#0a1220`, neon blue `#00c8ff`, neon pink `#ff006e`, neon green `#00ff88`.
- References include a UI/UX image and a top-down pixel-art map with closed stores lit blue and open stores lit neon green. The agent described a dark, cyan-accented interface, green open-store highlights, interactive promotion pins, and a yellow promotion bubble.
- Latest map request: reduce “Aberto agora” green brightness/glow by 15%; make the red/pink “%” icon significantly smaller and move it toward the right edge of the house/store layout; place the four merchant images in front of their corresponding houses.

## Structure
- Requested Expo Router bottom tabs: Mapa (`index.tsx`), Explorar (`explore.tsx`), Perfil (`profile.tsx`); TypeScript, `react-native-svg` for map rendering, and `expo-image` for images.
- The agent said it would route the root Stack to `(tabs)` and leave `app/_layout.tsx` untouched; it later reported adding `app/store/[id].tsx` and changing the tab layout.

## User preferences & rules
- Create a complete app called “Cidade Viva” for an interactive, gamified neighborhood map.
- User requested React and Tailwind CSS expertise, a mobile-style web app, and supplied images as absolute visual references.
- Use the requested visual style, colors, tabs, TypeScript, `react-native-svg`, and `expo-image`.
- For the Convenience Store Family map sprite, use the exact image URL supplied by the user.
- Detail photos should remain whole rather than centered/cropped, accommodate their rotation as much as possible, and stretch slightly to fit completely when possible.
- Update the baker, the woman with the lunch pail, and the açaí item with these corresponding image links, in that order: `https://ktiwocwgcnvfffxjhmrm.supabase.co/storage/v1/object/public/assets/gv-ed976qut/1793922648666-51060-no-bg.toolszone.net.png`, `https://ktiwocwgcnvfffxjhmrm.supabase.co/storage/v1/object/public/assets/gv-ed976qut/1793922665730-51049-no-bg.toolszone.net.png`, `https://ktiwocwgcnvfffxjhmrm.supabase.co/storage/v1/object/public/assets/gv-ed976qut/1793922683485-51047-no-bg.toolszone.net.png`.

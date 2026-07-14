# Beyond Niche — QR Locations Page

## What this is
A single mobile page: scan the QR code → land here → browse shop photos with the arrows → tap the mall name → see the floor map with your branch marked → tap "Get Directions" for Google Maps.

## Files
```
index.html    the page structure
style.css     all colors/fonts/spacing
script.js     the LOCATIONS list + carousel/popup logic
assets/       photos, floor maps, icons
```

## To add or edit a location
Open `script.js`, find the `LOCATIONS` list at the very top, and edit/duplicate one of the blocks:

```js
{
  name: "Bawadi Mall",
  gate: "Gate 3",
  photo: "assets/bawadi-photo.jpg",
  floormap: "assets/bawadi-floormap.jpg",
  directions: "https://www.google.com/maps/search/?api=1&query=Bawadi+Mall+Al+Ain"
}
```
Drop your new photo/floor map image into the `assets` folder, point `photo`/`floormap` at the filename, and it appears in the carousel automatically — no other code changes needed.

**Right now "Mall of Al Ain" and "Third Location" use placeholder images** since those photos/floor maps weren't ready yet. Swap them in the same way once you have them, and rename "Third Location" to your real branch name.

## Deploying (Netlify — free)
1. Go to https://app.netlify.com/drop
2. Drag the whole project folder (this folder, with `index.html` at the top level) onto the page
3. Netlify gives you a live URL instantly (e.g. `random-name-123.netlify.app`)
4. Optional: in Netlify → Site settings → Domain management, add a custom domain or subdomain (e.g. `locations.beyondniche.ae`)

## Making the QR code
Once you have the live URL, generate a QR code pointing to it at any free QR generator (e.g. qr-code-generator.com) and download it as an SVG/PNG for print.

## Notes
- The floor map images are static pictures with the pin already drawn on — same approach as your Bawadi example. For each new mall, just get/create one image with a pin marking your shop and drop it in `assets/`.
- The "Get Directions" links currently point to a Google Maps search for the mall itself (not the exact in-mall spot, since Google Maps can't pin an indoor shop). If you'd rather link directly to your Google Business listing, replace the `directions` URL for that location.

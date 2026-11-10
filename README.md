# Toss-It website — VS Code project

This is the **actual HTML/CSS/JavaScript from your uploaded mock website**, reorganized into a project that you can open in Visual Studio Code. The layout, wording, pricing page, service-area map, responsive navigation, before/after slider, galleries, and service pages are kept from the mock.

## Open in VS Code

1. Unzip `Toss-It-Website.zip`.
2. In VS Code, choose **File > Open Folder** and open `Toss-It-Website`.
3. Install the **Live Server** extension if you do not already have it.
4. Open `index.html`, right-click and select **Open with Live Server** (or click **Go Live**).
5. Your browser will open the local website. Use the menu to preview every page.

## Project structure

```text
Toss-It-Website/
├── index.html           # website pages and content
├── css/
│   └── style.css        # exact mock layout, colours, mobile styles
├── js/
│   └── main.js          # settings, sliders, page navigation, forms
├── img/                 # add the original site images here
└── README.md
```

## IMPORTANT: Add original mock photos and logos

**Only the HTML mock file was uploaded. It links to images, but the actual image files were NOT included.** To reproduce the appearance, ask the mock website creator for the full `img` folder and copy its contents into this project's `img/` directory. Without those files, photo/image sections will be blank and the branding logos will not appear. Do NOT rename image files unless you also update their paths in the code.

Files referenced by the mock (including dynamically loaded page photos):

- `img/after.jpg`
- `img/apple-touch-icon.png`
- `img/appliance.jpg`
- `img/basement-estate.jpg`
- `img/before.jpg`
- `img/bulk-room.jpg`
- `img/condo-moveout.jpg`
- `img/couch.jpg`
- `img/garage-clean.jpg`
- `img/garage.jpg`
- `img/hero-light.jpg`
- `img/hot-tub.jpg`
- `img/logo-header.png`
- `img/logo-mark.png`
- `img/logo.png`
- `img/mattress.jpg`
- `img/og-image.jpg`
- `img/prelisting.jpg`
- `img/reno-debris.jpg`
- `img/reno-site.jpg`
- `img/restaurant.jpg`
- `img/shed.jpg`
- `img/storage.jpg`
- `img/tile-business.jpg`
- `img/tile-condo.jpg`
- `img/tile-estate.jpg`
- `img/tile-garage.jpg`
- `img/tile-homes.jpg`
- `img/tile-reno.jpg`
- `img/van-loaded.jpg`
- `img/yard.jpg`

There may be other photo names used by dynamically rendered pages. Keep the entire original `img/` folder if available.

The mock also links to `Toss-It-Price-Guide.pdf`. If you want the PDF buttons to work, put the original PDF in the project root (next to `index.html`).

## Edit your business details

At the very top of `js/main.js`, find `const CFG = { ... }`. Update the phone number, email, business location, prices, offers, hours, analytics IDs, and live domain. The website also has some hard-coded text and metadata in `index.html`; search that file for `Toss-It`, `647-394-2344`, `dcremovalca.com`, `Damian`, `Carson` and edit anything that does not match your real business.

Before publishing, confirm the quoted prices, removal/disposal policies, operating hours, and all business promises are accurate.

## Booking form / going live

The mock is set up for **Netlify Forms**, not a traditional backend. In local preview, clicking **Request my quote** correctly shows a preview notice, rather than pretending to submit a request.

To receive real booking requests:

1. Make an account at Netlify and deploy this site as a static site (drag and drop the project folder or connect a GitHub repository).
2. In the Netlify dashboard, verify form detection and deploy again if required. Look for the `estimate` form in **Forms**. Set up email notifications to receive submissions.
3. Send a test submission on the deployed site, then check Netlify **Forms** for the response and uploaded image. Do not advertise the form as active until the test works.
4. Update `CFG.liveHosts` in `js/main.js` with your actual custom domain if different from the mock. Netlify's `.netlify.app` preview hostname is already recognized by the current JavaScript.
5. Connect your domain in Netlify, configure HTTPS, and verify phone, SMS, and mail links on a real phone.

**Note:** Uploading to Firebase Hosting, GitHub Pages, or other static hosting will not automatically process Netlify Forms. Those hosts need a separate form backend, such as Firebase Cloud Functions or a form service.

## Other launch checklist

- Replace the mock's canonical URL, Open Graph image URL, structured-data business information, and footer details with your real ones.
- Add your own accurate privacy policy (especially for customer names, phone numbers, photos, and web analytics).
- Make sure any pricing guide, promotional offer, and reviews are real and current.
- Test mobile navigation, every page, before/after slider, image gallery, and booking form on desktop and phone.
- The site uses Google Fonts loaded online, so font appearance needs internet access.

No React, Node server, or build tools are required to preview this site.

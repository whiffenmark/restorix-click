# Restorix

> A clean, modern, brandable restoration website for the domain **restorix.click**

Restorix is a flexible restoration brand concept covering water damage, fire damage, mold,
storm cleanup, sewage cleanup, and emergency property restoration topics.

---

## 📁 Project Structure

```
restorix-click/
├── index.html          # Main page (all sections)
├── styles.css          # Full design system + responsive styles
├── script.js           # Vanilla JS — nav, FAQ, form, scroll-reveal
├── assets/
│   └── images/         # Add real images here (see notes below)
└── README.md
```

---

## 🚀 Cloudflare Pages Deployment

### Build Settings

| Setting           | Value                                    |
|-------------------|------------------------------------------|
| **Framework**     | None (static HTML)                       |
| **Build command** | `exit 0`                                 |
| **Output directory** | `/`                                   |
| **Root directory** | `/` (repo root)                         |

### Steps

1. Push this repository to GitHub.
2. Log in to [Cloudflare Pages](https://pages.cloudflare.com/).
3. Click **Create a project → Connect to Git**.
4. Select the `restorix-click` repository.
5. Set the build settings above.
6. Click **Save and Deploy**.
7. In **Cloudflare Dashboard → DNS**, add a CNAME record pointing `restorix.click` to your Pages project URL.

---

## 🖊️ Before Launch — Replace All Placeholders

Search the HTML and JS for `PLACEHOLDER` comments and replace with real data:

| Placeholder                       | Where             | Replace with                  |
|-----------------------------------|-------------------|-------------------------------|
| `[Phone Number — Placeholder]`    | `index.html`      | Real phone number             |
| `[Email — Placeholder]`           | `index.html`      | Real email address            |
| Form submit handler               | `script.js`       | Formspree, EmailJS, etc.      |
| `og:image`                        | `index.html`      | Real Open Graph image URL     |

---

## 🎨 Design System

- **Headings:** Outfit (Google Fonts)
- **Body:** Inter (Google Fonts)
- **Primary color:** `#2563EB` (blue)
- **Accent color:** `#EA580C` (orange)
- **Neutral:** Slate scale

All design tokens are CSS custom properties in `:root` inside `styles.css` — easy to update globally.

---

## 📄 Adding Local Pages

The site is structured so local/city pages can be added later:

1. Create a folder, e.g., `/water-damage-restoration/miami/`
2. Add an `index.html` using the same `styles.css` and `script.js`
3. Update meta title, description, and h1 for the city
4. Cloudflare Pages will serve the folder automatically

---

## ⚠️ Disclaimer

Restorix provides general restoration information. It does not replace advice from a
qualified restoration professional, licensed contractor, insurance adjuster, or emergency
service provider.

---

## 📝 License

This project is proprietary. All rights reserved by the Restorix project owner.

# Jaiden Ortiz — Model Portfolio

Free static portfolio for **jaidenortiz.com**, hosted on GitHub Pages and structured for Pages CMS.

## Site
- Repository: `hyperjayy-star/hyperjayy-star.github.io`
- Production domain: `jaidenortiz.com`
- Contact email displayed on site: `contact@jaidenortiz.com`
- Current height: 5'11"

## Editing
The site data is split into JSON files so Pages CMS can edit:
- Profile + measurements
- Hero poster/video
- Portfolio images/categories
- Runway/projects
- Comp-card covers/PDFs
- Quick links
- Press/updates

Sign in to Pages CMS with GitHub and authorize this repository. The included `.pages.yml` defines the admin interface.

## GitHub Pages
Publish from the `main` branch, repository root. The `CNAME` file is already set to `jaidenortiz.com`.

## Namecheap DNS
For the apex domain, point host `@` to GitHub Pages with these A records:
- 185.199.108.153
- 185.199.109.153
- 185.199.110.153
- 185.199.111.153

For `www`, add a CNAME pointing to:
- `hyperjayy-star.github.io`

Do not delete MX/SPF/DKIM records used by the email provider for `contact@jaidenortiz.com`.

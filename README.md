# Victor Ongera Personal Website

Personal academic website for Victor Nyabuti Ong'era. The site is built with Jekyll and is designed to present:

- an interactive CV
- a research portfolio
- links to public profiles such as GitHub and LinkedIn
- short updates for tutorials, project notes, and announcements

## Stack

- Jekyll 4
- Markdown collections for research and updates
- Custom CSS and a small vanilla JavaScript theme switcher

## Local development

Prerequisites:

- Ruby
- Bundler

Install dependencies:

```bash
bundle install
```

Run the local server:

```bash
bundle exec jekyll serve
```

Build the site:

```bash
bundle exec jekyll build
```

## Content structure

- `index.md`: homepage
- `cv.md`: online CV
- `research.md`: research landing page
- `news.md`: updates landing page
- `_research`: individual research entries
- `_news`: tutorial and update posts
- `_config.yml`: site profile, navigation, CV data, and links

## Customizing the site

Update personal/profile data in `_config.yml`:

- name and title
- GitHub and LinkedIn links
- CV summary, experience, education, and skills
- homepage intro text

Add research items by creating Markdown files in `_research`.

Add tutorials or news updates by creating Markdown files in `_news`.

Adjust design and themes in:

- `assets/css/main.css`
- `assets/js/site.js`
- `_includes/navigation.html`

## Privacy note

The site is currently set up to avoid exposing unnecessary personal details. Public links and the hosted PDF CV are included, but phone number and direct email have been removed from the rendered site.

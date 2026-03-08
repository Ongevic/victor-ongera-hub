---
layout: default
title: Home
---

<section class="hero" markdown="0">
  <div class="container hero-grid">
    <div class="hero-copy">
      <p class="eyebrow">{{ site.profile.title }}</p>
      <h1>{{ site.profile.name }}</h1>
      <p class="hero-lead">{{ site.profile.tagline }}</p>
      <p class="hero-text">{{ site.profile.intro }}</p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="{{ '/cv/' | relative_url }}">Open CV</a>
        <a class="btn btn-outline" href="{{ '/research/' | relative_url }}">View research</a>
      </div>
      <ul class="inline-links">
        <li><a href="{{ site.profile.links.github }}" target="_blank" rel="noreferrer">GitHub</a></li>
        <li><a href="{{ site.profile.links.linkedin }}" target="_blank" rel="noreferrer">LinkedIn</a></li>
        <li><a href="{{ site.profile.links.cv_pdf | relative_url }}" target="_blank" rel="noreferrer">PDF CV</a></li>
      </ul>
    </div>
    <aside class="hero-panel">
      <p class="eyebrow">Site Map</p>
      <div class="metric-stack">
        <div class="metric-card">
          <span class="metric-value">01</span>
          <p>Interactive CV with a cleaner overview of experience, skills, and links.</p>
        </div>
        <div class="metric-card">
          <span class="metric-value">02</span>
          <p>Selected research presented like a portfolio rather than a crowded archive.</p>
        </div>
        <div class="metric-card">
          <span class="metric-value">03</span>
          <p>Tutorial posts and short updates when something new is worth sharing.</p>
        </div>
      </div>
    </aside>
  </div>
</section>

<section class="section" markdown="0">
  <div class="container intro-grid">
    <div class="panel">
      <h2>About</h2>
      {% for paragraph in site.profile.bio %}
      <p>{{ paragraph }}</p>
      {% endfor %}
    </div>
    <div class="panel">
      <h2>Research interests</h2>
      <ul class="stack-list">
        {% for interest in site.profile.interests %}
        <li>{{ interest }}</li>
        {% endfor %}
      </ul>
    </div>
  </div>
</section>

<section class="section showcase-band" markdown="0">
  <div class="container showcase-grid">
    <article class="showcase-card showcase-card-wide">
      <p class="eyebrow">Presentation</p>
      <h2>Clean enough for research, lively enough for the web</h2>
      <p>This layout brings together climate and agriculture research in a cleaner, more navigable format, with enough motion and contrast to keep it engaging.</p>
    </article>
    <article class="showcase-card">
      <p class="eyebrow">Themes</p>
      <h3>Switch mood instantly</h3>
      <p>Use the theme chips in the header to move between amber, forest, and night.</p>
    </article>
    <article class="showcase-card">
      <p class="eyebrow">Portfolio</p>
      <h3>Show work clearly</h3>
      <p>The homepage now behaves more like a curated profile, with obvious paths into research and writing.</p>
    </article>
  </div>
</section>

<section class="section section-alt" markdown="0">
  <div class="container">
    <div class="section-heading">
      <p class="eyebrow">Featured Work</p>
      <h2>Research portfolio</h2>
    </div>
    <div class="card-grid">
      {% assign featured_research = site.research | slice: 0, 3 %}
      {% for item in featured_research %}
      <article class="card pop-card">
        <p class="card-meta">{{ item.status | default: "Research project" }}</p>
        <h3><a href="{{ item.url | relative_url }}">{{ item.title }}</a></h3>
        <p>{{ item.subtitle | default: item.excerpt | strip_html | truncatewords: 25 }}</p>
        <a class="text-link" href="{{ item.url | relative_url }}">Open project</a>
      </article>
      {% endfor %}
    </div>
  </div>
</section>

<section class="section" markdown="0">
  <div class="container">
    <div class="section-heading">
      <p class="eyebrow">Latest Writing</p>
      <h2>Updates and tutorials</h2>
    </div>
    {% assign latest_post = site.news | first %}
    {% if latest_post %}
    <article class="feature-card">
      <p class="card-meta">{{ latest_post.date | date: "%B %-d, %Y" }}</p>
      <h3><a href="{{ latest_post.url | relative_url }}">{{ latest_post.title }}</a></h3>
      <p>{{ latest_post.excerpt | strip_html | truncatewords: 35 }}</p>
      <a class="text-link" href="{{ '/news/' | relative_url }}">See all updates</a>
    </article>
    {% else %}
    <div class="feature-card">
      <h3>No updates yet</h3>
      <p>Add Markdown files to the <code>_news</code> folder when you want to publish tutorials, climate-method notes, or project announcements.</p>
    </div>
    {% endif %}
  </div>
</section>

# add-affiliate-link-attributes

Post-build script to apply appropriate link attributes to affiliate links in order to protect your affiliate accounts.

## What does this do?

Life is too short to worry about manually adding link attributes on every affiliate link! This script:

- Parses HTML files in a directory.
- Captures all `<a>` tags that match a domain host list.
- Applies appropriate link attributes that you specify.

## What problem does this solve?

Many affiliate networks monitor link placements and clicks for fraud detection. Sometimes false positives can occur by forgetting to apply link attributes such as `rel="nofollow noopener sponsored"` (or whatever is appropriate for your situation). If, for example, you instead include `rel="noreferrer"` on such links, some networks may not like this and may think you're trying to mask the origin of those link clicks.

In aggressive cases, such as with [Amazon's Affiliate program](https://affiliate-program.amazon.com/), detection of affiliate links with incorrect attributes as well as clicks on such links can sometimes cause **account bans**. This is a painful situation that can cost you time and money!

## How to use this script

Copy this script to your project and add the two NPM packages `globby` and `jsdom`. Configure your particulars in the script, such as:

- Path to your build output directory.
- Affiliate domain list to pattern match.
- Exact attributes you want added to links.

Run this script as a sequential command after your build and before deployment. This should work with most static site generators. For example, with the [fantastic SSG, Astro](https://astro.build/), you might add this to your NPM build script like so:

`"build": "astro build && node update-affiliate-links.mjs",`

Just make sure to keep your domain list up to date as you add or change affiliate networks, and never worry about an errant link risking your account again!

## How does this affect SEO?

As this applies to server-side rendered (SSR) or pre-generated HTML, as opposed to client-side rendered (CSR) pages, you'll also be protected on the SEO front. Google's first pass crawler is usually [crawling the static HTML output without rendering](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics). Yes, Google has other bots that handle _rendering_ CSR-generated pages. HOWEVER, there is a big caveat with this and SEO with CSR-heavy sites is still very misunderstood. Courtesy of Google, here's a quick, high-level, refresher on Google's crawling and indexing process for SSR vs. CSR pages.

![Google's three phase crawl process.](https://developers.google.com/static/search/docs/images/googlebot-crawl-render-index.png)

SSR or pre-generated pages have the best chance of being **crawled and indexed the quickest**. CSR pages can take longer due to the additional resources required for rendering. Later crawls eventually render the page to gain more information about additional content, UI, and UX to assist with improving search results.

In some cases, rendering crawls can take weeks or **even months** to occur on some sites! SEO takes a very long time to build and maintain, so the delay in waiting for later CSR crawler passes is unacceptable. Bottom line, if it's not in the SSR HTML output, it doesn't matter much for SEO.

## Deficiencies and TBD

I haven't bothered to control for things like relative vs. absolute URLs or subdomain variations (e.g. www vs non-www). Keep this in mind with your list of affiliate domain patterns and be precise. I may improve this in the future.

This implementation with JSDOM isn't fast or efficient. I wanted this quick and easy to read and modify for small affiliate static sites (often 50-100 pages or less). At 1K pages, it takes just under 1 minute. So, small sites are a non-issue at only a few seconds.

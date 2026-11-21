# Technical Documentation

## Overview
A static, single-page portfolio built with vanilla HTML5, CSS3, and JavaScript (ES6+). There are no
frameworks, build tools, or backend: the site runs directly in the browser from `index.html`. The only
network request is to the public GitHub API for the repositories section.

Assignment 3 builds on the Assignment 2 portfolio and adds project sorting, a time-on-site timer, a saved
visitor name, a visitor-type picker with different content for each choice, three new projects, and
performance improvements.

## How to Run Locally
1. Clone the repository: `git clone https://github.com/kfupmstudent/202449720-NorahAljammaz-assignment3.git`
2. Open the folder and double-click `index.html` (or use the VS Code **Live Server** extension).
3. To test on mobile sizes, open DevTools (Cmd + Option + I on Mac, F12 on Windows), turn on the Device
   Toolbar, and choose a phone size.
4. To test the saved state, use the features, then reload the page. To reset it, open DevTools →
   Application → Local Storage and delete the entries.

No environment variables, API keys, or servers are needed.

## Architecture
```
index.html     → structure and content (header, main sections, footer)
css/styles.css → all styling, using CSS custom properties for colors and theming
js/script.js   → all interactivity, organized into small named functions
assets/images/ → WebP images and the SVG favicon
```

All JavaScript starts from one `DOMContentLoaded` listener that calls each setup function once:
`setFooterYear`, `setupMobileNav`, `setupThemeToggle`, `setGreetingByTime`, `setupVisitorName`,
`setupVisitorType`, `setupContactForm`, `setupProjectFilter`, `setupReadMore`, `loadRepos`,
`setupScrollReveal`, and `setupVisitTimer`. Each function first checks that its HTML elements exist, so a
missing element does not break the rest of the page.

## API Integration: GitHub Repositories
`loadRepos()` is an `async` function that requests
`https://api.github.com/users/kfupmstudent/repos?sort=updated&per_page=6` with `fetch`. The username is the
constant `GITHUB_USERNAME` at the top of `script.js`.

| State | When | What the visitor sees |
|---|---|---|
| Loading | the request is in progress | "Loading repositories…" |
| Success | repositories were received | the name (linked to GitHub) and description of each repository |
| Empty | the account has no public repositories | "No public repositories yet. Check back soon!" |
| Error | the request fails or GitHub returns an error status | a friendly message and a **Try again** button |

- A response that is not `ok` (for example 403 when the rate limit is reached) is turned into an error with
  `throw`, so it reaches the same `catch` block as a network failure.
- Repository text is inserted with `textContent`, not `innerHTML`, so data from the API cannot inject HTML.
- A `<link rel="preconnect">` in the `<head>` opens the connection to `api.github.com` early, so the data
  arrives sooner.

## Complex Logic

### 1. Filter, search, and sort together
Each project card stores its information in data attributes:
```html
<article class="project-card" data-tags="design" data-date="2026-10">
```
`setupProjectFilter()` contains an inner function `apply()` that runs whenever a filter button, the search
box, or the sort menu changes. It works in two steps:

1. **Sort:** `sortCards()` copies the cards into an array (`[...cards]`, because a NodeList has no
   `.sort()`), sorts them, and appends each card to the grid again. `appendChild` *moves* an existing
   element, so this rebuilds the grid in the new order without creating copies.
2. **Filter:** each card is shown only if it matches **both** the active filter button (or "All") **and**
   the search text. The "Showing X of Y projects" line and the empty-state message are then updated.

The sort uses a compare function with several rules:
- **Name (A–Z):** compare titles with `localeCompare`.
- **Newest / oldest:** compare `data-date`. Dates are written as `YYYY-MM`, so comparing them as text gives
  the correct date order. Swapping `a` and `b` reverses the direction.
- **Tie-break:** if two projects have the same date (Lost & Found and Recruitment Portal are both
  `2026-10`), they are sorted by name.

### 2. Contact form validation
`setupContactForm()` checks three rules on submit: name at least 2 characters, email matching the pattern
in `isValidEmail()`, and message at least 10 characters. Each error is shown under its own field. Only when
all three pass does the form show a personalized confirmation and reset. There is no backend, so the
confirmation says the form is a demo.

### 3. Different content for each visitor type
The "What brings you here?" menu (`#visitorType`) has three choices. The object `VISITOR_MESSAGES` at the
top of `script.js` stores the message, link text, and action for each one:

| Choice | Message shows | Link action |
|---|---|---|
| I'm hiring (`recruiter`) | which projects show my web and business work | jumps to Projects and clicks the **Web** filter |
| I'm a student (`student`) | that the projects are class work, with how to explore them | jumps to Projects with **All** selected |
| Just looking around (`curious`) | ideas for exploring the site | jumps to Contact |

`showVisitorMessage()` combines several conditions: if no choice is selected the box stays hidden; if a
visitor name is saved, the message starts with the name (for example "Sara, short on time?…"); if the entry
has a `filter`, the link also presses that filter button, and otherwise it uses the entry's `href`.

### 4. Time-on-site timer
`setupVisitTimer()` uses `setInterval` to run once per second. If `document.hidden` is true (the visitor is
on another tab), it skips that second, so only active time is counted. `formatDuration()` turns the total
seconds into `m:ss`, or `h:mm:ss` after an hour, using `padStart(2, '0')` so that 5 seconds shows as `0:05`.

## State Management
All saved state uses `localStorage`, so it stays after a reload or after closing the browser.

| Key | Saved by | Used for |
|---|---|---|
| `theme` | `setupThemeToggle()` | dark or light theme |
| `visitorName` | `setupVisitorName()` | greeting, "Nice to see you" line, visitor message, contact form name |
| `visitorType` | `setupVisitorType()` | the selected visitor type and its message |

`setupVisitorName()` has one inner function, `render()`, that updates everything that depends on the name:
it shows either the name form or the "Nice to see you, …! Not you?" line, updates the greeting, updates the
visitor message, and fills in the contact form's name field if it is empty. Saving and clearing the name
both call `render()`, so the page always matches what is stored.

The name is validated before saving with the regular expression `/^[\p{L}][\p{L} '-]{1,29}$/u`: it must
start with a letter, be 2 to 30 characters long, and contain only letters (in any language, including
Arabic), spaces, apostrophes, and hyphens.

## Performance
| Change | Why |
|---|---|
| All images converted to **WebP** and resized (the profile image from 992 × 1084 to 800 × 874) | total image size went from about 870 KB to about 75 KB; the whole page is now about 100 KB |
| `width` and `height` on every `<img>` | the browser reserves the space before the image loads, so the layout does not jump (no layout shift) |
| `loading="lazy"` on the project images | images below the first screen load only when the visitor scrolls near them |
| `fetchpriority="high"` on the profile image | the first image the visitor sees loads first |
| `preconnect` to `api.github.com` | the GitHub request starts faster |
| SVG favicon | avoids a failed request (404) for `favicon.ico` on every page load |
| Unused files removed | the old PNG and JPEG images were deleted after conversion |

**Lighthouse results** (PageSpeed Insights on the live GitHub Pages site, 21 Nov 2026):

| | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Mobile | 100 | 55 | 92 | 82 |
| Desktop | 100 | 55 | 96 | 82 |

## Accessibility
- Every form field and menu has a `<label>` or an `aria-label`.
- The results line uses `aria-live="polite"` and the repository status uses `role="status"`, so screen
  readers announce changes.
- The hamburger button updates `aria-expanded`.
- Scroll animations and transitions are turned off for visitors who prefer reduced motion.

## Manual Test Checklist
1. **Sort:** Newest first → Lost & Found, Recruitment Portal, Rawi, Darsi, Breaker. Oldest first → the
   reverse, with Lost & Found still before Recruitment Portal (same date, sorted by name).
2. **Filter + sort:** click Design, choose Oldest first → Breaker, Darsi, Lost & Found ("Showing 3 of 5").
3. **Search:** type `tutor` → only Darsi. Type `zzzz` → the "No projects match" message.
4. **Visitor name:** save `1` → error message. Save `Sara` → greeting becomes "Good …, Sara" and the contact
   name field is filled. Reload → still saved. Click "Not you?" → the form returns.
5. **Visitor type:** choose each option → the message and link change. Choose "I'm hiring" and click the
   link → only Rawi is shown. Reload → the choice is remembered.
6. **Timer:** the footer counts up; switch to another tab for a while and come back → it paused.
7. **GitHub error:** DevTools → Network → Offline, reload → friendly error and **Try again**; go back online
   and click it → repositories load.
8. **Form:** submit empty → an error under each field; submit valid data → green confirmation.
9. **Theme:** switch to dark mode and reload → still dark.
10. **Responsive:** at 375 px wide there is no horizontal scrolling and the menu works.

## Known Limitations
- The contact form does not send messages; there is no backend.
- Saved data stays in the visitor's own browser only. It is not shared across devices.
- The timer restarts at 0:00 when the page is reloaded.
- GitHub allows a limited number of requests per hour from one network. If the limit is reached, the
  repositories section shows the error message.
- Projects, their dates, and the visitor messages are written by hand in `index.html` and `script.js`.
- The project cover images for Rawi, Lost & Found, and Recruitment Portal are illustrations, because those
  projects are still in progress.

## Browser Support
The site uses standard features supported by current Chrome, Edge, Firefox, and Safari: `fetch`, `async` /
`await`, `localStorage`, `IntersectionObserver`, WebP images, CSS Grid and Flexbox, and CSS custom properties.
If `IntersectionObserver` is not available, the fade-in is skipped and content is shown normally.
Tested on: Safari on Mac, and Safari and Chrome on iPhone.

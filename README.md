# 202449720-NorahAljammaz-assignment3
# Personal Portfolio

## Project Description
This is my personal portfolio website, built for Assignment 3 of SWE 363 (Web Engineering). It builds on my
Assignment 2 portfolio and adds advanced features: project sorting, a time-on-site timer, a saved visitor
name, a "What brings you here?" picker that changes the content, and performance improvements.

The site introduces me, shows five of my projects (**Lost & Found**, **Recruitment Portal**, **Rawi**,
**Darsi**, and **Breaker**), lists my latest public GitHub repositories, and offers a way to get in touch.
It is built with plain HTML, CSS, and JavaScript (no framework) and works on desktop, tablet, and mobile.

**Sections:**
- **About**: greeting, introduction, profile image, and the visitor panel (name and visitor type)
- **Projects**: five project cards with filter buttons, live search, and sorting
- **GitHub Repositories**: my latest public repositories, loaded live from the GitHub API
- **Skills**: a list of tools and strengths
- **Contact**: a validated contact form (front end only) plus email, phone, and LinkedIn
- **Footer**: copyright year and the time-on-site timer

## Features

### New in Assignment 3
| Feature | What it does |
|---|---|
| **Project sorting** | Sort by newest, oldest, or name (A–Z). Projects with the same date are sorted by name. Works together with the filter buttons and search. |
| **Time-on-site timer** | Shows how long the visitor has been on the page. It pauses while the visitor is on another browser tab. |
| **Saved visitor name** | The visitor can save their first name. It is checked, remembered after a reload, used in the greeting, and filled into the contact form. "Not you?" clears it. |
| **Visitor type picker** | "What brings you here?" shows a different message and link for a recruiter, a student, or a casual visitor. The choice is remembered, and the recruiter link also switches the projects to the Web filter. |
| **Performance** | All images converted to WebP, total page size reduced from about 900 KB to about 100 KB, image sizes set to prevent layout shift, priority loading for the first image, and a favicon. |
| **New projects** | Three new project cards with dates, course, and status, plus new filter categories (Web, Design, Management). |

### Carried over from Assignments 1 and 2
- Dark / light theme toggle, saved in `localStorage`
- Time-of-day greeting and mobile hamburger menu
- Project filter buttons, live search, and "Read more / Show less"
- GitHub repositories from the public API, with loading, error ("Try again"), and empty states
- Contact form validation with a message under each field
- Scroll fade-in and hover effects (turned off for visitors who prefer reduced motion)

## Folder Structure
```
202449720-NorahAljammaz-assignment3/
├── README.md
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── images/          (WebP images and the favicon)
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
└── .gitignore
```

## Setup Instructions (Run Locally)
No installation, build tools, or API keys are needed.

1. Clone the repository:
   ```bash
   git clone https://github.com/kfupmstudent/202449720-NorahAljammaz-assignment3.git
   ```
2. Open the project folder.
3. Double-click `index.html` to open it in your browser.
   - **Optional:** in VS Code, install the **Live Server** extension, right-click `index.html`, and choose
     **Open with Live Server** to reload the page automatically while editing.

An internet connection is only needed for the GitHub Repositories section. Offline, that section shows a
friendly error with a **Try again** button, and the rest of the site works normally.

To reset the saved name, visitor type, and theme, clear the site data in your browser
(DevTools → Application → Local Storage → delete the entries).

## Live Demo
https://kfupmstudent.github.io/202449720-NorahAljammaz-assignment3/

## Using the Site
- **Find a project:** use the Web / Design / Management buttons, type in the search box, or change the sort order.
- **Personalize the page:** enter your name in the About section and choose what brings you here.
- **Dark mode:** click the moon / sun button at the top right.
- **Contact me:** fill in the form (all fields are checked before sending) or use the direct links above it.

## AI Use Summary
I used **Claude (Claude Opus 5.5)** throughout this assignment as a guide and code assistant: planning the
features against the assignment requirements, providing the code for sorting, the timer, the visitor name,
and the visitor type picker, creating the three project cover images and the optimized WebP images, fixing
my Git push error, reviewing my work, and drafting this documentation.

I pasted the code into my own files step by step, added my own comments, tested each feature in the
browser, fixed the formatting myself, and checked the documentation against my code. Commits with
AI-assisted code are marked with `Assisted-by: Claude (Claude Opus 5.5)`. Full details are in
[`docs/ai-usage-report.md`](docs/ai-usage-report.md).

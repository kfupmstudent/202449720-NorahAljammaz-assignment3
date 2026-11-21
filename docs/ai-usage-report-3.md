# AI Usage Report — Assignment 3

## Tools Used & Use Cases
- **Claude (Anthropic), Claude Opus 5.5, via claude.ai** — used in one conversation (C01) as a guide and code
  assistant for the whole assignment:
  - **Repository setup and Git help:** copying my Assignment 2 repository into the new Assignment 3
    repository without changing the original (`git pull` from the old repository, checking `git remote -v`),
    explaining a `zsh: parse error` caused by pasting a placeholder URL, and fixing an `HTTP 400` push error
    (`http.postBuffer` and `http.version HTTP/1.1`).
  - **Planning:** comparing my Assignment 2 code with the Assignment 3 requirements and listing what was
    already done and what was missing.
  - **Code:** the HTML for the three new project cards, and the HTML, CSS, and JavaScript for project sorting,
    the time-on-site timer, the saved visitor name, and the visitor-type picker. Each feature came with an
    explanation of how it works.
  - **Fixing a mistake:** after I pasted the new project cards inside an old card by accident, Claude gave me a
    corrected `index.html` with only the project section changed.
  - **Images:** the three project cover images (Rawi, Lost & Found, Recruitment Portal) and WebP versions of all
    images plus a favicon, for the performance requirement.
  - **Code quality:** explaining a VS Code `line-clamp` compatibility warning, and reviewing my pushed code
    (it found uneven indentation and typos in my comments).
  - **Documentation:** first drafts of `README.md`, `docs/technical-documentation.md`, and this report.

No other AI tools were used in this assignment.

## Carried Over from Assignments 1 and 2
This assignment starts from my Assignment 2 portfolio. The AI use for that work was declared in the
Assignment 1 and Assignment 2 reports and is not repeated here.

## AI Usage Log

| ID | Tool (model) | Date | Purpose | Files affected | What you changed and how you verified it |
|----|--------------|------|---------|----------------|------------------------------------------|
| C01 | Claude (Claude Opus 5.5) | 2026-11-21 | Repository setup and Git errors; requirement gap analysis; code for the new project cards, sorting, timer, saved visitor name and visitor-type picker; fixed project grid; review of my code; documentation drafts | `index.html`, `css/styles.css`, `js/script.js`, `assets/images/`, `README.md`, `docs/technical-documentation.md`, `docs/ai-usage-report.md` | I pasted each feature into my files one at a time and committed each one separately. I added my own comments explaining the new functions, fixed spacing and indentation myself, and edited the project descriptions. I tested every feature in the browser before committing: each sort order, filter plus sort, saving an invalid and a valid name, reloading to check saved state, "Not you?", each visitor type and its link, the timer pausing on another tab, and all images loading after the WebP change. I checked the documentation against my code. |
| A01 | Claude (Claude Opus 5.5) | 2026-11-21 | Corrected `index.html` after I pasted the new cards inside an old card | `index.html` | Replaced my file, checked in the browser that all five cards were in the grid, and confirmed the filters worked. |
| A02 | Claude (Claude Opus 5.5) | 2026-11-21 | Cover images for Rawi, Lost & Found, and Recruitment Portal (illustrations, since these projects are still in progress) | `assets/images/` | Checked that they matched the size and style of my existing card images. Later replaced by the WebP versions (A04). |
| A03 | Claude (Claude Opus 5.5) | 2026-11-21 | Patch files containing all five features | None | Not used. I chose to add the code by copying and pasting each feature instead. |
| A04 | Claude (Claude Opus 5.5) | 2026-11-21 | WebP versions of all images and an SVG favicon | `assets/images/`, `index.html` | Replaced the old PNG and JPEG files, updated the image paths in `index.html`, and checked that every image loads and the profile image keeps its square shape. |
| A05 | Claude (Claude Opus 5.5) | 2026-11-21 | First draft of `README.md` | `README.md` | Read it against my site, corrected details, and edited the wording. |
| A06 | Claude (Claude Opus 5.5) | 2026-11-21 | First draft of `docs/technical-documentation.md` | `docs/technical-documentation.md` | Checked every function name and behavior against my code and added my Lighthouse results and tested browsers. |
| A07 | Claude (Claude Opus 5.5) | 2026-11-21 | First draft of this report | `docs/ai-usage-report.md` | Checked the log against the conversation and edited it to describe my own process. |

## Benefits & Challenges
**Benefits:**
- Comparing my existing code with the new requirements showed me that several requirements (API, form
  validation, theme state) were already met, so I could focus on what was missing.
- Each feature came with an explanation (for example how `.sort()` compare functions, `localStorage`, and
  `setInterval` work), which helped me write my comments and understand the code.
- Converting the images to WebP made the page about nine times smaller, which I would not have known how to
  do quickly on my own.

**Challenges:**
- **Placeholder in a command:** I pasted `<NEW-REPO-URL>` into the terminal as it was, which caused a
  `zsh: parse error`, because `<` and `>` are special characters in the shell.
- **Push failing:** pushing to the new repository failed with `HTTP 400` and "the remote end hung up
  unexpectedly". It was fixed by increasing `http.postBuffer` and switching Git to HTTP/1.1.
- **Pasting in the wrong place:** I pasted the new project cards inside an old card, which nested the grid
  incorrectly and would have broken the layout.
- **Order of features:** the visitor-type code uses a function that the visitor-name code calls, so the
  features had to be added in the right order to avoid errors.
- **Formatting:** pasted code kept getting uneven indentation, which cost me marks in Assignment 2, so I had to
  re-format every file and turn on Format on Save.
- **Patch files:** Claude first gave me the features as patch files. I did not want to apply code I had not
  placed myself, so I asked for the copy-and-paste format instead.

## Learning Outcomes
- How sorting works in JavaScript: converting a NodeList to an array, writing a compare function that returns
  a negative, zero, or positive number, using a tie-break rule, and reordering elements with `appendChild`.
- Why storing dates as `YYYY-MM` text lets them be compared correctly without date conversion.
- How `localStorage` keeps state between visits, and how one `render()` function keeps the page in sync with
  the saved state.
- How a lookup object (`VISITOR_MESSAGES`) can replace a long chain of `if` statements.
- How `setInterval` and `document.hidden` work together for a timer.
- How image format and size, `loading="lazy"`, and `width` / `height` attributes affect page speed and
  Lighthouse scores.
- Git: how `git pull` from one repository and `git remote` let me copy a repository's history into a new one.

## Responsible Use & Modifications
- I added the code one feature at a time, tested each feature in the browser, and committed it separately with
  a clear message.
- I wrote my own comments for the new functions, using Claude's explanations to understand each part. I can
  explain how every feature works.
- I fixed the spacing and indentation myself and committed those changes without an AI credit.
- No AI output was submitted unreviewed. I checked the documentation against my code and edited it.
- Commits with AI-assisted code end with `Assisted-by: Claude (Claude Opus 5.5)`.
- The full conversation (C01) and the AI-generated files before my edits (A01–A07) are in the AI Evidence ZIP
  submitted on Blackboard (`202449720-NorahAljammaz-assignment3-ai-evidence.zip`). They are not committed to
  this repository.

## AI Usage Declaration
I declare that this report and the attached evidence document all of my AI use in this assignment, with
complete and unedited conversations, and that I understand and can explain all the code I submitted. I
understand that undeclared AI use or a false declaration will be treated as plagiarism according to KFUPM
regulations.

- **Name:** Norah Aljammaz
- **ID:** 202449720
- **Date:** 21 Nov 2026

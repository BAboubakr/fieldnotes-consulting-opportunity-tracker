# Fieldnotes — Personal Consulting Opportunity Tracker

A free-first static app for tracking paid consulting mandates, evaluator/reviewer assignments and free professional training. It is tailored to the professional background in the supplied career report. There is no backend or paid API.

## Run locally

Open `index.html` in a current browser, or run a local server from this folder:

```powershell
npx --yes http-server . -p 8080
```

Open <http://localhost:8080>. There is no build step or runtime dependency. Google Fonts are optional; system fonts are used offline.

## Publish on GitHub Pages

1. Create a **public** GitHub repository for the static site. The published source contains professional profile keywords and public opportunity/course details, but no private contact details, compensation, ID numbers or application-status history from the report.
2. Upload the contents of this folder to the repository root (so `index.html` is at the root).
3. In **Settings → Pages**, choose **Deploy from a branch**, select `main` (or the repository's default branch) and `/ (root)`, then save.
4. Open the HTTPS URL shown in the Pages settings. The initial build may take a short time to appear.

No environment variables or build command are needed. The app uses browser local storage. A public site URL does not make your saved opportunity/training progress public: that data stays in the local browser profile. Any visitor can still read the public source files and the seeded professional summary. Do not put private opportunity notes in a public source file.

## Tracks

- **Opportunities** is for paid consulting mandates and firm/consortium subcontracting leads. Ordinary permanent employment, fellowships, unpaid programmes, training and networking are excluded.
- **Evaluation work** is a dedicated track for paid proposal evaluation, technical review, independent assessment and monitoring assignments. Roster registration is not a contract or a guarantee of work.
- **LinkedIn** opens tailored native Posts and Jobs searches and tracks links captured manually from LinkedIn. Captures start as Verify until paid status, scope and eligibility are checked.
- **Free training** tracks courses currently described by their providers as free, including ChatGPT/OpenAI Academy, Microsoft Copilot/Microsoft Learn and Claude Academy, as well as energy, climate M&E and PV topics. Use the status menu to mark Interested, Enrolled, In progress, Completed or Skip. Review the provider page for account-plan requirements and optional certificate costs before enrolling.
- **My pipeline** tracks paid opportunities marked Shortlisted, Contacted or Applied.
- **Sources** provides official portals and profile-specific web-search links. Search results are discovery clues; verify every lead at the original notice.

## Data and profile fit

Opportunity and training progress are stored separately in browser `localStorage` keys. Export downloads a JSON backup containing both tracks; Import replaces both tracks when a combined backup is selected. The app has no automatic crawler. Each seeded listing has a source, check date and eligibility caveat. Fit scores help prioritize; they are not probabilities of selection.

LinkedIn discovery uses LinkedIn's own search pages. The app does not scrape posts, read a feed, or automate account activity. Copy the original post URL into **Capture LinkedIn opportunity**; the app stores the URL and notes you enter in browser-local data.

The profile uses work-relevant evidence from the report: 11+ years in renewable energy; PV and smart-grid leadership at Green Energy Park/IRESEN; HJT PV manufacturing and gigafactory pre-FID technical direction; testing, QA, certification and grid integration; three-country PTB consulting; IEA PVPS national delegate; technical evaluator, training consultant and M&E experience; e-mobility and industrial decarbonization; research publications; and Arabic, French, English and German. Private contact information, compensation, identity details, application history and unrelated personal context are not included in the public source.

## Current seed items

The AfDB Kabisa Electric item is a firm-only technical assistance EOI and should be approached only through a qualified bidding firm if its official terms allow it. The European Commission expert database is a rolling evaluator/monitor registration path; selection depends on profile fit and specific assignments. Course leads focus on climate M&E/MRV, sustainable finance, PV systems and practical use of ChatGPT, Copilot and Claude for research, analysis, writing and responsible AI review. AI product features practiced may depend on the learner's account plan. Existing browser data is migrated once to add the new AI training rows while preserving tracked statuses and notes. The report's August 2026 status labels were not carried forward as current application statuses.

## Maintenance

Before pursuing a lead, confirm deadline and timezone, fee/payment terms, individual versus firm eligibility, nationality/location restrictions, conflict-of-interest rules and application steps at the source. Replace or archive expired items. When adding training, verify the course remains free and disclose any optional paid credential cost in the notes.


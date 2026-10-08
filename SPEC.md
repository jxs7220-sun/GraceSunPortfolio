# Grace Sun — Architecture Portfolio

## What This Site Is

This is an architecture portfolio website presenting selected work by Grace Sun.

Its primary audience is graduate-school admissions reviewers.

The website should communicate a clear and memorable design identity while allowing visitors to quickly understand and explore individual projects.

The portfolio may contain architecture, urban design, interactive design, and related interdisciplinary work, but no project information should be invented.

## Primary Goal

Within the first ten seconds, a visitor should understand that this portfolio has a clear visual identity and that the projects are carefully curated.

The website should feel creative, experimental, architectural, soft, and atmospheric.

Projects remain the main focus.

## Site Name

Grace Sun — Architecture Portfolio

Grace Sun's name should not dominate the Home page.

The name should appear clearly on the About Me and Contact pages.

## Pages

### First working version

Promote chosen Scheme B to top-level index.html and build about.html, projects.html, and contact.html. All four pages have working relative navigation and labelled placeholders for missing content. Remove all three scheme folders. Supabase authentication is now required: login.html is public; all four portfolio pages check authentication and offer working Log Out controls. Deployment remains deferred. If email confirmation is enabled in Supabase, signup asks the visitor to confirm their email before logging in; an authenticated signup redirects to index.html.

The website contains four main pages:

- Home
- About Me
- Projects
- Contact

The site also contains:

- login.html

## 1. login.html

Purpose:

The front door to the entire portfolio.

Visitors must sign up or log in before they can see the portfolio.

Content:

- Site title
- Email input
- Password input
- Log In button
- Sign Up option
- Atmospheric architectural visual or placeholder
- Minimal supporting text

The design should feel like part of the portfolio, not like a generic software log-in screen.

login.html is never gated.

## 2. index.html — Home

The Home hero uses images/132.jpg, supplied by Grace Sun. Fill the existing Scheme B hero image frame using a responsive cover treatment without distortion. Center the crop, allowing only the cropping needed to fill the frame while retaining the canopy and angled architectural supports. Keep the current frame dimensions and layout unchanged. No project title or caption has been supplied for this image; omit the hero caption. All other page content and the layout remain unchanged.

Purpose:

Introduce the portfolio's visual identity and direct visitors toward selected projects.

Content:

- Main visual or hero project image
- Short portfolio introduction
- Selected project previews
- Navigation to About Me, Projects, and Contact
- Log Out control

Do not make Grace Sun's name the dominant element of the first screen.

Show project work quickly.

Avoid large amounts of introductory text.

Project previews should have different visual sizes so important projects can have greater emphasis.

## 3. about.html — About Me

Use the supplied content below on About Me with no [ADD: ...] placeholders. Use images/self.png as a transparent, full portrait. Omit experience and skills claims because none have been supplied.

Biography:
Grace Sun is an architecture student at the University of Miami with interests across architecture, interactive design, game design, and emerging technologies. Her work explores how spatial design can connect with digital interaction, user experience, and new forms of technology.

Education:
University of Miami
Bachelor of Architecture

Minors:
Game Design
Interactive Design

Design interests:
Architecture
Urban Design
Interactive Environments
Digital Experience
Game Design
Emerging Technology

Resume / CV:
Resume / CV available upon request.
Do not create a download button or link without an actual supplied resume file.

Purpose:

Introduce Grace Sun and provide background relevant to the portfolio.

Content may include:

- Grace Sun's name
- Personal portrait
- Short biography
- Architecture and design interests
- Selected education information
- Selected experience
- Resume or CV information
- Relevant design interests

Use only information supplied by Grace Sun.

Do not invent:
- Dates
- Degrees
- Awards
- Employers
- Skills
- Software
- Locations
- Academic information

If information is missing, use a clear placeholder or ask for it.

## 4. projects.html — Projects

Purpose:

Present and organize selected portfolio work.

Content may include:

- Project title
- Project category
- Main project image
- Short description
- Drawings
- Plans
- Sections
- Diagrams
- Models
- Renders
- Photography
- Process images
- Project text

Projects should not all have identical visual weight.

Important projects may occupy larger areas of the grid.

Each project should be easy to identify and visually separate from the next.

For now, individual project content may appear directly on this page unless Grace Sun later decides to add dedicated project-detail pages.

If dedicated project pages are added later, SPEC.md must be updated before building them.

## 5. contact.html — Contact

Purpose:

Provide a simple way to find Grace Sun's contact and professional information.

Content may include:

- Grace Sun
- Email
- Portfolio-related links supplied by Grace Sun
- Resume link if provided
- Short closing statement
- Log Out control

Do not invent contact information or social accounts.

## Navigation

Every portfolio page must provide navigation to:

Home
About Me
Projects
Contact

Every page except login.html must contain a Log Out control.

All links are relative.

Navigation should remain simple on desktop and mobile.

## Log-In Gate

Authentication uses Supabase.

Visitors can sign up using:

- Email
- Password

Visitors can log in using:

- Email
- Password

login.html is the authentication page and is never gated.

index.html is the Home page.

Every page except login.html must check authentication.

If a signed-out visitor manually types the address of any protected page, including an address ending in .html, they must be redirected to login.html.

After successful log-in, send the visitor to index.html.

After successful sign-up and authentication, send the visitor to index.html.

Every protected page must include a Log Out button.

After logging out, send the visitor to login.html.

## Content Rule

Never invent facts, dimensions, dates, project names, locations, software, roles, collaborators, academic information, or other factual content that Grace Sun has not provided.

Ask instead.

Temporary missing visual content should use a placeholder.

## Images

All user images go inside:

images/

Use web-optimized JPG or WebP files where possible.

If an image is over 500 KB, tell Grace Sun.

Every image must contain meaningful alt text.

Where an image has not yet been supplied, use a plain grey placeholder labelled clearly, for example:

[ADD: hero architecture project image]

[ADD: portrait of Grace Sun]

[ADD: project drawing]

[ADD: project model photograph]

Do not invent project images.

## Technical Build

Use only:

- HTML
- CSS
- JavaScript

Do not use:

- Frameworks
- npm
- Build tools
- React
- Vue
- Other JavaScript frameworks

Supabase must load using its CDN script tag.

index.html must sit at the top level of the project folder.

The website must work on desktop and mobile.

The repository is stored on GitHub.

The website is published from GitHub to Vercel.

## Responsive Behaviour

The website must work on a phone.

Desktop layouts may use a flexible multi-column grid.

Tablet layouts should reduce the number of columns.

Mobile layouts should prioritize:

- Readability
- Large enough text
- Easy navigation
- Appropriate image scaling
- Simple vertical scrolling

Avoid horizontal overflow.

## Accessibility

Every image must have alt text.

Text must have strong contrast against its background.

Navigation and buttons must remain readable.

Interactive elements should have clear hover and focus states.

Do not rely only on colour to communicate navigation state.

## Out of Scope

Do not build:

- Payments
- E-commerce
- Visitor profiles beyond authentication
- Visitor content storage
- Project databases
- Comments
- Messaging
- Database tables
- Private or sensitive content

The log-in page is a presentation gate, not a security system for confidential information.

## Done When

- [ ] The website works on a phone.
- [ ] The site contains Home, About Me, Projects, and Contact pages.
- [ ] The menu reaches every page.
- [ ] login.html works as the public front door.
- [ ] Visitors can sign up using email and password.
- [ ] Visitors can log in using email and password.
- [ ] Visitors can log out from every protected page.
- [ ] Signed-out visitors who directly type a protected .html page address are redirected to login.html.
- [ ] Successful log-in sends the visitor to index.html.
- [ ] Every image has alt text.
- [ ] Missing images use clear grey [ADD: ...] placeholders.
- [ ] No factual project or personal information has been invented.
- [ ] The website is responsive.
- [ ] Navigation is simple and understandable.
- [ ] Project hierarchy is visually clear.
- [ ] Animation remains subtle.
- [ ] The website does not resemble a generic portfolio template.
- [ ] The live website is deployed from GitHub to Vercel.
- [ ] The live link opens in a new tab or window where the interface links to it.

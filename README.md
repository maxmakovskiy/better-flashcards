# Better Flashcards

## 1 Description

This project is a fullstack web application developed during the final project of WEB course in HEIG-VD.

Better Flashcards is a learning platform that helps users retain knowledge by using flashcard approach of content organization and by employing spaced repetition algorithm [FSRS](https://open-spaced-repetition.github.io/ts-fsrs/).

This combination enables users to have the right information at the right time, improving long-term retention and making study sessions more efficient.


## Content

1.[Project description](#1-project-description) <br/>
2.[Features](#2-features) <br/>
3.[Project structure](#3-project-structure) <br/>
4.[Data model](#4-data-model) <br/>
5.[Endpoints](#5-api-endpoints) <br/>
6.[UI/UX](#6-uiux) <br/>
7.[Get started](#7-get-started) <br/>
8.[Technologies](#8-technologies) <br/>
9.[Acknowledgements](#9-acknowledgements) <br/>


## 2 Features

### 2.1 Core Features

The platform has next set of features:

- User authentication with identity provider
- Deck and Flashcard management (CRUD decks/cards, cards include text exclusively)
- Adaptive study system (spaced repetition scheduling)
- Interactive study mode (guess the other side of a card)
- Learning dashboard (track study progress, view study statistics)

### 2.2 Upcoming (Planned) Features

Bonus features if time permits:

- Cards can include the images and rich text
- More study modes (pair it/choose it/type it)
- Knowledge Graph Visualization of related cards within (among) subject(s)
- Replay previous study session
- Shared decks and collaborative editing
- Public/private decks

---

## 3 Project structure


It is not a full snapshot of the repo. Only important parts that are used daily got attention.
For more information, please refer to [nextjs docs](https://nextjs.org/docs)

````
/
├──docs/
│   │   ├── generated_mockup/                   // AI-generated images of possible UIs
│   │   ├── better-flashcard-er-schema.png      // ER schema of database
├──prisma/                                      // prisma generated client and types
├──src/
│   ├── app/                                    // app router
│   │   ├── _components/                        // UI components used in root page
│   │   ├── api/
│   │   │   ├── auth/                           // endpoints for Auth.js
│   │   │   ├── cards/
│   │   │   │   ├── [deckId]/
│   │   │   │   │   ├── [flashcardNum]           // endpoints to work with a specific card of a specific deck
│   │   │   │   │   ├── route.ts                 // endpoints to work with cards of specified deck
│   │   │   ├── dashboard/
│   │   │   │   ├── route.ts                     // endpoints to fetch different statics data
│   │   │   ├── decks/
│   │   │   │   ├── [id]/
│   │   │   │   │   ├── route.ts                  // endpoints to work with specific deck
│   │   │   │   ├── route.ts                      // endpoints to create a new deck or fetch all the decks
│   │   │   ├── session/
│   │   │   │   ├── [id]/
│   │   │   │   │   ├── add-review/
│   │   │   │   │   │   ├── route.ts               // endpoint to add new history review
│   │   │   │   │   ├── manage/
│   │   │   │   │   │   ├── route.ts               // endpoint to change status of a study session 
│   │   │   │   ├── decks/
│   │   │   │   │   ├── route.ts                    // endpoint to fetch decks to review 
│   │   │   │   ├── start/
│   │   │   │   │   ├── route.ts                    // endpoint to create a new study session
│   │   │   │   ├── streak/
│   │   │   │   │   ├── route.ts                    // endpoint to fetch info about current study streak
│   │   ├── flashcards/
│   │   │   ├── _components/                        // UI components of home page
│   │   │   ├── _providers/
│   │   │   │   ├── study-store-provider.tsx         // provider for study store
│   │   │   ├── _schemas/
│   │   │   │   ├── types/                           // Zod schemas for prisma generated types
│   │   │   │   ├── analytics-schema.ts              // Zod schema for dashboard page
│   │   │   ├── _stores/
│   │   │   │   ├── study-store.ts                   // study store to manage card review game
│   │   │   ├── dashboard/
│   │   │   │   ├── _components/                     // UI components for dashboard page
│   │   │   │   ├── _hooks/
│   │   │   │   │   ├── use-analytics.ts             // wrapper on SWR hook
│   │   │   │   ├── _lib/
│   │   │   │   │   ├── extract-analytics.ts         // helper function to extract different analytics from db
│   │   │   │   ├── page.tsx                         // dashboard page
│   │   │   ├── decks/
│   │   │   │   ├── _components/                      // UI components for all decks page
│   │   │   │   ├── _hooks/
│   │   │   │   │   ├── general-get-fetcher.ts        // generic fetcher function for GET requests exclusively
│   │   │   │   │   ├── use-all-decks.ts              // wrapper on SWR hook
│   │   │   │   ├── [id]/
│   │   │   │   │   ├── _components/                  // UI components for single deck page
│   │   │   │   │   ├── _hooks/
│   │   │   │   │   │   ├── use-cards.ts              // wrapper on SWR hook
│   │   │   │   │   │   ├── use-deck.ts               // wrapper on SWR hook
│   │   │   │   │   ├── page.tsx                      // single deck page
│   │   │   │   ├── page.tsx                          // all decks page
│   │   │   ├── profile/
│   │   │   │   ├── page.tsx                           // profile page
│   │   │   ├── layout.tsx                             // layout for home, dashboard, all decks, single deck, profile pages
│   │   │   ├── page.tsx                               // home page
│   │   │   ├── types.tsx                              // type aliases for prisma models
│   │   ├── fonts.ts                                   // NotoSans font
│   │   ├── globals.css                                // global CSS
│   │   ├── layout.tsx                                 // root layout
│   │   ├── page.tsx                                   // welcome page
│   │   ├── theme.ts                                   // custom colors organized in theme
│   ├── auth.ts                                        // Auth.js boilerplate for GitHub
│   ├── prisma.ts                                      // Prisma connection to db
│   ├── proxy.ts                                       // proxy to check auth for any URL matching '/flashcards/(.)*'
````

---

## 4 Data Model

Data model was havily inspired by Anki and FSRS algorithm.

![data model](./docs/better-flashcard-er-schema.png)

---

## 5 API Endpoints


---

## 6 UI/UX

Initial mockup can be found in [here](./docs/generated_mockup/v1/), it was generated by Gemini. But eventually I found it too simple, too dark, too unadapted for the app.

Therefore [2nd mockup](./docs/generated_mockup/v2) has been brough up by ChatGPT.
It has much more "air" in it, so it is the target for this project.

The application itself is mostly SPA, but in the way that each page is an SPA on itown 
without state being connected between the pages. This approach allows to pre-fill the data
on the server, so the client gets a fully interactive page that already contains something.
If user desires something more specific subsequent requests will be made, but this time
from the client.

This pattern in general looks this way:
```
request => 'decks/page.tsx' => fetch data from DB => 'decks/_components/all-decks-workspace.tsx' => sending prefilled client component to user
```

---

## 7 Get Started

---

## 8 Technologies

- Next.JS: fullstack web framework
- MUI: UI components library
- Auth.js (NextAuth.js): connect to GitHub OAuth as for indentity provider
- Prisma: ORM for Sqlite
- Sqlite: database
- SWR: data fetching
- FSRS: spaced repetition algorithm
- Zod: data schemas verification
- Zustand: global state management
- Date-fns: advanced work with date
- Typescript: types

---

## 9 Acknowledgements

Initially I was trying to generate every solution to every little problem by myself, but as load grows and time goes I figured that I will not cross the final line with fully done project in my hands. Therefore, I have started to more and more question ChatGPT about libraries suggestions, common patterns in them, known algorithm for data processing (for example how to find streak of day efficiently), etc. In this way I would like to acnowledge the use of AI in this project.


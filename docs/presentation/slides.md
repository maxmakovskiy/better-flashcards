---
marp: true
theme: default
paginate: true
html: true
header: 'WEB - Better Flashcards'
footer: 'Makovskyi Maksym · 10.06.2026'
size: 16:9
style: |
  @import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap');

  :root {
    --bg:     #F8F9FA;
    --bg2:    white;
    --bg3:    white;
    --border: #0D0C1D;
    --dark-blue: #161B33;
    --green:  #38b000;
    --orange: #ffa657;
    --red:    #ef233c;
    --yellow: #e3b341;
    --muted:  #495057;
    --text:   #161B33;
    --accent: white;
  }

  section {
    background: var(--bg);
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    font-size: 24px;
    padding: 52px 68px 64px;
    line-height: 1.6;
  }

  h1 {
    font-family: "Nunito", sans-serif;
    font-size: 1.7em;
    font-weight: 700;
    color: var(--dark-blue);
    border-bottom: 2px solid var(--border);
    padding-bottom: 0.25em;
    margin-top: 0;
    margin-bottom: 0.7em;
    letter-spacing: -0.02em;
  }
  h1::before { content: ''; }

  h2 {
    font-family: "Nunito", sans-serif;
    font-size: 0.9em;
    font-weight: 700;
    color: var(--orange);
    margin-bottom: 0.2em;
    margin-top: 0.8em;
  }
  h2::before { content: '## '; color: var(--muted); font-weight: 400; }

  ul, ol { padding-left: 1.4em; margin: 0.2em 0; }
  li { margin-bottom: 0.4em; color: var(--text); font-size: 0.95em; }
  li::marker { color: var(--dark-blue); }
  li > ul > li { font-size: 0.88em; color: var(--muted); }
  li > ul > li::marker { color: var(--muted); }

  blockquote {
    background: var(--bg2);
    border-left: 3px solid var(--dark-blue);
    border-radius: 0 6px 6px 0;
    padding: 0.5em 1em;
    margin: 0.8em 0 0;
    color: var(--dark-blue);
    font-family: "Nunito", sans-serif;
    font-size: 0.75em;
    line-height: 1.5;
  }
  blockquote > p { margin: 0; }

  code {
    background: var(--bg3);
    color: #00296b;
    font-family: "Nunito", sans-serif;
    font-size: 0.78em;
    padding: 1px 5px;
    border-radius: 4px;
    border: 3px solid var(--border);
  }

  pre {
    background: var(--bg2) !important;
    border: 3px solid var(--border) !important;
    border-left: 3px solid var(--green) !important;
    border-radius: 6px !important;
    padding: 0.8em 1em !important;
    font-size: 0.68em !important;
    margin: 0.5em 0 !important;
  }
  pre code {
    background: transparent !important;
    border: none !important;
    padding: 0 !important;
    color: var(--text) !important;
    font-size: 1em !important;
  }

  table {
    width: 100%;
    font-size: 0.78em;
    border-collapse: collapse;
    margin-top: 0.5em;
  }
  th {
    background: var(--bg3);
    color: var(--dark-blue);
    font-family: "Nunito", sans-serif;
    font-weight: 700;
    font-size: 0.85em;
    padding: 0.4em 0.7em;
    border: 3px solid var(--border);
    text-align: left;
  }
  td { padding: 0.35em 0.7em; border: 1px solid var(--border); color: var(--text); vertical-align: middle; }
  tr td { background: var(--bg); }
  tr:hover td { background: var(--bg3); }

  .columns { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 0.4em; }
  .col-5-5 { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 0.4em; }

  .box, .box-ok, .box-warn, .box-info {
    background: var(--bg2);
    border: 3px solid var(--border);
    border-radius: 6px;
    padding: 0.7em 1em;
    font-size: 0.82em;
    line-height: 1.5;
  }
  .box      { border-top: 3px solid var(--dark-blue); }
  .box-ok   { border-top: 3px solid var(--green); }
  .box-warn { border-top: 3px solid var(--red); }
  .box-info { border-top: 3px solid var(--yellow); }

  header {
    font-family: "Nunito", sans-serif;
    font-size: 0.48em;
    color: var(--muted);
    border-bottom: 3px solid var(--border);
    padding-bottom: 5px;
  }
  footer {
    font-family: "Nunito", sans-serif;
    font-size: 0.48em;
    color: var(--muted);
    border-top: 3px solid var(--border);
    padding-top: 5px;
  }
  section::after {
    font-family: "Nunito", sans-serif;
    font-size: 0.48em;
    color: var(--border);
    content: attr(data-marpit-pagination) ' / ' attr(data-marpit-pagination-total);
  }

  section.title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 72px 80px;
    position: relative;
  }
  section.title::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 6px; height: 100%;
    background: linear-gradient(180deg, var(--dark-blue) 0%, var(--accent) 100%);
  }
  section.title h1 {
    font-size: 3em;
    border: none; padding: 0;
    margin-bottom: 0.15em;
    line-height: 1.05;
    color: var(--dark-blue);
    letter-spacing: -0.03em;
  }
  section.title h1::before { content: ''; }
  section.title h2 {
    color: var(--text);
    font-size: 1em;
    margin-top: 0; margin-bottom: 2em;
    opacity: 0.7;
  }
  section.title h2::before { content: ''; }
  section.title p {
    color: var(--dark-blue);
    font-family: "Nunito", sans-serif;
    font-size: 0.65em;
    margin-top: 0;
    border-left: 2px solid var(--dark-blue);
    padding-left: 1em;
    line-height: 2;
  }
---

<!-- _class: title -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# Better Flashcards
## Online learning platform based on flashcards method and spiced with spaced repetition

<p>HEIG-VD WEB 2026<br>Makovskyi Maksym</p>

---

<style scoped>
  section {
    display: flex;
    flex-direction: column;
    align-items: center;

    h1,h2,h3,h4 {
      align-self: stretch;
    }
    img {
      border-radius: 5px;
      border: 1px solid var(--dark-blue);
    }
  }
</style>

# Anki as an inspiration source (for features)

![height:450](./anki_card_example.png)

---

# From Objectives to Features

<div class="columns">

<div>

#### Objectives

- Create and organize personalized learning materials into structured study decks
- Improve long-term knowledge retention through adaptive repetition and review scheduling
- Track learning progress and identify weak areas over time

</div>

<div>

#### Core Features

- User authentication with identity provider (GitHub)
- Deck and Flashcard management (CRUD ops on decks/cards, cards exclusively include text)
- Adaptive study system (spaced repetition scheduling, SM-2)
- Interactive study mode (guess the other side of a card)
- Learning dashboard (track study progress, view study statistics)

</div>

---

<style scoped>
  section {
    display: flex;
    flex-direction: column;
    align-items: center;

    h1,h2,h3,h4 {
      align-self: stretch;
    }
    img {
      border-radius: 5px;
      border: 1px solid var(--dark-blue);
    }
  }
</style>

# Data Model

![height:500](./../better-flashcard-er-schema.png)

---

<style scoped>
  section {
    display: flex;
    flex-direction: column;
    align-items: center;

    h1,h2,h3,h4 {
      align-self: stretch;
    }
  }
</style>


# Generated mockups (Gemini - 1)

![height:500](./../generated_mockup/v1/home_flashcards.png)

---

<style scoped>
  section {
    display: flex;
    flex-direction: column;
    align-items: center;

    h1,h2,h3,h4 {
      align-self: stretch;
    }
  }
</style>

# Generated mockups (Gemini - 2)

![height:500](./../generated_mockup/v1/deck_flashcards.png)

---

<style scoped>
  section {
    display: flex;
    flex-direction: column;
    align-items: center;

    h1,h2,h3,h4 {
      align-self: stretch;
    }
    img {
      border-radius: 5px;
      border: 1px solid var(--dark-blue);
    }
  }
</style>

# Generated mockups (ChatGPT - 1)

![height:500](./../generated_mockup/v2/flashcards_cards_2.png)

---

<style scoped>
  section {
    display: flex;
    flex-direction: column;
    align-items: center;

    h1,h2,h3,h4 {
      align-self: stretch;
    }
    img {
      border-radius: 5px;
      border: 1px solid var(--dark-blue);
    }
  }
</style>

# Generated mockups (ChatGPT - 2)

![height:500](./../generated_mockup/v2/flashcards_analytics_2.png)

---

# Technologies selection

<div class="columns">

<div class="box">

#### Initially

- Next.js
- MUI
- Zustand
- Motion React
- Prisma
- Sqlite
- NextAuth.js
- Typescript
- SuperMemo 2 (SM-2)

</div>

<div class="box">

#### Currently

<div class="columns">

<div>

- Next.js
- MUI
- ~~Motion React~~
- Zustand
- Prisma
- Sqlite
- NextAuth.js
- Typescript
- ~~SM-2~~

</div>

<div>

- SWR (_new_)
- Zod (_new_)
- Free Spaced Repetition Scheduler (_new_)
- Date-fns (_new_)

</div>

</div>

</div>

</div>


---

# Challenges (1) Types 

#### How to type this whole thing ?


<div class="columns">

<div>

- Use Prisma types generated from models ? Is it enough ?

```js
model StudySession {
  sessionId String @id @default(cuid())
  startedAt DateTime @default(now())
  endedAt DateTime?
  status StudySessionStatusEnum
  totalReviews Int @default(0)
  correctAnswers Int @default(0)
  avgResponseTimeMs Int?
  deckId String
  deck Deck @relation(fields: [deckId], references: [deckId])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  reviewedCards ReviewHistory[]
}

```

</div>

<div>

- Not really

```js
// study-store.ts:68
const session: StudySessionModel = await fetch(
    '/api/session/start',
    {
        method: 'POST',
        body: JSON.stringify({ deckId: selectedDeck?.deckId }),
    }).then(res => {
        if (!res.ok) {
            throw new Error(`Failed to create new session for deck with id=${selectedDeck?.deckId}`)
        }
        return res.json()
    })
// session.startedAt is string and not a Date
// session.status is string and not enum
```

- What to do ? The answer is **Zod**

</div>

</div>

---

# Challenges (2) Types

#### Zod

<div class="columns">

<div>

- Define Zod schema for `StudySession`

```js
// study-session-schema.ts
export const StudySessionSchema = z.object({
    sessionId: z.string(),
    startedAt: z.coerce.date(),
    endedAt: z.coerce.date().nullable(),
    status: ???,
    totalReviews: z.number(),
    correctAnswers: z.number(),
    avgResponseTimeMs: z.number().nullable(),
    deckId: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date()
})
```

</div>

<div>

- What is up with `status` ?

```js
// schema.prisma
enum StudySessionStatusEnum {
  STARTED
  PAUSED
  FINISHED
}
```

- Simple use `z.enum`

```js
export const StudySessionStatusSchema = z.enum(StudySessionStatusEnum)
```

- Finally, use `StudySessionSchema`

```js
// later in study-store.ts:73
then(res => {
  if (!res.ok) {
    throw new Error(`Failed to create new session for deck with id=${selectedDeck?.deckId}`)
  }
  return res.json()
}).then(s => StudySessionSchema.parse(s))
```

</div>

</div>

---

# Challenges (3) Data fetching 1

<div class="columns">

<div>

- Given this endpoint, how would you fetch data ?

| Endpoint          | Description                                  |
|-------------------|----------------------------------------------|
| `GET  /api/decks` | Returns all the decks with flashcards inside |

Returned type:

```js
export type EnhancedDeckModel = DeckModel & { flashcards: FlashcardModel[] }
```

- Would you use `fetch`, `useEffect` and `useState`/`Context` ?

- There is something better ?

</div>

<div>

- Yes, **SWR**. It does everyhing above + data (re-)validation

```js
// _hooks/use-all-decks.ts
const { data, error, isLoading, isValidating, mutate } = 
  useSWR<EnhancedDeckModel[], Error>(
    '/api/decks',
    (url: string) => generalGetFetcher(url)
        .then(obj => EnhancedFlashcardsDeckArraySchema.parse(obj) as EnhancedDeckModel[])
  )
```

- But then the real challenge arises - pre-fill client component on the server
_Note (from https://react.dev/reference/rsc/use-client)_:
  - Client Components are components in a render tree that are rendered on the client.
  - Server Components are components in a render tree that are rendered on the server

</div>

</div>


---

# Challenges (3) Data fetching 2

<div class="columns">

<div>

#### Pre-filling data for SWR

It can be solved by fetching data in server component and passing promise as fallback data to client component, in this way entry in cache referenced by `url` used to fetch data is already prefilled when client component calls `useSWR`

</div>

<div>

- Server Component
```js
export default async function DecksPage() {
  // ...
  const decksPromise: Promise<EnhancedDeckModel[]> = prisma.deck.findMany({
      where: { userId: session.user?.id },
      include: { flashcards: true }
  })
  return (
      <SWRConfig
          value={{
              fallback: {
                  '/api/decks': decksPromise,
              },
          }}
      >
          <AllDecksWorkspace />
      </SWRConfig>
  )
}
```

</div>

</div>


---

# It is demo time !

---

# Specification

### What has or has not been done according to intial design document ?

<div class="columns">

<div class="box">

#### Technologies

| Name               | Reason                                                                                                      |
|--------------------|-------------------------------------------------------------------------------------------------------------|
| React Motion       | Material design guideliness advises against Card flipping as method to reveal card content                  |
| SuperMemo 2 (SM-2) | Obsolete (1987) and not really appearing (you should wait a day for repeat card that you don't know at all) |

</div>

<div class="box">

#### Features

Reason is one - I've run out of time.

- Deck information editing
- Deck deletion
- (*) Filtering and Searching through collection of Decks/Cards
- (*) No way to update the algorithm settings from UI

_(*) was not a part of initial design document but can be considered this way_

</div>

</div>

---

# Further development

- Proper errors display
- Cards can include the images and rich text
- Tags
- Filtering and search
- Session details
- More study modes (pair it/choose it/type it)
- Public/private decks 
- More charts and analytics data for dashboard (example: Knowledge Graph Visualization of related cards among related decks)
- Replay previous study session
- Shared decks

---

# Thank you for your attention !


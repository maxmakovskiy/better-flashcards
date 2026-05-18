# Design Document for "Better flashcards"

## Content

1.[General information](#1-general-information)
2.[Project description](#2-project-description)
3.[Objectives](#3-objectives)
4.[Features](#4-features)
3.[Technologies](#5-technologies)
3.[Architecture](#6-architecture)
3.[Possible Future Developments](#7-possible-future-developments)

## 1. General Information

- **Project name**: Better Flashcards
- **Team members**: Maksym Makovskyi
- **Git repository link**: https://github.com/maxmakovskiy/better-flashcards.git

## 2. Project Description

It is a learning platform that uses flashcards in its core, but it also provides tools to analyze learning progress.
It is something that I personally use very often, primary example is Anki flashcards, so it is really easy to concretize the final product.

## 3. Objectives

The platform allows users to:
- create and organize personalized learning materials into structured study decks
- improve long-term knowledge retention through adaptive repetition and review scheduling
- track learning progress and identify weak areas over time

## 4. Features

### 4.1 Core Features

The features the application **must** provide in order to be considered complete:

- User authentication (create accound, log-in)
- Deck and Flashcard management (CRUD decks/cards, cards can include text or/and images)
- Adaptive study system (spaced repetition scheduling)
- Interactive study mode (pair/choose/guess/type the other side of a card)
- Learning dashboard (track study progress, view study statistics)

### 4.2 Optional Features

Bonus features if time permits:

- Knowledge Graph Visualization of related cards within (among) subject(s)
- Replay previous study session
- Shared decks and collaborative editing

## 5. Technologies

List the planned technologies and **briefly justify each choice**.

For example:

* **Frontend**: React, MUI, Zustand, Framer Motion
* **Backend**: Next.js
* **Database**: Prisma, Sqlite (or Posgres)
* **Authentication** Auth.js
* **Other tools**: *(tests, linter, build tools…)*

## 6. Architecture

Overview of the components and their interactions (client, server, database, third-party services, etc.). A small diagram is welcome.

- db entity-relashionship schema

## 7. Possible Future Developments

*(Optional)* Ideas for future improvements identified but outside the scope of the lab/project:
- Elements of social network (list of friends/clubs of interest/competitions)

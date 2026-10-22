# TypeScript Practice

## OVERVIEW

Build a website to manage Books:

- Users can view all the books when there is no category filter
- Click book to see the details on a new page
- Switch theme between light and dark
- Change view mode (grid or list)
- Filter books by Category
- Sort books in alphabetical, release year and country order
- Search books by name
- Add, edit, delete books

## TARGETS

- Apply React Typescript and Tailwind CSS
- Create responsive website
- Apply Storybook
- Performance minimum 98%
- Apply React hooks
- Check and avoid unnecessary re-renders
- Deploy to Vercel

## TECHNICAL

- **React** v18.2.0: A free and open-source front-end JavaScript library for building user interfaces based on components.
- **Type Script** v4.9.3: TypeScript is JavaScript for application-scale development. It is a strongly typed, object-oriented, compiled language.
- **Tailwind CSS** v3.0: A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.
- **Storybook** v6.5: A frontend workshop for building UI components and pages in isolation.
- **React Router Dom** v6.6.1: An npm package that enables you to implement dynamic routing in a web app.
- **Mock data**: Books are seeded from `src/data/books.json` and changes are saved in the browser's `localStorage`, so no backend is needed.
- **Vercel** v25.0.0: Vercel is the platform for frontend developers, providing the speed and reliability innovators need to create at the moment of inspiration.

## TIMELINE

- Estimate: 15 working days.
- Actual: 18 working days.

## TEAM SIZE

- 1 developer

## EDITOR

- Visual Studio Code

## DOCUMENTS

- **My training plan**: [link](https://docs.google.com/document/d/1SY5nHxXrrya1FRRci9DSCYu7e6giYUHTkCF0pxFObss)
- **Practice 1 document**: [link](https://docs.google.com/document/d/1Jw-nMQjDa5C8ZbzNAOY4yh-e_PUrwz1A20YpIeX4cCA/edit#)

## GUIDELINE

1. Clone repository: `git clone git@github.com:quannguyen-agilityio/claude-training.git`
2. Check out branch: `git checkout sample-project`
3. CD to the main folder: `cd ./practice-one`
4. Install packages with pnpm 11 (pinned in `package.json`; run `corepack enable` to use it automatically): `pnpm install --frozen-lockfile`
5. Run the project: `pnpm dev` (no backend or `.env` needed)
   - To reset the data to the seed, run `localStorage.removeItem('books'); location.reload();` in the browser console
6. Run the storybook: `pnpm storybook`

## AUTHOR

- Quan Nguyen
- Email: `quan.nguyen@asnet.com.vn`

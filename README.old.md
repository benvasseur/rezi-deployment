# REZI 241016-Ben

## URL Shortener

The project consists of building a simple URL Shortener App that will cover **Frontend**, **Backend API**, **DB storing/fetching**, and **Deployment**, using the following stacks:
- React (`Vanilla React` or `Next.JS - App Router`) + `TypeScript`.
- API: `CREATE`, `GET`, `DELETE`, using [Netlify Functions](https://www.netlify.com/platform/core/functions/)
- Database: `PostgreSQL` (You can host it on your way, or using a free service such as [Aiven](https://aiven.io/free-postgresql-database))
- Deploy: `Netlify`.

## Guidelines

### Commits

We require regular and small commits.

### Frontend

#### Path `/`

Provide a submitting form to shorten a URL from its input. The data should be sent to an API `Netlify Function`.
Take as an example, Youtube URLs: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`. The API should provide a response
including the new shortened URL, such as example: `https://your_host/:shortid` -> `https://your_host/dQw4`

#### Path `/:shortid`

Should call the API `GET`, with the `:shortid` then redirect the user to the full URL following the HTTP Redirect conventions.

---

### Backend Netlify Functions

#### `CREATE`:
You should receive the full URL in the *body* payload, and save it in the database. API Response could provide the new shortened URL.
Duplicate entries are allowed.

### `GET`:
Receive the `shortened URL` (ex: `[dQw4](https://your_host/dQw4)`). This handle should decode the `short id` to match the incremental ID from the DB to be fetched.
If an entry is found, redirect the user following the HTTP Redirect Code conventions.

### `DELETE`:
Receive the `short id` (ex: `dQw4`), and delete the entry from the database. API returns proper HTTP status.

---

## Database

The primary key will be incremental rather than uuid_v4. The table should be as follows:

| ID  | URL  |
|---|---|
| 1  | https://app.rezi.ai/dashboard/resumes  |
| 2  | https://www.reddit.com/r/Rezi/  |
| ... | 

! We do not store the short ID in the database.

## Deployment

Deploy your project using Netlify and provide us the preview deploy link by email at: `luc@rezi.io`

## UI/UX

We require the use of Tailwind.

## Resources

- [React](https://react.dev)
- [NextJS](https://nextjs.org)
- [Netlify](https://netlify.com)
- [Netlify Functions](https://www.netlify.com/platform/core/functions/)
- [Aiven](https://aiven.io/free-postgresql-database)

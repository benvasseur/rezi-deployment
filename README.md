# URL Shortener

A simple URL Shortener application that allows users to shorten URLs, view a list of shortened URLs, copy them to the clipboard, open them in new tabs, and delete URLs.

## Demo

**TODO**: Link to live demo once deployed.

## Features

- Shorten URLs using a simple form.
- View and manage a list of shortened URLs.
- Copy shortened URLs to clipboard.
- Open URLs in a new tab.
- Delete URLs with a confirmation prompt.
- Visual notifications for actions (e.g., URL copied to clipboard).

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Netlify Functions
- **Database**: PostgreSQL

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/REZI-HR/241016-Ben.git
    cd 241016-Ben
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables for PostgreSQL connection in `.env`:

    ```
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    DB_HOST=your_db_host
    DB_PORT=your_db_port
    DB_NAME=your_db_name
    ```

4. Run the project locally:

    ```bash
    netlify dev
    ```

## Deployment

The project is designed for deployment on Netlify. You can deploy it via Netlify by connecting your GitHub repository or by using Netlify CLI.

## Screenshots

![screenshot](<Screenshot 2024-10-20 at 18.26.51.png>)

![screenshot](<Screenshot 2024-10-20 at 18.27.06.png>)

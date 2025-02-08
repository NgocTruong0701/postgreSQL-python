# Phonebook (FastAPI, PostgreSQL, Python, Typescript, Less.js)

A simple phonebook application with a FastAPI backend serving an API and a static site. The static site is written in TypeScript 5.3.2 without libraries, using Less.js for styling, and HTML5. The FastAPI API connects to a PostgreSQL database.

## Features

- **FastAPI Backend:**
  - Implements a RESTful API for managing contacts in a phonebook.
  - Utilizes FastAPI for efficient and fast development.

- **PostgreSQL Database:**
  - Stores contact information in a PostgreSQL database for data persistence.

- **Static Site:**
  - Written in TypeScript 5.3.2 without external libraries.
  - Uses Less.js for styling.
  - Provides a user-friendly interface for interacting with the phonebook.

## Prerequisites

- Python 3.x
- PostgreSQL
- Node.js (for TypeScript compilation)
- NPM

## Working on

- Create form
- Edit phone
- Local host support

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/quangle23/postgreSQL-python.git
   cd postgreSQL-python
   ```

2. **Set up the virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up the PostgreSQL database:**
   - Set the credentials on the `.env`  file.

5. **Run the FastAPI server:**
   ```bash
   uvicorn main:app --env-file .\.env
   ```

6. **Compile TypeScript and Less.js for the static site:**
   ```bash
   cd client
   npm run build
   ```

7. **Open the static site:**
   - Open `http://127.0.0.1:8000/` in a web browser.

## License

This project is licensed under the [MIT License](LICENSE).
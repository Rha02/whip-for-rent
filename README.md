# WhipForRent
WhipForRent is a full-stack web application to simulate a car rental system.

### Tools
Tech Stack:
- Database: MySQL
- Backend: Node.js + Express, TypeScript
- Frontend: Next.js + React, TypeScript

### Installation Instructions
1. Clone repository
```sh
git clone https://github.com/Rha02/whip-for-rent
```
2. Install dependencies on the backend
```sh
cd ./backend && npm install
```
3. Install dependencies on the frontend
```sh
cd ../frontend && npm install
```
4. Create an `.env` file inside the `./backend` directory, and populate the following fields:
```
PORT=
JWT_SECRET=
MYSQL_HOST=
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_DATABASE=
MYSQL_PORT=
AZURE_STORAGE_CONNECTION=
```
5. Create an `.env` file inside the `./frontend` directory, and populate the following fields:
```
SERVER_HOST=
```
6. Start a development server inside the `./backend` folder:
```sh
npm run dev
```
7. Start a development server inside the `./frontend` folder:
```sh
npm run dev
```
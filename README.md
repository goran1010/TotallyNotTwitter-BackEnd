# Express Prisma Backend Template

Back-end for Totally Not Twitter app built with Node, Express and Prisma.

A very simple project with session based auth using Passport, ability to customize your Profile, add and follow people and like and comment on posts.

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database server
- npm or yarn

## Database Requirements

Before installation, make sure to:

1. Create a PostgreSQL database for development
2. Create a separate PostgreSQL database for testing
3. Note down your database credentials for the `.env` file

## Installation

```bash
# Clone the repository
git clone git@github.com:goran1010/TotallyNotTwitter-BackEnd.git

# Navigate to project directory
cd TotallyNotTwitter-BackEnd

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your database credentials and secret

# Initialize database and run migrations
npx prisma migrate dev
```

## Usage

```bash
# Start development server with hot reload
npm run dev

# Start production server
npm run start

# Run tests
npm run test
```

## Environment Variables

- `DATABASE_URL`: PostgreSQL URL for development database
- `TEST_DATABASE_URL`: PostgreSQL URL for test database
- `SECRET`: Session secret key
- `SUPABASE_KEY`: Your Supabase API key

## License

MIT

# Next.js Forum

A Simple Next.js forum, using Next.js middleware

![WIP](https://img.shields.io/badge/status-WIP-yellow)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![License](https://img.shields.io/badge/license-MIT-blue)

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: [Prisma](https://prisma.io/)

## Getting Started

```bash
# Clone the repository
git clone https://github.com/313xx/NextJS-Forum.git

# Navigate to the project
cd nextforum

# Install dependencies
npm install

# Copy the `.env` file from the example and configure your setup: 
cp .env.example .env

# Generate Prisma client from the existing schema
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Run the development server
npm run dev
```

Visit `http://localhost:3000` to see the application running.

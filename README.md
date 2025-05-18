# Edu Portal

Frontend application for the educational platform built with React.

## Technologies

- React 19
- TypeScript
- React Router 7
- Axios for API communication
- date-fns for date manipulation

## Local Development Setup

### Prerequisites

- Node.js 18+ and npm

### Steps to Run Locally

1. Clone the repository:
```bash
git clone https://github.com/EduApplication/edu-portal
cd eduportal
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the project root:
```
REACT_APP_API_URL=https://localhost:5001/api
```

4. Start the development server:
```bash
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

To build the app for production:

```bash
npm run build
```

This creates optimized files in the `build` folder.

## Docker Development

You can also run the frontend using Docker:

```bash
docker build -t eduportal:latest .
docker run -p 3000:80 eduportal:latest
```

## Project Structure

- **src/components/** - Reusable React components
- **src/pages/** - Application pages
- **src/services/** - API services
- **src/hooks/** - Custom React hooks
- **src/context/** - React context providers
- **src/types/** - TypeScript type definitions
- **src/utils/** - Utility functions

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from create-react-app

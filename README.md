# Vibe Estimate: AI-Powered App Cost Calculator

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/mugumogan/generated-app-20251016-212809)

Vibe Estimate is a sophisticated web application designed to calculate the lifetime cost of developing and hosting various types of applications. It provides users with a transparent and comprehensive breakdown of costs, development timelines, and technology stacks. The core feature is the 'Vibe Coding' efficiency adjustment, an intelligent AI-powered calculation that demonstrates a 75% reduction in development time compared to traditional methods. The application guides the user through a seamless multi-page flow: selecting an app type, configuring specific features and services, and finally viewing a detailed results page with cost breakdowns, a dynamic development task list, and a tailored technology stack recommendation.

## Key Features

-   **AI-Powered Cost Estimation**: Leverages a "Vibe Coding" multiplier to estimate development time with a 75% efficiency gain.
-   **Comprehensive App Selection**: Choose from 22 specific application types across 9 categories.
-   **Dynamic Configuration**: Tailor your estimate with specific platforms, databases, hosting solutions, and feature sets.
-   **Detailed Cost Breakdowns**: Get a clear view of first-year costs, monthly recurring expenses, and a detailed list of development tasks.
-   **Technology Stack Generation**: Receive a complete, recommended technology stack based on your configuration choices.
-   **Futuristic & Responsive UI**: A clean, dark-themed, and fully responsive interface built for an excellent user experience on any device.

## Technology Stack

-   **Frontend**: React 18, Vite, TypeScript
-   **Styling**: Tailwind CSS, shadcn/ui
-   **State Management**: Zustand
-   **Animation**: Framer Motion
-   **Routing**: React Router v6
-   **Backend**: Cloudflare Workers
-   **API**: Hono

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later)
-   [Bun](https://bun.sh/) package manager

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/vibe-estimate.git
    cd vibe-estimate
    ```

2.  **Install dependencies:**
    ```sh
    bun install
    ```

3.  **Set up environment variables:**

    Create a `.dev.vars` file in the root of the project and add your Cloudflare AI Gateway credentials. You can get these from your Cloudflare dashboard.

    ```ini
    CF_AI_BASE_URL="https://gateway.ai.cloudflare.com/v1/YOUR_ACCOUNT_ID/YOUR_GATEWAY_ID/openai"
    CF_AI_API_KEY="your-cloudflare-api-key"
    ```

4.  **Run the development server:**
    ```sh
    bun dev
    ```
    The application will be available at `http://localhost:3000`.

## Usage

The application provides a simple, multi-step process to estimate your application costs:

1.  **Home Page**: Start by clicking the "Start Estimating" button.
2.  **Select App Type**: Choose the type of application you want to build from a grid of options.
3.  **Configure**: Fill out the form with your desired platforms, services, features, and expected user load.
4.  **View Results**: See a detailed breakdown of your estimated costs, development timeline, and a recommended technology stack.

## Project Structure

The codebase is organized into two main parts: the frontend application and the backend worker.

-   `src/`: Contains all the frontend code.
    -   `pages/`: React components for each page of the application.
    -   `components/`: Shared React components, including `shadcn/ui` components.
    -   `store/`: Zustand store for global state management.
    -   `lib/`: Utility functions and static data definitions.
-   `worker/`: Contains the Cloudflare Worker backend code.
    -   `index.ts`: The entry point for the worker.
    -   `userRoutes.ts`: Hono route definitions for the API.
    -   `agent.ts`: The core logic for the ChatAgent Durable Object.

## Deployment

This project is designed for seamless deployment to Cloudflare Pages.

1.  **Login to Wrangler:**
    ```sh
    bunx wrangler login
    ```

2.  **Deploy the application:**
    ```sh
    bun run deploy
    ```
    This command will build the frontend application and deploy it along with the Cloudflare Worker to your Cloudflare account. Make sure to configure your environment variables in the Cloudflare dashboard for the deployed project.

Or deploy directly with the button below:

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/mugumogan/generated-app-20251016-212809)
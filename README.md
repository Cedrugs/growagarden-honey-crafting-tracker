# <div align="center">Grow a Garden Honey Crafting Tracker</div>

<div align="center">
  <img src="public/assets/logo.png" alt="Grow a Garden Logo" width="200"/>
  
  [![Live Preview](https://img.shields.io/badge/Live%20Preview-grow.samuelcedric.com-blue)](https://grow.samuelcedric.com)
  [![Live Preview](https://img.shields.io/badge/Live%20Preview-honey%2Dtracker.vercel.app-blue)](https://honey-tracker.vercel.app/)
</div>

A web application to help players track their plant cycles and honey production in the game Grow a Garden. This tracker allows you to manage different plant variants, including their mutations, and calculate honey production.

## Features

- Track multiple plant variants with different mutations
- Real-time honey production calculation
- Cycle management system
- Persistent storage using localStorage
- Beautiful and responsive UI
- Support for all plant types and mutations
- Docker support for easy deployment

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Docker (optional, for containerized deployment)

### Installation

#### Local Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/growagarden-tracker.git
cd growagarden-tracker
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

#### Docker Deployment

1. Build the Docker image:
```bash
docker build -t growagarden-tracker .
```

2. Run the container:
```bash
docker run -d -p 80:80 growagarden-tracker
```

3. Access the application at `http://localhost`

The Docker setup uses a multi-stage build process:
- First stage uses Node.js Alpine to build the application
- Second stage uses Nginx Alpine to serve the built application
- The final image is optimized for production use

## Usage

### Tracking Plants

- Each plant is tracked by both its name and mutation type
- Use the + and - buttons to adjust the quantity of each plant
- The honey production is automatically calculated based on your plant quantities

### Managing Cycles

- The tracker shows how many complete cycles you have available
- Use the "Finish 1 Cycle" button to remove one cycle from all plants
- The "Reset All" button clears all plant quantities

### Plant Information

Each plant entry shows:
- Plant name
- Current quantity
- Honey production value
- Mutation type
- Weight

## Development

### Project Structure

```
growagarden-tracker/
├── src/
│   ├── data/
│   │   └── plants.ts      # Plant data definitions
│   ├── types/
│   │   └── type.ts        # TypeScript type definitions
│   ├── pages/
│   │   └── Home.tsx       # Main application page
│   └── main.tsx           # Application entry point
├── public/
│   ├── assets/
│   │   ├── logo.png       # Application logo
│   │   └── icons/         # Plant icons
├── Dockerfile            # Docker configuration
└── package.json
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Docker Commands

- `docker build -t growagarden-tracker .` - Build the Docker image
- `docker run -d -p 80:80 growagarden-tracker` - Run the container
- `docker stop $(docker ps -q --filter ancestor=growagarden-tracker)` - Stop the container

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- Local Storage for data persistence
- Docker
- Nginx

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Grow a Garden game developers for creating such an amazing game
- All contributors who help improve this tracker

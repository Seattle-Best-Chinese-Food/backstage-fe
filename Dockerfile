FROM node:18

WORKDIR /app

COPY package.json ./
COPY vite.config.js ./

RUN yarn

COPY . .

# Expose the Vite default port
EXPOSE 5173

# Start the React application using Vite
CMD ["npm", "run", "dev"]
FROM node:18-slim

WORKDIR /app

# Install CA certs (Debian way)
RUN apt-get update && apt-get install -y ca-certificates \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci --only=production

COPY . .

ENV PORT=5000
ENV SPEC_PATH="api.json"
ENV MONGO_URI="mongodb+srv://sah246ir:7y4EqtELtRmxAMOo@cluster0.dp2nc41.mongodb.net/?retryWrites=true&w=majority"

EXPOSE 5000

CMD ["npm", "run", "start"]

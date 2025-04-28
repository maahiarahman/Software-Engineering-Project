# Use Node.js base image
FROM node:latest

# Set a working directory inside the container
WORKDIR /src

# Copy package.json and package-lock.json to leverage caching
COPY package*.json /src/

# Install application dependencies
RUN npm install -g supervisor \
    && npm install \
    && npm install express-flash --save

# Copy the rest of the application files
COPY . /src

# Expose application port (3000)
EXPOSE 3000

# Start the application
CMD ["supervisor", "app.js"]

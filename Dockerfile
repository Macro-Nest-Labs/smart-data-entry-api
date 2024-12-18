# Use an official Node runtime as a parent image
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy Yarn release and configuration to the container
COPY .yarn .yarn
COPY .yarnrc.yml .

# Copy the project files
COPY package.json .
COPY yarn.lock .

# Install dependencies
RUN yarn install --immutable

# Copy the rest of your application's code
COPY . .

ENV NODE_ENV=production

# Build your application
RUN yarn build

# Your app binds to port 8080 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 8080

# Define the command to run your app
CMD [ "node", "./dist/app.js" ]

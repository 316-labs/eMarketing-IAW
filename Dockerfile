FROM node:7.4.0

# Create app directory
RUN mkdir -p /src/emarketing
WORKDIR /src/emarketing

# Install app dependencies
COPY package.json /src/emarketing/
RUN npm install

# Bundle app source
COPY . /src/emarketing

# Build and optimize react app
RUN npm run build

EXPOSE 3001

# defined in package.json
CMD [ "npm", "run", "start" ]
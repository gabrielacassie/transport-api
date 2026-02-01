FROM node:22-alpine

WORKDIR /app

COPY package.json .
# package-lock.json might not exist yet if install isn't done, but usually it does. 
# We'll assume the user will run this after install or we copy everything.

COPY . .

# If dependencies are not installed in the image (which they shouldn't be if we copy node_modules from host, but best practice is to install in image)
# However, for dev speed, we can just run it. For now, let's do a proper build.
RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--host"]

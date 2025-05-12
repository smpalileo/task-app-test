# Task App Test

## Description

This is a simple task management application built with Next.js 15, MongoDB (using Mongoose), MUI (Material UI) and Clerk for authentication and user management.

Design decisions and assumptions will be explained further down the Readme file.

## Getting Started

### Local

If you want to run it normally in your own local environment, install the dependencies using:

```bash
npm i
```

Then run the development server using:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Docker

Alternatively, you can use build the Docker image to run it in a container:

```bash
docker build -t \<image-name\> .
```

Then run it with

```bash
docker run -p 3000:3000 \<image-name\>
```

Open [http://localhost:3000](http://localhost:3000) or [http://0.0.0.0:3000](http://0.0.0.0:3000) with your browser.

## System Design

### Why Next.js

I used Next.js because it's simple to set up and is readily a full-stack application, providing its own backend services in one repository. I think it's perfect for prototypes and simple applications like this one.

### Why MongoDB (and Mongoose)

I used MongoDB because I knew I would only be dealing with one entity (Task) and this is the easiest for me to set up. I also chose Mongoose because it's easy to integrate with Typescript and Next, as well as creating a validation schema using Zod.

### Why only one entity???

You might be asking where I store the data for users. For this app, I chose an authentication provider I've never used before: [Clerk](https://clerk.com/).

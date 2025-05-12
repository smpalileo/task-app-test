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

### Cloud

You can skip all that and access the cloud version here: [https://task-app-test-six.vercel.app](https://task-app-test-six.vercel.app)

### Setup

All three methods will ask you to create a user first, through Clerk. You can use an email+password combination or just sign up through Google.

\*\* I've noticed that if you signed up using your Google account first, it sometimes redirects you to the Clerk homepage instead of the app's actual homepage. Sorry about that.

## System Design

### Why Next.js

I used Next.js because it's simple to set up and is readily a full-stack application, providing its own backend services in one repository. I think it's perfect for prototypes and simple applications like this one.

### Why MongoDB (and Mongoose)

I used MongoDB because I knew I would only be dealing with one entity (Task) and this is the easiest for me to set up. I also chose Mongoose because it's easy to integrate with Typescript and Next, as well as creating a validation schema using Zod.

### Why only one entity???

You might be asking where I store the data for users. For this app, I chose an authentication provider I've never used before: [Clerk](https://clerk.com/).

I came across this on Reddit when I was just browsing around and after going through the NextAuth/BetterAuth/whateverAuth argument rabbithole, I came across Clerk.

As someone who wants to get this app done as quickly as possible, Clerk provided an all-in-one solution for user management, authorization and authentication, as well as providing pre-built Sign In, Sign Out and Sign Up components. It still provided me with the necessary JWT sessions I'd get with NextAuth (which I've used the most before), while also reducing the overhead necessary to handle user data. Two birds with one stone!

### Components

Here comes the difficult part:

Frontend design is admittedly my weakest area and I wouldn't know what to do without component libraries like Shadcn and Material UI. Even then, I feel like my frontend output is subpar.

Nevertheless, it works and I think it's decent enough to not have a confusing user experience for the most part. I also think I could've done a lot better with how dynamic and molecular the components were but I stuck with "ugly but works" instead of "ran out of time because I couldn't match whatever that template looked like"

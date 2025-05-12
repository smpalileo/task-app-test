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

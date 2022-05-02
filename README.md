This project uses [nextjs](https://nextjs.org/).

## Getting Started
First of all install the dependencies:
```bash
npm install
## or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Go to production
First, you need to build the app:

```bash
npm run build
# or
yarn build
```

Then, the app can be started by running `start` command:

```bash
npm run start
# or
yarn start
```

## Run the backend app
This project uses [workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces). The API code is alocated in `server/` directory that is a defined as a workspace.

To start the API server, run the following command:
```bash
npm run start:backend
# or
yarn start:backend
```

The app will start at port 3001, you can modify it by specifying `PORT` environment variable.

> In case you wanna change the port, you probably have to change the API url that the nextjs app is using to fetch the data.
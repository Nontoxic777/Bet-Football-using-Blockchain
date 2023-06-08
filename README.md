# This is learning project

### So it not all following the best practices

### How to run the project

#### Run centeralized-server

1. cd to centeralized-server
2. run `npm install`
3. run `npm start`

#### Run client

1. cd to client
2. run `npm install`
3. run `npm start`

#### Hardhat Source

1. cd to hardhat-source
2. run `yarn install`
3. config .env file (see .env.example). If you run local hardhat network, you can leave the .env file as it is.
4. run `yarn hardhat deploy --tags all` to deploy the contracts (This will create a contract abi and contract address file in client/src/constants)

# External Resolver

This project aims to scale the Ethereum Name Service (ENS) by reducing costs for users and increasing its usage. The strategy involves combining existing patterns such as [ERC-3668](https://eips.ethereum.org/EIPS/eip-3668), [EIP-5559](https://eips.ethereum.org/EIPS/eip-5559), [ENSIP-10](https://docs.ens.domains/ensip/10) and [ENSIP-16](https://docs.ens.domains/ensip/16), along with proof of concepts to develop a comprehensive reference codebase for the industry.

The primary objective of this project is to enhance the scalability of ENS while making it more cost-effective for users. By increasing its usability, we aim to foster broader adoption within the community.

## Components

* **L1 Resolver**: A contract that is responsible for redirecting the request to the specified external source, such as L2 protocols and an external database.
* **L2 Resolver Contract**: L2 contract that is able to resolve ENS domains to its corresponding address, as well as fetch information such as Twitter handle and avatar image.
* **Gateway**: An API capable of handling reading data from an external source following the flow specified by the [EIP-5559](https://eips.ethereum.org/EIPS/eip-5559).
* **Client**: A module that is able to read ENS domain properties even when stored in external data sources.

## Usage

To run this application locally, follow these steps:

1. Clone this repository to your local machine.
2. Copy the `env.example` to a `.env` file on the root directory
3. Install dependencies by running:

```bash
npm install
```

### Database setup

1. Run local postgres instance (currently no initial data is inserted)

```shell
docker-compose up db -d
```

2. Deploy the contracts locally:

```bash
npm run contracts start
```

3. Start the gateway

```bash
npm run gateway dev
```

## Deployment

It's required to have the [Railway CLI](https://docs.railway.app/guides/cli) installed.

1. Install the Railway CLI through: `npm i -g @railway/cli`
2. Login into your Railway account: `railway login`
3. Link the repo to the project:  `railway link`
4. Build project: `turbo build --filter=@blockful/gateway...`
5. Test bundle locally: `npm run gateway start:db`
6. Deploy the Gateway: `railway up`

## Contributing

We welcome contributions from the community to improve this frontend application. To contribute, please follow these guidelines:

1. Fork the repository and create a new branch for your feature or bug fix.

2. Make your changes and ensure they follow the project's coding conventions.

3. Test your changes locally to ensure they work as expected.

4. Create a pull request with a detailed description of your changes.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

Special thanks to the Ethereum Name Service (ENS) community for their contributions and support.

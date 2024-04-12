<div align="center">
  <img src=".assets/ManasAI.png" alt="ManasAI" height="100" />
</div>

# ManasAI

[![Build](https://github.com/yashpokar/ManasAI/actions/workflows/verify.yml/badge.svg)](https://github.com/yashpokar/ManasAI/actions/workflows/verify.yml)

ManasAI, inspired by the groundbreaking [Devin AI](https://www.cognition-labs.com/introducing-devin) by Cognition Labs, is an open-source venture aiming to redefine software engineering through AI. This project harnesses advanced technologies for automating development tasks, enhancing code quality, and streamlining the software lifecycle. Ideal for developers and engineers seeking AI-augmented tools to boost productivity and innovation. Join us in pioneering the next wave of AI in software engineering with ManasAI.

[Demo](https://github.com/yashpokar/ManasAI/assets/7402810/a53817c6-3071-4c19-9ebe-98ffdaebd7d2)

> [!IMPORTANT]
> Currently, The project is in its infancy and can be considered experimental. Many features are either not yet implemented or are not working as intended. We warmly welcome contributions to assist in its development and progress!

## Requirements

To ensure a smooth setup and operation of this project, please ensure your environment meets the following requirements:

### Node.js

- Node.js 16 or newer is required.
- You can download the latest version of Node.js from [the official Node.js website](https://nodejs.org/).

### Docker

- Docker and Docker Compose are required for containerization and orchestration.
- Follow the installation guides for Docker and Docker Compose on [the official Docker website](https://docs.docker.com/get-docker/) to set up on your system.

### pnpm

- pnpm is required as the package manager for this project.
- To install pnpm, ensure you have Node.js installed, then run `npm install -g pnpm` in your terminal.

## Installation

To install ManasAI, clone the repository and run the following command:

```shell
make setup
```

Create a `.env` file in the root directory and add the following environment variables:

```shell
cp .env.example .env
```

## Usage

To run ManasAI, execute the following command:

```shell
make run
```

## Roadmap

- [x] Multi project
- [ ] Multi model
- [ ] Multi agent
- [x] Dedeicated sandbox to test the code in isolation
  - [x] Terminal tool to display the commands (ran by the agent) and the output
  - [ ] Allow the user to run the commands
- [ ] Dedicated web browser to test web based code in isolation
  - [x] Browser tool to display the output
  - [ ] Multiple driver support (Chrome, Firefox, Safari, etc.)
- [ ] Dedicated mobile amulator to test mobile based code in isolation
  - [ ] Mobile tool to display the output
- [ ] Dedicated desktop amulator to test desktop based code in isolation
  - [ ] Desktop tool to display the output
- [ ] Code editor
  - [ ] Display the code written by the agent
  - [ ] Allow the user to edit the code

## Contributing

We welcome contributions to ManasAI! Please refer to the [Contributing Guidelines](docs/CONTRIBUTING.md) for more information on how to get involved.

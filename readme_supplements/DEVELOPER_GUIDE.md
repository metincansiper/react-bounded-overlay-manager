# Developer Guide for React Bounded Overlay Manager

## Introduction
This guide provides essential information for developers interested in contributing to or working with the React Bounded Overlay Manager project.

## Setting Up the Development Environment
1. Clone the repository.
2. Run `npm install` to install dependencies.

## Building the Library
- Run `npm run build` to build the project. The output will be in the `dist` directory.

## Running Tests
- Execute `npm run test` for unit or simpler integration tests. These tests typically focus on internal logic and functionality, not requiring a full browser environment.
- Execute `npm run test:browser` for comprehensive tests that simulate a browser environment, including headless mode. This option is suitable for in-depth UI and interaction testing with Cypress, providing a closer approximation to user experiences.

## Updating the Docs
- Execute `npm run build-and-deploy-storybook`

## Contributing
- Fork the repository and create a new branch for your feature or fix.
- Make sure to include tests for new features.
- Submit a pull request with a clear description of the changes.

## Publishing to NPM
- Update the version number in `package.json`.
- Run `npm publish` to publish the package to NPM.

For any issues or questions, please open an issue in the GitHub repository.

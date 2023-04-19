# CREATE REACT PACKAGE

This package provides the minimum configuration to create a react package to export components with a preview for development... And it's blazingly fast!

# USAGE

## Notes before using

Create the **.env** configuration file if you want to configure the ports where the dev servers will run (example using bash)

    cp .env.example .env

This is the port where the hot reload server will run, default is 3000

> REACT_PREVIEW_PROXY_PORT

This is the port where the esbuild server will run, if you don't specify one, it will run on a randomly port

> ESBUILD_SERVER_PORT

## Installation

    npm i

## Commands

    npm run start

To start the application on preview mode with hot-reload, it will start a server on default port 3000 with everything you declare on the path above, (the entrypoint of your app)

> src/Preview.tsx

    npm run build

To build the application for npm publishing, first ensure all you want to bundle it's included on this file

> src/index.ts

This file is ignored from the src directory on the build process (only used to preview your app before shipping)

> src/Preview.tsx

# UNDER THE HOOD

For **preview mode**, the hot reload it's a combination of this solutions:

https://github.com/evanw/esbuild/issues/802

implemented on the new esbuild context API with a proxy server suggested on the documentation of esbuild:

https://esbuild.github.io/api/#serve-proxy

the entrypoint of the server is

> public/index.html

For **build mode** it's being used tsc compiler to generate js and types declarations from

> tsconfig.build.json

That extends 

> tsconfig.json

For debugging, I have sourcemap enabled on esbuild on dev mode that enables breakpoints on the **src** directory (a vscode debugging config is included on the project)

# IMPROVEMENTS

Error handling on build implementations.
Ability to select an host instead of localhost.
Using a single server for hot-reload feature.
Addition of config for jest tests on developed components for build export.
# NOTES

I'm fresh on packaging and npm publishing, so any stupid thing i said on the readme, feel free to correct me :smiley:

My motivation was messing around with esbuild and go over the edge on it's capabilities, hot reload it's not officially supported and this implementation goes kinda around the block to achieve that.

The esbuild context allows to listen to build events by implementing a plugin on the context that has access to that event, i can wait for **onEnd** to request and update on the clients array that then emit an sse event that it's triggered by a js banner injection declaration on the bundle of an eventSource that will listen the refresh event launched on the proxy server.

HMR isn't also supported and i didn't digged on that way.

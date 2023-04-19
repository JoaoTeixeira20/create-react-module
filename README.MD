# CREATE REACT PACKAGE

This package provides the minimum configuration to create a react package to export components with a preview for development

# USAGE

## Notes before using

Create the **.env** configuration file before using this project and set the ports where you want to run this project (example using bash)

    cp .env.example .env

This is the port where the preview server will run, default is 3000 (where you preview your components)

> REACT_PREVIEW_EXAMPLE_SERVER_PORT

This is the port where the hot-reload server will run, default is 3001

> HOT_RELOAD_SSE_SERVER_PORT
## Installation

    npm i

## Commands

    npm run start

To start the application on preview mode with hot-reload, it will start a server on default port 3000 with everything you declare on the path above, (the entrypoint of your app)

> src/Preview.tsx

    npm run build

To build the application for npm publishing, first ensure all you want to bundle it's included on this file

> src/index.ts

This file is ignored from the src directory

> src/Preview.tsx

# UNDER THE HOOD

For **preview mode**, it's being used esbuild watch and serve feature along with an eventSource server to emit reloads when the files change, the eventSource client it's loaded into the html entrypoint page that loads the port configuration along with the bundle from esbuild

> public/index.html

For **build mode** it's being used tsc compiler to generate js and types declarations from

> tsconfig.build.json

That extends 

> tsconfig.json

For debugging, I have sourcemap enabled on esbuild that enables breakpoints on the **src** directory (a vscode debugging config is included on the project)

# IMPROVEMENTS

Error handling on esbuild and eventSource servers and if port configuration is missing.
The server doesn't check if the port is used doesn't give feedback on the issue.
default ports are hardcoded and spreaded on the project, needs refactor.
Automation tests.
# NOTES

I'm fresh on packaging and npm publishing, so any stupid thing i said on the readme, feel free to correct me :smiley:

My motivation was messing around with esbuild and go over the edge on it's capabilities, hot reload it's not officially supported and this implementation goes kinda around the block to achieve that.

Since the watch context doesn't allow configurations yet and the only way to catch file changes to emit events it's implementing a plugin that has access to the build events, i can wait for onEnd to request a reload to the sse server that is subscribed by the browser client that will receive the event to reload the page, but it's a hacky way and requires an additional server to handle hot reloading of the browser.

HMR isn't also supported and i didn't digged on that way.
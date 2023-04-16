# CREATE REACT MODULE

This package provides the minimum configuration to create a react module to be used as a package to export components with a preview for development

# USAGE

## Installation

    npm i

## Commands

    npm run start

To start the application on preview mode, it will start a server on default port 3000 with everything you declare on

> src/Preview.tsx

    npm run build

To build the application for npm publishing, first ensure all you need to be avaliable to use is exported in

> src/index.ts

This file is ignored from the src directory

> src/Preview.tsx

# UNDER THE HOOD

For **preview mode**, it's being used nodemon along esbuild plugin to reload and compile the module that is being used on 

> public/index.html

Nodemon watches the src directory for changes and each time reloads the esbuild and restarts the server to refresh the content, but a manual browser window is required to visualize the changes

For **build mode** it's being used tsc compiler to generate js and types declarations from

> tsconfig.build.json

That extends 

> tsconfig.json

For debugging, I have sourcemap enabled on esbuild that enables breakpoints on the **src** directory (a vscode debugging config is included on the project)

# IMPROVEMENTS

For package building, it's being used solely tsc compiler, I made a couple of experiments with esbuild along with tsc with **emitDeclarationOnly** to bundle the js from esbuild and types from tsc, but esbuild seems to conflict with external imports the project might have (in this case I imported "@react-spring/web" and the main project I installed the package that is a **next.js 13** project also uses the same dependency and a useMemo error was thrown when i declare the **SampleComponent** from the package), my goal is to use esbuild solely for packaging, without any webpack or similar tools for bundling for blazingly fast build times.

The bundling it's only done for module import **ES2020**, any other format like **commonjs** would be welcomed to make this project more compatible with both new and old js import methods.

An hot-reload feature would be cool to implement, any help would be welcomed.

# NOTES

I'm fresh on packaging and npm publishing, so any stupid thing i said on the readme, feel free to correct me :smiley:
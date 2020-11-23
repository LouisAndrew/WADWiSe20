# WADWiSe20

## Is now using webpack!

### Requirements:
- Install node -> `sudo apt install nodejs`
- Install npm -> `sudo apt install npm`
- Then install yarn -> `npm i -g yarn`

### How to start?
- Go to project directory
- Run `yarn`
- Dependancies would be installed
- Run `yarn serve` to start development server. (No more live-server extension from Vscode needed.)

### Dependancies used?
- Webpack: Bundling js files into one big file. Export import is now available in the project
- Webpack-cli: Helper
- html-webpack-plugin: Bundling html file into a bundle with the js file
- webpack-dev-server: Used to start the dev server
- css-loader: Load css into the webpack bundle
- style-loader: Load css into the webpack bundle

### How does it work?
- When you run `yarn build`, webpack would bundle all js and html (also css file inside src folder) into the dist folder (minified + optimized)
- When you run `yarn serve`, webpack would start a development server which listens to file changes and rebuilding the bundle every time a change is detected.

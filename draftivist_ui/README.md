This is configured to work with docker-compose. 

## Development tips

It was a bit of a PITA to get JSX and Typescript to work together with Mithril. I was able to hack a solution which uses [closure components](https://mithril.js.org/components.html#closure-component-state) to handle state, which is the recommended approach in the Mithril docs. The returned component object needs to conform to the `JSX.Element` type to work with JSX/Typescript, so I include dummy `elementAttrs` in each component object, and the closure function returns a `BaseComponent` defined in `src/components/base.tsx`. Mithril-provided components like `Link` also need to be wrapped, so use the `Link` component in `src/components/base.tsx` rather than the default Mithril component.

If you can figure out a better approach please do!

## Working with VSCode

VSCode has a nifty feature called [remote containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers). Follow the instructions to attach to a running container. Now your IDE environment is localized to your Docker container and you can make updates without worrying about polluting your local machine. One nice thing is you can access the container shell directly from VSCode.


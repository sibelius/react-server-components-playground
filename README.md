**NOT PRODUCTION READY**

# Server Components Boilerplate 

This is a React Server Components Boilerplate to make it easy starting building app using Server Components

it is based on [server-components-demo](https://github.com/reactjs/server-components-demo)

## How to start

Run the plugin and loader transpilation using babel

```bash
yarn plugin
```

Run the Client and Server Bundler at the same time
```bash
yarn start
```

## Some explanations

[./plugin](./plugin) folder has some copied and modified react-server-dom-webpack files

### ReactFlightWebpackPlugin modifications
- Be able to have client references using Typescript

## ReactFlightWebpackLoader
- A loader to be used on the server to transform client references
- It is similar to ReactFlightWebpackNodeRegister
- This enable avoiding transpiling on the fly in production

```jsx
{
        test: /\.client.(js|jsx|ts|tsx)?$/,
        use: [{
          loader: require.resolve('./plugin/ReactFlightWebpackLoader'),
        }, {
          loader: 'babel-loader?cacheDirectory',
        }],
        exclude: [
          /node_modules/,
          path.resolve(__dirname, '.serverless'),
          path.resolve(__dirname, '.webpack'),
        ],
      },
```



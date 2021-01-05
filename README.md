# Server Components Boilerplate (Not for Production) 

This is a React Server Components Boilerplate to make it easy to experiment with using Server Components

it is based on [server-components-demo](https://github.com/reactjs/server-components-demo)

## Can I use this in production?

🔴 🔴 🔴 **Oh dear, no. Please, DO NOT use this in production!** 🔴 🔴 🔴

As [stated on the React blog](https://reactjs.org/blog/2020/12/21/data-fetching-with-react-server-components.html), Server Components are an early experimental tech preview, and are nowhere close to being usable or supported for production apps today.

This boilerplate **is not** developed by the React team, and **does not** represent how Server Components will actually be integrated by the time they are stable. Instead, the first high-quality integrations will be developed in collaboration with React frameworks.

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



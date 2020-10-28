
const { ApolloProvider } = require("@apollo/client");
const React = require("react")
const { client } = require("./src/apollo/client");
const { GlobalContextProvider } = require("./src/context/authContext");


export const wrapRootElement = ({element}) => (

    <ApolloProvider client={client}>
    <GlobalContextProvider>
    {element}
    </GlobalContextProvider>
    </ApolloProvider>
)
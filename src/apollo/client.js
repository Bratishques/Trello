import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client'
import {SubscriptionClient, addGraphQLSubscriptions} from 'subscriptions-transport-ws';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';


const httpLink = new HttpLink({
    uri: 'http://localhost:5000/graphql'
  });

const wsClient = new WebSocketLink({
    uri: `ws://localhost:5000/graphql`,
    options: {
      reconnect: true
    }
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsClient,
    httpLink,
  );

export const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
    SubscriptionClient: wsClient
})
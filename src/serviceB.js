const { buildFederatedSchema } = require('@apollo/federation');
const { ApolloServer, gql } = require('apollo-server');

const server = new ApolloServer({
	introspection: true,
	schema: buildFederatedSchema([
		{
			typeDefs: gql`
				extend type Query {
					pingServiceB: String
				}
			`,
			resolvers: {
				Query: {
					async pingServiceB() {
						throw new Error('This does not get relayed through the gateway when using a managed federated gateway.');
					}
				}
			}
		}
	])
});

server.listen({ port: process.env.PORT, host: '0.0.0.0' }).then(({ url }) => {
	console.log(`🚀 ServiceB ready at ${url}.`);
});

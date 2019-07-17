const { buildFederatedSchema } = require('@apollo/federation');
const { ApolloServer, gql } = require('apollo-server');

const server = new ApolloServer({
	schema: buildFederatedSchema([
		{
			typeDefs: gql`
				extend type Query {
					pingServiceA: String
				}
			`,
			resolvers: {
				Query: {
					pingServiceA() {
						return 'Pong!';
					}
				}
			}
		}
	])
});

server.listen({ port: process.env.PORT, host: '0.0.0.0' }).then(({ url }) => {
	console.log(`🚀 ServiceA ready at ${url}.`);
});

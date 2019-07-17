const { ApolloGateway } = require('@apollo/gateway');
const { ApolloServer } = require('apollo-server');

const gateway = new ApolloGateway();

// Uncomment to do the initial run to setup the managed federated services as well as see the error
// be relayed as it should.
// process.env.ENGINE_API_KEY = ' ';
// const gateway = new ApolloGateway({
// 	serviceList: [
// 		{
// 			name: 'serviceA',
// 			url: 'http://localhost:4001'
// 		},
// 		{
// 			name: 'serviceB',
// 			url: 'http://localhost:4002'
// 		}
// 	]
// });

const server = new ApolloServer({
	subscriptions: false,
	gateway,
	engine: {
		apiKey: process.env.ENGINE_API_KEY
	}
});

server.listen({ port: process.env.PORT, host: '0.0.0.0' }).then(({ url }) => {
	console.log(`🚀 ServiceA ready at ${url}.`);
});

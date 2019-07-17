# Demonstrating Apollo issue #3052

This is a barebones example that demonstrates the apollo-server issue #3052.

## Symptoms

When using a managed federated gateway, the underlying service errors are not properly
relayed through to the client.

## Steps

1. Create a new apollo engine project and setup your .env file with the `ENGINE_API_KEY`.
2. Initial Run
    - Comment out line 4 of `src/gateway.js`
    - Uncomment lines 6-20 of `src/gateway.js`
3. Execute `npm start` to begin the services
4. In a new terminal run the following commands to push managed services
    - npm run push:serviceA
    - npm run push:serviceB
5. For shits and giggles, navigate to http://localhost:4000 and execute the following query to see that the error is relayed properly.
    ```graphql
    query Ping {
      pingServiceA
      pingServiceB
    }
    ```
6. Revert comments from above
    - Uncomment line 4 of `src/gateway.js`
    - Comment out lines 6-20 of `src/gateway.js`
7. Execute `npm start`
8. Follow step 5 and you will see an error that does not contain the message that is expected, but rather something alone the lines of: "addProtobufError called after stopTiming!"

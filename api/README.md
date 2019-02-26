# api

[![LoopBack](https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)

# Testing:
By default loopback 4 has a explorer for the endpoints to access them you will need to specify the url in this case:
 - localhost:3000
You will be able to see all the endpoints for the api, but you will only have access to get /users/newuser and /ping.
This is due to the implementation of an authentication provider.

In order to test the api a tool like postman is needed to make requests to the api. In order to do so, you will need to create a new user and then log in with your credentials. When you log in, you will recieve a token, you need to save said token to access the rest of the endpoints.

With said tokens you are free to make requests to all the endpoints in the api, even changing your username or password. When creating the user, it's recommended to not send an ID, that way mongodb can assign a unique ID to it.

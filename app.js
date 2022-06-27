const express = require('express')
const app = express()
const PORT = 6969
const userData = require('./Mock_DATA.json')
const graphql = require("graphql");
const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
  } = graphql
const {
    graphqlHTTP
} = require('express-graphql')
const bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(express.json())

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {
            type: GraphQLInt
        },
        first_name: {
            type: GraphQLString
        },
        second_name: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        getAllUsers: {
            type: new GraphQLList(UserType),
            args: {
                id: {
                    type: GraphQLInt
                }
            },
            resolve(parent, args) {
                return userData
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: {
            type: UserType,
            args: {
                first_name: {
                    type: GraphQLString
                },
                last_name: {
                    type: GraphQLString
                },
                email: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                userData.push({
                    id: userData.length + 1,
                    first_name: arg.firstName,
                    last_name: args.lastName,
                    email: args.email
                })
                return args
            }
        }
    }
})

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphql: true
}))

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
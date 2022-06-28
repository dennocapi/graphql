const graphql = require("graphql");
const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
} = graphql
const UserData = require('../Mock_DATA.json')
const UserType = require("./TypeDefs/UserType")

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
                return UserData
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
                const id = UserData.length + 1
                UserData.push({
                    id: id,
                    first_name: args.first_name,
                    last_name: args.last_name,
                    email: args.email
                })
                console.log(UserData[1000])
                return args
            }
        }
    }
})

module.exports = new GraphQLSchema({query: RootQuery, mutation: Mutation})
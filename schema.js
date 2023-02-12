const { gql } = require('apollo-server-express');

exports.typeDefs = gql `
   
   

    type Employee {
        id: ID!
        firstname: String!
        lastname: String!
        email: String!
        gender: String!
        salary: Float!
    }

    type User {
        id: ID!
        username: String!
        email: String!
        password: String!
       
    }

    type Query {
        getEmployees: [Employee]
        getEmployeeByID(id: ID!): Employee
        login(username: String!, password: String!): String
    }

    type Mutation {
        addEmployee(firstname: String!
            lastname: String!
            email: String!
            gender: String!
            salary: Float!): Employee

        updateEmployee(id: String!
            firstname: String!
            lastname: String!
            email: String!
            gender: String!
            salary: Float!): Employee
        
        deleteEmployee(id: String!): Employee
        createAccount(username: String!, email: String!, password: String!):  User
    }
`
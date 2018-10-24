import { ApolloServer, gql } from 'apollo-server';
import { ResidentAPI, ReportsAPI, TransactionAPI } from './datasource';

const { find, filter } = require('lodash');

const typeDefs = gql`
    type Resident {
        _id: ID
        name: String!
        birth_date: String
        admission_date: String!
        gender: String!
        state: String
        contact_name: String
        contact_phone: Int
        diseases: String
    }

    type Report_type {
        id: ID!
        Type: String!
    }

    type Report {
        id: ID!
        report_type: Report_type
        created_at: String
        IP: String
    }

    type Transaction {
        id: ID!
        type_transation_id: ID!
        total_amount: Int
        observation: String
        balance: Int
        contact_name: String
    }

    type Query {
        resident(idNumber: String!): Resident
        residents: [Resident]
        report(idNumber: Int!): Report
        reports: [Report]
        report_types: [Report_type]
        report_type(idNumber: Int!): Report_type
        transaction(idNumber: String!): Transaction
        transactions: [Transaction]
    }

    type Mutation {
        newResident(    name: String!
                        birth_date: String!
                        admission_date: String!
                        gender: String!
                        state: String
                        contact_name: String
                        contact_phone: Int
                        diseases: String): Resident
        newReport(      report_type: Int
                        created_at: String
                        IP: String): Report
        newReportType(  Type: String): Report_type
        newTransaction( type_transation_id: Int!
                        total_amount: Int
                        observation: String
                        balance: Int
                        contact_name: String
                        quantity: Int
                        subtotal: Int): String

        editResident(   _id: ID!
                        name: String
                        birth_date: String
                        admission_date: String
                        gender: String
                        state: String
                        contact_name: String
                        contact_phone: Int
                        diseases: String): Resident
        editReport(     id: ID!
                        report_type: Int
                        created_at: String
                        IP: String): Report
        editReportType( id: ID!
                        Type: String): Report_type
        editTransaction(id: ID!
                        type_transation_id: Int
                        total_amount: Int
                        observation: String
                        balance: Int
                        contact_name: String):Transaction

        deleteResident(_id: ID!):String
    }
`;

const resolvers = {
    Query: {
        resident: (root, { idNumber }, { dataSources }) => dataSources.ResidentAPI.getAResident(idNumber),
        residents: (root, args, { dataSources }) => dataSources.ResidentAPI.getAllResidents(),
        report: (root, { idNumber }, { dataSources }) => dataSources.ReportsAPI.getAReport(idNumber),
        reports: (root, args, { dataSources }) => dataSources.ReportsAPI.getAllReports(),
        report_type: (root, { idNumber }, { dataSources }) => dataSources.ReportsAPI.getAType(idNumber),
        report_types: (root, args, { dataSources }) => dataSources.ReportsAPI.getAllTypes(),
        transaction: (root, { idNumber }, { dataSources }) => dataSources.TransactionAPI.getATransaction(idNumber),
        transactions: (root, args, { dataSources }) => dataSources.TransactionAPI.getAllTransactions(),
    },
    Mutation: {
        newResident: (root, args, { dataSources }) =>  dataSources.ResidentAPI.createAResident(args),
        newReport: (root, args, { dataSources }) =>  dataSources.ReportsAPI.createAReport(args),
        newReportType: (root, args, { dataSources }) =>  dataSources.ReportsAPI.createAReportType(args),
        newTransaction: (root, args, { dataSources }) =>  dataSources.TransactionAPI.createATransaction(args),

        editResident: (root, args, { dataSources }) =>  dataSources.ResidentAPI.editAResident(args),
        editReport: (root, args, { dataSources }) =>  dataSources.ReportsAPI.editAReport(args),
        editReportType: (root, args, { dataSources }) =>  dataSources.ReportsAPI.editAReportType(args),
        editTransaction: (root, args, { dataSources }) =>  dataSources.TransactionAPI.editATransaction(args),

        deleteResident: (root, args, { dataSources }) =>  dataSources.ResidentAPI.deleteATransaction(args),
    },
    Report: {
        report_type: (root, { report_type_id }, { dataSources }) =>  dataSources.ReportsAPI.getAType(root.report_type_id),
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        ResidentAPI: new ResidentAPI(),
        ReportsAPI: new ReportsAPI(),
        TransactionAPI: new TransactionAPI(),
    }),
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});

import { ApolloServer, gql } from 'apollo-server';
import { ResidentAPI, ReportsAPI, TransactionAPI } from './datasource';

const { find, filter } = require('lodash');

const typeDefs = gql`
    type Resident {
        _id: ID!
        identity_document: Int
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
    Report: {
        report_type: (root, { report_type_id }, { dataSources }) =>  dataSources.ReportsAPI.getAType(root.report_type_id),
    }
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

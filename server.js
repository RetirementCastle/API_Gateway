import { ApolloServer, gql } from 'apollo-server';
import { ResidentAPI, ReportsAPI } from './datasource';

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
        reports: [Report]
    }

    type Report {
        id: ID!
        report_type: Report_type
        created_at: String
        IP: String
    }

    type Query {
        resident(idNumber: String!): Resident
        residents: [Resident]
        report(idNumber: Int!): Report
        reports: [Report]
        report_types: [Report_type]
    }
`;

const resolvers = {
    Query: {
        resident: (root, { idNumber }, { dataSources }) => dataSources.ResidentAPI.getAResident(idNumber),
        residents: (root, args, { dataSources }) => dataSources.ResidentAPI.getAllResidents(),
        report: (root, { idNumber }, { dataSources }) => dataSources.ReportsAPI.getAReport(idNumber),
        reports: (root, args, { dataSources }) => dataSources.ReportsAPI.getAllReports(),
        report_types: (root, args, { dataSources }) => dataSources.ReportsAPI.getAllTypes(),
    },
    Report: {
        report_type(Report){
            return filter(report_type, { id: Report.report_type_id })
        }
    },
    Resident: {
        identity_document: ({ idDoc }) => idDoc,
        diseases: ({ reportedDiseases }) => reportedDiseases,
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        ResidentAPI: new ResidentAPI(),
        ReportsAPI: new ReportsAPI(),
    }),
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});

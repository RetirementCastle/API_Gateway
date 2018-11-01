import { ApolloServer, gql } from 'apollo-server';
import { ResidentAPI, ReportsAPI, TransactionAPI, EmployeeAPI, NursingHomesAPI } from './datasource';

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

    type Employee {
        id: ID!
        name: String
        age: Int
        title: String
        email: String
        salary: Int
        headquarter: ID
        status: Boolean
        username: String
        password: String
        identification: String
        phone: String
        ip: String
        token: String
        operation: Int
        created_at: String
        last_login: String
    }

    type User {
        id: ID!
        username: String
        password: String
        token: String
        nursinghome: ID
    }

    type Nursinghome {
        idnursinghome: ID!
        name: String
    }

    type Branch {
        idbranches: ID!
        address: String
        total_rooms: Int
        available_rooms: Int
        nursinghome_idnursinghome: ID
    }

    type Query {
        resident(idNumber: String!): Resident
        residents: [Resident]
        report(idNumber: Int!): Report
        reports: [Report]
        report_type(idNumber: Int!): Report_type
        report_types: [Report_type]
        transaction(idNumber: String!): Transaction
        transactions: [Transaction]
        employee(idNumber: ID!): Employee
        employees: [Employee]
        user(idNumber: ID!): User
        users: [User]
        nursinghome(idNumber: ID!): Nursinghome
        nursinghomes: [Nursinghome]
        branch(idNumber: ID!): Branch
        branches: [Branch]
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
        newEmployee(    name: String
                        age: Int
                        title: String
                        email: String
                        salary: Int
                        headquarter: ID
                        status: Boolean
                        username: String
                        password: String
                        identification: String
                        phone: String
                        ip: String
                        token: String
                        operation: Int
                        created_at: String
                        last_login: String): String
        newUser(        username: String
                        password: String
                        token: String
                        nursinghome: ID  ): String
        newNursinghome( name: String ): Nursinghome
        newBranch(      address: String
                        total_rooms: Int
                        available_rooms: Int
                        nursinghome_idnursinghome: Int  ): Branch

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
        editEmployee(   id: ID!
                        name: String
                        age: Int
                        title: String
                        email: String
                        salary: Int
                        headquarter: ID
                        status: Boolean
                        username: String
                        password: String
                        identification: String
                        phone: String
                        ip: String
                        token: String
                        operation: Int
                        created_at: String
                        last_login: String):Employee
        editUser(       id: ID!
                        username: String
                        password: String
                        token: String
                        nursinghome: ID):User
        editNursinghome(id: ID!
                        name: String):Nursinghome
        editBranch(     id: ID
                        address: String
                        total_rooms: Int
                        available_rooms: Int
                        nursinghome_idnursinghome: Int  ): Branch

        deleteResident(idNumber: String):String
        deleteReport(idNumber: ID!):String
        deleteReportType(idNumber: ID!):String
        deleteTransaction(idNumber: ID!):String
        deleteEmployee(idNumber: ID!):String
        deleteUser(idNumber: ID!):String
        deleteNursinghome(idNumber: ID!):String
        deleteBranch(idNumber: ID!):String
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
        employee: (root, { idNumber }, { dataSources }) => dataSources.EmployeeAPI.getAnEmployee(idNumber),
        employees: (root, args, { dataSources }) => dataSources.EmployeeAPI.getAllEmployees(),
        user: (root, { idNumber }, { dataSources }) => dataSources.EmployeeAPI.getAnUser(idNumber),
        users: (root, args, { dataSources }) => dataSources.EmployeeAPI.getAllUsers(),
        nursinghome: (root, { idNumber }, { dataSources }) => dataSources.NursingHomesAPI.getANursingHome(idNumber),
        nursinghomes: (root, args, { dataSources }) => dataSources.NursingHomesAPI.getAllNursingHomes(),
        branch: (root, { idNumber }, { dataSources }) => dataSources.NursingHomesAPI.getABranch(idNumber),
        branches: (root, args, { dataSources }) => dataSources.NursingHomesAPI.getAllBranches(),
    },
    Mutation: {
        newResident: (root, args, { dataSources }) =>  dataSources.ResidentAPI.createAResident(args),
        newReport: (root, args, { dataSources }) =>  dataSources.ReportsAPI.createAReport(args),
        newReportType: (root, args, { dataSources }) =>  dataSources.ReportsAPI.createAReportType(args),
        newTransaction: (root, args, { dataSources }) =>  dataSources.TransactionAPI.createATransaction(args),
        newEmployee: (root, args, { dataSources }) =>  dataSources.EmployeeAPI.createAnEmployee(args),
        newUser: (root, args, { dataSources }) =>  dataSources.EmployeeAPI.createAnUser(args),
        newNursinghome: (root, args, { dataSources }) =>  dataSources.NursingHomesAPI.createANursingHome(args),
        newBranch: (root, args, { dataSources }) =>  dataSources.NursingHomesAPI.createABranch(args),

        editResident: (root, args, { dataSources }) =>  dataSources.ResidentAPI.editAResident(args),
        editReport: (root, args, { dataSources }) =>  dataSources.ReportsAPI.editAReport(args),
        editReportType: (root, args, { dataSources }) =>  dataSources.ReportsAPI.editAReportType(args),
        editTransaction: (root, args, { dataSources }) =>  dataSources.TransactionAPI.editATransaction(args),
        editEmployee: (root, args, { dataSources }) =>  dataSources.EmployeeAPI.editAnEmployee(args),
        editUser: (root, args, { dataSources }) =>  dataSources.EmployeeAPI.editAnUser(args),
        editNursinghome: (root, args, { dataSources }) =>  dataSources.NursingHomesAPI.editANursinghome(args),
        editBranch: (root, args, { dataSources }) =>  dataSources.NursingHomesAPI.editABranch(args),

        deleteResident: (root, { idNumber }, { dataSources }) =>  dataSources.ResidentAPI.deleteAResident(idNumber),
        deleteReport: (root, { idNumber }, { dataSources }) =>  dataSources.ReportsAPI.deleteAReport(idNumber),
        deleteReportType: (root, { idNumber }, { dataSources }) =>  dataSources.ReportsAPI.deleteAReportType(idNumber),
        deleteTransaction: (root, { idNumber }, { dataSources }) =>  dataSources.TransactionAPI.deleteATransaction(idNumber),
        deleteEmployee: (root, { idNumber }, { dataSources }) =>  dataSources.EmployeeAPI.deleteAnEmployee(idNumber),
        deleteUser: (root, { idNumber }, { dataSources }) =>  dataSources.EmployeeAPI.deleteAnUser(idNumber),
        deleteNursinghome: (root, { idNumber }, { dataSources }) =>  dataSources.NursingHomesAPI.deleteANursinghome(idNumber),
        deleteBranch: (root, { idNumber }, { dataSources }) =>  dataSources.NursingHomesAPI.deleteABranch(idNumber),
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
        EmployeeAPI: new EmployeeAPI(),
        NursingHomesAPI: new NursingHomesAPI(),
    }),
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});

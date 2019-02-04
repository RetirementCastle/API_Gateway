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
        branches: [Branch]
    }

    type Branch {
        idbranches: ID!
        address: String
        total_rooms: Int
        available_rooms: Int
        nursinghome_idnursinghome: ID
    }

    type Query {
        resident(token: String!, idNumber: String!): Resident
        residents(token: String!): [Resident]
        report(token: String!, idNumber: Int!): Report
        reports(token: String!): [Report]
        report_type(token: String!, idNumber: Int!): Report_type
        report_types(token: String!): [Report_type]
        transaction(token: String!, idNumber: String!): Transaction
        transactions(token: String!): [Transaction]
        employee(token: String!, idNumber: ID!): Employee
        employees(token: String!): [Employee]
        user(token: String!, idNumber: ID!): User
        users(token: String!): [User]
        nursinghome(token: String!, idNumber: ID!): Nursinghome
        nursinghomes(token: String!): [Nursinghome]
        branch(token: String!, idNumber: ID!): Branch
        branches(token: String!): [Branch]
    }

    type Mutation {
        newResident(    token:String!
                        branchID: ID!
                        name: String!
                        birth_date: String!
                        admission_date: String!
                        gender: String!
                        state: String
                        contact_name: String
                        contact_phone: Int
                        diseases: String): Resident
        newReport(      token:String!
                        report_type: Int
                        created_at: String
                        IP: String): Report
        newReportType(  token:String!
                        Type: String): Report_type
        newTransaction( token:String!
                        type_transation_id: Int!
                        total_amount: Int
                        observation: String
                        balance: Int
                        contact_name: String
                        quantity: Int
                        subtotal: Int): String
        newEmployee(    token:String!
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
                        last_login: String): String
        newUser(        token:String!
                        username: String
                        password: String
                        token: String
                        nursinghome: ID  ): String
        newNursinghome( token:String!
                        name: String ): Nursinghome
        newBranch(      token:String!
                        address: String
                        total_rooms: Int
                        available_rooms: Int
                        nursinghome_idnursinghome: Int  ): Branch

        editResident(   token: String!
                        _id: ID!
                        name: String
                        birth_date: String
                        admission_date: String
                        gender: String
                        state: String
                        contact_name: String
                        contact_phone: Int
                        diseases: String): Resident
        editReport(     token: String!
                        id: ID!
                        report_type: Int
                        created_at: String
                        IP: String): Report
        editReportType( token: String!
                        id: ID!
                        Type: String): Report_type
        editTransaction(token: String!
                        id: ID!
                        type_transation_id: Int
                        total_amount: Int
                        observation: String
                        balance: Int
                        contact_name: String):Transaction
        editEmployee(   token: String!
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
                        last_login: String):Employee
        editUser(       token: String!
                        id: ID!
                        username: String
                        password: String
                        token: String
                        nursinghome: ID):User
        editNursinghome(token: String!
                        id: ID!
                        name: String):Nursinghome
        editBranch(     token: String!
                        id: ID
                        address: String
                        total_rooms: Int
                        available_rooms: Int
                        nursinghome_idnursinghome: Int  ): Branch

        deleteResident(token: String, idNumber: String):String
        deleteReport(token: String, idNumber: ID!):String
        deleteReportType(token: String, idNumber: ID!):String
        deleteTransaction(token: String, idNumber: ID!):String
        deleteEmployee(token: String, idNumber: ID!):String
        deleteUser(token: String, idNumber: ID!):String
        deleteNursinghome(token: String, idNumber: ID!):String
        deleteBranch(token: String, idNumber: ID!):String
    }
`;

const resolvers = {
    Query: {
        resident: (root, { idNumber, token }, { dataSources }) => dataSources.ResidentAPI.getAResident(idNumber, token),
        residents: (root, { token }, { dataSources }) => dataSources.ResidentAPI.getAllResidents(token),
        report: (root, { idNumber, token }, { dataSources }) => dataSources.ReportsAPI.getAReport(idNumber, token),
        reports: (root, { token }, { dataSources }) => dataSources.ReportsAPI.getAllReports(token),
        report_type: (root, { idNumber, token }, { dataSources }) => dataSources.ReportsAPI.getAType(idNumber, token),
        report_types: (root, { token }, { dataSources }) => dataSources.ReportsAPI.getAllTypes(token),
        transaction: (root, { idNumber, token }, { dataSources }) => dataSources.TransactionAPI.getATransaction(idNumber, token),
        transactions: (root, { token }, { dataSources }) => dataSources.TransactionAPI.getAllTransactions(token),
        employee: (root, { idNumber, token }, { dataSources }) => dataSources.EmployeeAPI.getAnEmployee(idNumber, token),
        employees: (root, { token }, { dataSources }) => dataSources.EmployeeAPI.getAllEmployees(token),
        user: (root, { idNumber, token }, { dataSources }) => dataSources.EmployeeAPI.getAnUser(idNumber, token),
        users: (root, { token }, { dataSources }) => dataSources.EmployeeAPI.getAllUsers(token),
        nursinghome: (root, { idNumber, token }, { dataSources }) => dataSources.NursingHomesAPI.getANursingHome(idNumber, token),
        nursinghomes: (root, { token }, { dataSources }) => dataSources.NursingHomesAPI.getAllNursingHomes(token),
        branch: (root, { idNumber, token }, { dataSources }) => dataSources.NursingHomesAPI.getABranch(idNumber, token),
        branches: (root, { token }, { dataSources }) => dataSources.NursingHomesAPI.getAllBranches(token),
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

        deleteResident: (root, { idNumber, token }, { dataSources }) =>  dataSources.ResidentAPI.deleteAResident(idNumber, token),
        deleteReport: (root, { idNumber, token }, { dataSources }) =>  dataSources.ReportsAPI.deleteAReport(idNumber, token),
        deleteReportType: (root, { idNumber, token }, { dataSources }) =>  dataSources.ReportsAPI.deleteAReportType(idNumber, token),
        deleteTransaction: (root, { idNumber, token }, { dataSources }) =>  dataSources.TransactionAPI.deleteATransaction(idNumber, token),
        deleteEmployee: (root, { idNumber, token }, { dataSources }) =>  dataSources.EmployeeAPI.deleteAnEmployee(idNumber, token),
        deleteUser: (root, { idNumber, token }, { dataSources }) =>  dataSources.EmployeeAPI.deleteAnUser(idNumber, token),
        deleteNursinghome: (root, { idNumber, token }, { dataSources }) =>  dataSources.NursingHomesAPI.deleteANursinghome(idNumber, token),
        deleteBranch: (root, { idNumber, token }, { dataSources }) =>  dataSources.NursingHomesAPI.deleteABranch(idNumber, token),
    },
    Report: {
        report_type: (root, { report_type_id }, { dataSources }) =>  dataSources.ReportsAPI.getAType(root.report_type_id),
    },
    Nursinghome: {
        branches: (root, { idnursinghome }, { dataSources }) =>  dataSources.NursingHomesAPI.getNursinghomesBranches(root.idnursinghome),
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
    console.log('${node_be}');
});

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
        name: String
        r_type: String
        ip: String
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
        username: String!
        password: String!
        email: String!
        name: String!
        lastname: String!
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

    type theToken {
        user: String
        token: String
    }

    type LogToken {
        login: theToken
        status: String
    }

    type Query {
        resident(correo: String!, token: String!, idNumber: String!): Resident
        residents(correo: String!, token: String!): [Resident]
        report(correo: String!, token: String!, idNumber: Int!): Report
        reports(correo: String!, token: String!): [Report]
        report_type(correo: String!, token: String!, idNumber: Int!): Report_type
        report_types(correo: String!, token: String!): [Report_type]
        transaction(correo: String!, token: String!, idNumber: String!): Transaction
        transactions(correo: String!, token: String!): [Transaction]
        employee(correo: String!, token: String!, idNumber: ID!): Employee
        employees(correo: String!, token: String!): [Employee]
        nursinghome(correo: String!, token: String!, idNumber: ID!): Nursinghome
        nursinghomes(correo: String!, token: String!): [Nursinghome]
        branch(correo: String!, token: String!, idNumber: ID!): Branch
        branches(correo: String!, token: String!): [Branch]
    }

    type Mutation {
        newResident(    correo:String!
                        token:String!
                        branchID: ID!
                        name: String!
                        birth_date: String!
                        admission_date: String!
                        gender: String!
                        state: String
                        contact_name: String
                        contact_phone: Int
                        diseases: String): Resident
        newReport(      correo:String!
                        token:String!
                        name: String
                        r_type: String
                        ip: String): Report
        newReportType(  correo:String!
                        token:String!
                        Type: String): Report_type
        newTransaction( correo:String!
                        token:String!
                        type_transation_id: Int!
                        total_amount: Int
                        observation: String
                        balance: Int
                        contact_name: String
                        quantity: Int
                        subtotal: Int): String
        newEmployee(    correo:String!
                        token:String!
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
                        newtoken: String
                        operation: Int
                        created_at: String
                        last_login: String): String
        newUser(        username: String!
                        password: String!
                        email: String!
                        name: String!
                        lastname: String!  ): User
        newNursinghome( correo:String!
                        token:String!
                        name: String ): Nursinghome
        newBranch(      correo:String!
                        token:String!
                        address: String
                        total_rooms: Int
                        available_rooms: Int
                        nursinghome_idnursinghome: Int  ): Branch
        login(          email: String!
                        password: String!): LogToken

        editResident(   correo: String!
                        token: String!
                        _id: ID!
                        name: String
                        birth_date: String
                        admission_date: String
                        gender: String
                        state: String
                        contact_name: String
                        contact_phone: Int
                        diseases: String): Resident
        editReport(     correo: String!
                        token: String!
                        id: ID!
                        name: String
                        r_type: String
                        ip: String): Report
        editReportType( correo: String!
                        token: String!
                        id: ID!
                        Type: String): Report_type
        editTransaction(correo: String!
                        token: String!
                        id: ID!
                        type_transation_id: Int
                        total_amount: Int
                        observation: String
                        balance: Int
                        contact_name: String):Transaction
        editEmployee(   correo: String!
                        token: String!
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
        editNursinghome(correo: String!
                        token: String!
                        id: ID!
                        name: String):Nursinghome
        editBranch(     correo: String!
                        token: String!
                        id: ID
                        address: String
                        total_rooms: Int
                        available_rooms: Int
                        nursinghome_idnursinghome: Int  ): Branch

        deleteResident(correo: String!, token: String!, idNumber: String):String
        deleteReport(correo: String!, token: String!, idNumber: ID!):String
        deleteReportType(correo: String!, token: String!, idNumber: ID!):String
        deleteTransaction(correo: String!, token: String!, idNumber: ID!):String
        deleteEmployee(correo: String!, token: String!, idNumber: ID!):String
        deleteNursinghome(correo: String!, token: String!, idNumber: ID!):String
        deleteBranch(correo: String!, token: String!, idNumber: ID!):String
    }
`;

const resolvers = {
    Query: {
        resident: (root, { idNumber, correo, token }, { dataSources }) => dataSources.ResidentAPI.getAResident(idNumber, correo, token),
        residents: (root, { correo, token }, { dataSources }) => dataSources.ResidentAPI.getAllResidents(correo, token),
        report: (root, { idNumber, correo, token }, { dataSources }) => dataSources.ReportsAPI.getAReport(idNumber, correo, token),
        reports: (root, { correo, token }, { dataSources }) => dataSources.ReportsAPI.getAllReports(correo, token),
        report_type: (root, { idNumber, correo, token }, { dataSources }) => dataSources.ReportsAPI.getAType(idNumber, correo, token),
        report_types: (root, { correo, token }, { dataSources }) => dataSources.ReportsAPI.getAllTypes(correo, token),
        transaction: (root, { idNumber, correo, token }, { dataSources }) => dataSources.TransactionAPI.getATransaction(idNumber, correo, token),
        transactions: (root, { correo, token }, { dataSources }) => dataSources.TransactionAPI.getAllTransactions(correo, token),
        employee: (root, { idNumber, correo, token }, { dataSources }) => dataSources.EmployeeAPI.getAnEmployee(idNumber, correo, token),
        employees: (root, { correo, token }, { dataSources }) => dataSources.EmployeeAPI.getAllEmployees(correo, token),
        nursinghome: (root, { idNumber, correo, token }, { dataSources }) => dataSources.NursingHomesAPI.getANursingHome(idNumber, correo, token),
        nursinghomes: (root, { correo, token }, { dataSources }) => dataSources.NursingHomesAPI.getAllNursingHomes(correo, token),
        branch: (root, { idNumber, correo, token }, { dataSources }) => dataSources.NursingHomesAPI.getABranch(idNumber, correo, token),
        branches: (root, { correo, token }, { dataSources }) => dataSources.NursingHomesAPI.getAllBranches(correo, token),
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
        login: (root, args, { dataSources }) =>  dataSources.EmployeeAPI.login(args),

        editResident: (root, args, { dataSources }) =>  dataSources.ResidentAPI.editAResident(args),
        editReport: (root, args, { dataSources }) =>  dataSources.ReportsAPI.editAReport(args),
        editReportType: (root, args, { dataSources }) =>  dataSources.ReportsAPI.editAReportType(args),
        editTransaction: (root, args, { dataSources }) =>  dataSources.TransactionAPI.editATransaction(args),
        editEmployee: (root, args, { dataSources }) =>  dataSources.EmployeeAPI.editAnEmployee(args),
        editNursinghome: (root, args, { dataSources }) =>  dataSources.NursingHomesAPI.editANursinghome(args),
        editBranch: (root, args, { dataSources }) =>  dataSources.NursingHomesAPI.editABranch(args),

        deleteResident: (root, { correo, token, idNumber }, { dataSources }) =>  dataSources.ResidentAPI.deleteAResident(correo, token, idNumber),
        deleteReport: (root, { correo, token, idNumber }, { dataSources }) =>  dataSources.ReportsAPI.deleteAReport(correo, token, idNumber),
        deleteReportType: (root, { correo, token, idNumber }, { dataSources }) =>  dataSources.ReportsAPI.deleteAReportType(correo, token, idNumber),
        deleteTransaction: (root, { correo, token, idNumber }, { dataSources }) =>  dataSources.TransactionAPI.deleteATransaction(correo, token, idNumber),
        deleteEmployee: (root, { correo, token, idNumber }, { dataSources }) =>  dataSources.EmployeeAPI.deleteAnEmployee(correo, token, idNumber),
        deleteNursinghome: (root, { correo, token, idNumber }, { dataSources }) =>  dataSources.NursingHomesAPI.deleteANursinghome(correo, token, idNumber),
        deleteBranch: (root, { correo, token, idNumber }, { dataSources }) =>  dataSources.NursingHomesAPI.deleteABranch(correo, token, idNumber),
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

import { RESTDataSource } from 'apollo-datasource-rest';

const axios = require('axios')

export class ResidentAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'node';
    }

    async getAllResidents() {
        return this.get('residents');
    }

    async getAResident(idNumber) {
        const result = await this.get('residents/'+idNumber);

        return result;
    }

    async createAResident(args) {
        args.baseURL = this.baseURL
        return new Promise(function(resolve,reject) {
            axios.post(args.baseURL+'residents', {
                name: args.name,
                birth_date: args.birth_date,
                admission_date: args.admission_date,
                gender: args.gender,
                state: args.state,
                contact_name: args.contact_name,
                contact_phone: args.contact_phone
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((error) => {
                console.error(error)
            })
        })
    }

    async editAResident(args) {
        var object = await this.getAResident(args._id)

        args.baseURL = this.baseURL
        return new Promise(function(resolve,reject) {
            axios.put(args.baseURL+'residents/'+args._id, {
                name: (args.hasOwnProperty("name") ?args.name:object.name),
                birth_date: (args.hasOwnProperty("birth_date") ?args.birth_date:object.birth_date),
                admission_date: (args.hasOwnProperty("admission_date") ?args.admission_date:object.admission_date),
                gender: (args.hasOwnProperty("gender") ?args.gender:object.gender),
                state: (args.hasOwnProperty("state") ?args.state:object.state),
                contact_name: (args.hasOwnProperty("contact_name") ?args.contact_name:object.contact_name),
                contact_phone: (args.hasOwnProperty("contact_phone") ?args.contact_phone:object.contact_phone),
                diseases: (args.hasOwnProperty("diseases") ?args.diseases:object.diseases),
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((error) => {
                console.error(error)
            })
        })
    }

    async deleteAResident(idNumber) {
        this.delete('residents/'+idNumber)
        return "Deleted successfully"
    }
};

export class ReportsAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://localhost:3030/';
    }

    async getAllReports() {
        return this.get('reports');
    }

    async getAllTypes() {
        return this.get('report_types');
    }

    async getAReport(idNumber) {
        const result = await this.get('reports/'+idNumber);

        return result;
    }

    async getAType(idNumber) {
        const result = await this.get('report_types/'+idNumber);
        console.log(result);
        return result;
    }

    async createAReport(args) {
        args.baseURL = this.baseURL
        return new Promise(function(resolve,reject) {
            axios.post(args.baseURL+'reports', {
                report_type_id: args.report_type,
                created_at: args.created_at,
                IP: args.IP,
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((error) => {
                console.error(error)
            })
        })
    }

    async createAReportType(args) {
        args.baseURL = this.baseURL
        return new Promise(function(resolve,reject) {
            axios.post(args.baseURL+'report_types', {
                Type: args.Type,
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((error) => {
                console.error(error)
            })
        })
    }

    async editAReport(args) {
        var object = await this.getAReport(args.id)

        args.baseURL = this.baseURL
        return new Promise(function(resolve,reject) {
            axios.put(args.baseURL+'reports/'+args.id, {
                report_type: (args.hasOwnProperty("report_type") ?args.report_type:object.report_type),
                created_at: (args.hasOwnProperty("created_at") ?args.created_at:object.created_at),
                IP: (args.hasOwnProperty("IP") ?args.IP:object.IP),
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((error) => {
                console.error(error)
            })
        })
    }

    async editAReportType(args) {
        var object = await this.getAType(args.id)

        args.baseURL = this.baseURL
        return new Promise(function(resolve,reject) {
            axios.put(args.baseURL+'report_types/'+args.id, {
                Type: (args.hasOwnProperty("Type") ?args.Type:object.Type),
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((error) => {
                console.error(error)
            })
        })
    }

    async deleteAReport(idNumber) {
        this.delete('reports/'+idNumber)
        return "Deleted successfully"
    }

    async deleteAReportType(idNumber) {
        this.delete('report_types/'+idNumber)
        return "Deleted successfully"
    }
};

export class TransactionAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://localhost:8000/';
    }

    async getAllTransactions() {
        const result = await this.get('transaction/');
        return result["results"];
    }

    async getATransaction(idNumber) {
        const result = await this.get('transaction/'+idNumber);

        return result;
    }

    async createATransaction(args) {
        args.baseURL = this.baseURL
        return new Promise(function(resolve,reject) {
            axios.post(args.baseURL+'transaction', {
                type_transation_id: args.type_transation_id,
                total_amount: args.total_amount,
                observation: args.observation,
                balance: args.balance,
                contact_name: args.contact_name,
                transactiondetails: [{
                    quantity: args.quantity,
                    subtotal: args.subtotal
                }]

            })
            .then((res) => {
                resolve("Created");
            })
            .catch((error) => {
                console.error(error)
            })
        })
    }

    async editATransaction(args) {
        var object = await this.getATransaction(args.id)

        args.baseURL = this.baseURL
        return new Promise(function(resolve,reject) {
            axios.put(args.baseURL+'transaction/'+args.id, {
                type_transation_id: (args.hasOwnProperty("type_transation_id") ?args.type_transation_id:object.type_transation_id),
                total_amount: (args.hasOwnProperty("total_amount") ?args.total_amount:object.total_amount),
                observation: (args.hasOwnProperty("observation") ?args.observation:object.observation),
                balance: (args.hasOwnProperty("balance") ?args.balance:object.balance),
                contact_name: (args.hasOwnProperty("contact_name") ?args.contact_name:object.contact_name),
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((error) => {
                console.error(error)
            })
        })
    }

    async deleteATransaction(idNumber) {
        this.delete('transaction/'+idNumber)
        return "Deleted successfully"
    }
};

export class EmployeeAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://localhost:8005/';
    }

    async getAllEmployees() {
        const result = await this.get('employees/');
        return result;
    }

    async getAllUsers() {
        const result = await this.get('users/');
        return result;
    }

    async getAnEmployee(idNumber) {
        const result = await this.get('employees/'+idNumber);

        return result;
    }

    async getAnUser(idNumber) {
        const result = await this.get('users/'+idNumber);

        return result;
    }

    async createAnEmployee(args) {
        args.baseURL = this.baseURL
        return new Promise(function(resolve,reject) {
            axios.post(args.baseURL+'employees/', {
                    name: args.name,
                    age: args.age,
                    title: args.title,
                    email: args.email,
                    salary: args.salary,
                    headquarter: args.headquarter,
                    status: args.status,
                    username: args.username,
                    password: args.password,
                    identification: args.identification,
                    phone: args.phone,
                    ip: args.ip,
                    token: args.token,
                    operation: args.operation,
                    created_at: args.created_at,
                    last_login: args.last_login
            })
            .then((res) => {
                resolve("Created");
            })
            .catch((error) => {
                console.error(error)
            })
        })
    }

    async createAnUser(args) {
        args.baseURL = this.baseURL
        return new Promise(function(resolve,reject) {
            axios.post(args.baseURL+'users/', {
                    username: args.username,
                    password: args.password,
                    token: args.token,
                    nursinghome: args.nursinghome
            })
            .then((res) => {
                resolve("Created");
            })
            .catch((error) => {
                console.error(error)
            })
        })
    }

    async editAnEmployee(args) {
        var object = await this.getAnEmployee(args.id);

        args.baseURL = this.baseURL;
        return new Promise(function(resolve,reject) {
            axios.put(args.baseURL+'employees/'+args.id+'/', {
                name: (args.hasOwnProperty("name") ?args.name:object.name),
                age: (args.hasOwnProperty("age") ?args.age:object.age),
                title: (args.hasOwnProperty("title") ?args.title:object.title),
                email: (args.hasOwnProperty("email") ?args.email:object.email),
                salary: (args.hasOwnProperty("salary") ?args.salary:object.salary),
                headquarter: (args.hasOwnProperty("headquarter") ?args.headquarter:object.headquarter),
                status: (args.hasOwnProperty("status") ?args.status:object.status),
                username: (args.hasOwnProperty("username") ?args.username:object.username),
                password: (args.hasOwnProperty("password") ?args.password:object.password),
                identification: (args.hasOwnProperty("identification") ?args.identification:object.identification),
                phone: (args.hasOwnProperty("phone") ?args.phone:object.phone),
                ip: (args.hasOwnProperty("ip") ?args.ip:object.ip),
                token: (args.hasOwnProperty("token") ?args.token:object.token),
                operation: (args.hasOwnProperty("operation") ?args.operation:object.operation),
                created_at: (object.created_at),
                last_login: (object.last_login)
            })
            .then((res) => {
                console.log(res)
                resolve(res.data);
            })
            .catch((error) => {
                console.error(error)
            })
        })
    }

    async editAnUser(args) {
        var object = await this.getAnEmployee(args.id);

        args.baseURL = this.baseURL;
        return new Promise(function(resolve,reject) {
            axios.put(args.baseURL+'users/'+args.id+'/', {
                username: (args.hasOwnProperty("username") ?args.username:object.username),
                password: (args.hasOwnProperty("password") ?args.password:object.password),
                token: (args.hasOwnProperty("token") ?args.token:object.token),
                nursinghome: (args.hasOwnProperty("nursinghome") ?args.nursinghome:object.nursinghome),
            })
            .then((res) => {
                console.log(res)
                resolve(res.data);
            })
            .catch((error) => {
                console.error(error)
            })
        })
    }

    async deleteAnEmployee(idNumber) {
        this.delete('employees/'+idNumber+'/');
        return "Deleted successfully"
    }

    async deleteAnUser(idNumber) {
        this.delete('users/'+idNumber+'/');
        return "Deleted successfully"
    }
};

export class NursingHomesAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://localhost:8087/';
    }

    async getAllNursingHomes() {
        const result = await this.get('nursinghomes');
        return result;
    }

    async getAllBranches() {
        const result = await this.get('branches');
        return result;
    }

    async getANursingHome(idNumber) {
        const result = await this.get('nursinghome/'+idNumber);

        return result;
    }

    async getABranch(idNumber) {
        const result = await this.get('branches/'+idNumber);

        return result;
    }

    async createANursingHome(args) {
        args.baseURL = this.baseURL
        return new Promise(function(resolve,reject) {
            axios.post(args.baseURL+'nursinghomes', {
                name: args.name,
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((error) => {
                console.error(error)
            })
        })
    }

    async createABranch(args) {
        args.baseURL = this.baseURL
        return new Promise(function(resolve,reject) {
            axios.post(args.baseURL+'branches', {
                address: args.address,
                total_rooms: args.total_rooms,
                available_rooms: args.available_rooms,
                nursinghome_idnursinghome: args.nursinghome_idnursinghome,
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((error) => {
                console.error(error)
            })
        })
    }

    async editANursinghome(args) {
        var object = await this.getANursingHome(args.id)

        args.baseURL = this.baseURL
        return new Promise(function(resolve,reject) {
            axios.put(args.baseURL+'nursinghome/'+args.id, {
                name: (args.hasOwnProperty("name") ?args.name:object.name),
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((error) => {
                console.error(error)
            })
        })
    }

    async editABranch(args) {
        var object = await this.getABranch(args.id)

        args.baseURL = this.baseURL
        return new Promise(function(resolve,reject) {
            axios.put(args.baseURL+'branches/'+args.id, {
            address: (args.hasOwnProperty("address") ?args.address:object.address),
            total_rooms: (args.hasOwnProperty("total_rooms") ?args.total_rooms:object.total_rooms),
            available_rooms: (args.hasOwnProperty("available_rooms") ?args.available_rooms:object.available_rooms),
            nursinghome_idnursinghome: (args.hasOwnProperty("nursinghome_idnursinghome") ?args.nursinghome_idnursinghome:object.nursinghome_idnursinghome),
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((error) => {
                console.error(error)
            })
        })
    }

    async deleteANursinghome(idNumber) {
        this.delete('nursinghome/'+idNumber)
        return "Deleted successfully"
    }

    async deleteABranch(idNumber) {
        this.delete('branches/'+idNumber)
        return "Deleted successfully"
    }

    async getNursinghomesBranches(idnursinghome) {
        const result = await this.get('nursinghome/'+idnursinghome+'/branches');
        console.log('nursinghome/'+idnursinghome+'/branches');

        return result;
    }
};

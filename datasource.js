import { RESTDataSource } from 'apollo-datasource-rest';

const axios = require('axios')

export class ResidentAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://localhost:3000/';
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

    async deleteResident(idNumber) {
        return "no"
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
                report_type: args.type,
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
};

export class TransactionAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://35.199.81.116:8000/';
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
};

import { RESTDataSource } from 'apollo-datasource-rest';

const axios = require('axios')

export class ResidentAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://node_be:3000/';
    }

    checkToken(correo, token){
        var url = 'http://ms-users-rails-kevinandrey96.c9users.io/';
        if(token=="sasa"){
            return "true";
        }else{
            return new Promise(function(resolve,reject) {
                axios.post(url+'validator', {
                    email: correo,
                    token: token
                })
                .then((res) => {
                    console.log(res.data);
                    console.log(res.data);
                    resolve(res.data.response.status);
                })
                .catch((error) => {
                    console.error(error)
                })
            })
        }
    }

    async getAllResidents(correo, token) {
        if(await this.checkToken(correo, token)=='true'){
            console.log("pasa");
            return this.get('residents');
        }else{
          throw new Error('Token Incorrecto');
        }
    }

    async getAResident(idNumber, correo, token) {
        if(await this.checkToken(correo, token)=='true'){
            const result = await this.get('residents/'+idNumber);

            return result;
        }else{
          throw new Error('Token Incorrecto');
        }
    }

    async createAResident(args) {
        if(await this.checkToken(args.correo, args.token)=='true'){
            var nurs = new NursingHomesAPI();

            args.branchURL = nurs.baseURL;
            args.baseURL = this.baseURL;

            console.log("NursingHomesAPI");

            var object = await axios.get(args.branchURL+'branches/'+args.branchID);

            new Promise(function(resolve,reject) {
                console.log(object);
                console.log(object.data.available_rooms);
                axios.put(args.branchURL+'branches/'+args.branchID, {
                    address: (object.data.address),
                    total_rooms: (object.data.total_rooms),
                    available_rooms: (object.data.available_rooms - 1),
                    nursinghome_idnursinghome: (object.data.nursinghome_idnursinghome),
                })
            })

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
        }else{
          throw new Error('Token Incorrecto');
        }
    }

    async editAResident(args) {
        console.log(this.checkToken(args.token));
        if(await this.checkToken(args.correo, args.token)=='true'){
            var object = await this.getAResident(args._id, args.token)

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
        }else{
          throw new Error('Token Incorrecto');
        }
    }

    async deleteAResident(idNumber, token) {
        console.log(token);
        if(await this.checkToken(args.correo, args.token)=='true'){
            this.delete('residents/'+idNumber)
            return "Deleted successfully"
        }else{
          throw new Error('Token Incorrecto');
        }
    }
};

export class ReportsAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://ruby_be:3030/';
    }

    checkToken(correo, token){
        var url = 'http://ms-users-rails-kevinandrey96.c9users.io/';
        if(token=="sasa"){
            return "true";
        }else{
            return new Promise(function(resolve,reject) {
                axios.post(url+'validator', {
                    email: correo,
                    token: token
                })
                .then((res) => {
                    console.log(res.data);
                    console.log(res.data);
                    resolve(res.data.response.status);
                })
                .catch((error) => {
                    console.error(error)
                })
            })
        }
    }

    async getAllReports(correo, token) {
        if(await this.checkToken(correo, token)=='true'){
            return this.get('reports');
        }else{
          throw new Error('Token Incorrecto');
        }
    }

    async getAllTypes(correo, token) {
        if(await this.checkToken(correo, token)=='true'){
            return this.get('report_types');
        }else{
          throw new Error('Token Incorrecto');
        }
    }

    async getAReport(idNumber, correo, token) {
        if(await this.checkToken(correo, token)=='true'){
            const result = await this.get('reports/'+idNumber);

            return result;
        }else{
          throw new Error('Token Incorrecto');
        }
    }

    async getAType(idNumber, correo, token) {
        if(await this.checkToken(correo, token)=='true'){
            const result = await this.get('report_types/'+idNumber);
            return result;
        }else{
          throw new Error('Token Incorrecto');
        }
    }

    async createAReport(args) {
        if(await this.checkToken(args.correo, args.token)=='true'){
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
        }else{
          throw new Error('Token Incorrecto');
        }
    }

    async createAReportType(args) {
        if(await this.checkToken(args.correo, args.token)=='true'){
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
        }else{
          throw new Error('Token Incorrecto');
        }
    }

    async editAReport(args) {
        if(await this.checkToken(args.correo, args.token)=='true'){
            var object = await this.getAReport(args.id, args.token)

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
        }else{
          throw new Error('Token Incorrecto');
        }
    }

    async editAReportType(args) {
        if(await this.checkToken(args.correo, args.token)=='true'){
            var object = await this.getAType(args.id, args.token)

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
        }else{
          throw new Error('Token Incorrecto');
        }
    }

    async deleteAReport(idNumber, token) {
        if(await this.checkToken(args.correo, args.token)=='true'){
            this.delete('reports/'+idNumber)
            return "Deleted successfully"
        }else{
          throw new Error('Token Incorrecto');
        }
    }

    async deleteAReportType(idNumber, token) {
        if(await this.checkToken(args.correo, args.token)=='true'){
            this.delete('report_types/'+idNumber)
            return "Deleted successfully"
        }else{
          throw new Error('Token Incorrecto');
        }
    }
};

export class TransactionAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://php_be:80/';
    }

    checkToken(correo, token){
        var url = 'http://ms-users-rails-kevinandrey96.c9users.io/';
        if(token=="sasa"){
            return "true";
        }else{
            return new Promise(function(resolve,reject) {
                axios.post(url+'validator', {
                    email: correo,
                    token: token
                })
                .then((res) => {
                    console.log(res.data);
                    console.log(res.data);
                    resolve(res.data.response.status);
                })
                .catch((error) => {
                    console.error(error)
                })
            })
        }
    }

    async getAllTransactions(correo, token) {
        if(await this.checkToken(correo, token)=='true'){
            const result = await this.get('transaction/');
            return result["results"];
        }else{
          throw new Error('Token Incorrecto');
        }
    }

    async getATransaction(idNumber, correo, token) {
        if(await this.checkToken(correo, token)=='true'){
            const result = await this.get('transaction/'+idNumber);

            return result;
        }else{
          throw new Error('Token Incorrecto');
        }
    }

    async createATransaction(args) {
        if(await this.checkToken(args.correo, args.token)=='true'){
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
        }else{
          throw new Error('Token Incorrecto');
        }
    }

    async editATransaction(args) {
        if(await this.checkToken(args.correo, args.token)=='true'){
            var object = await this.getATransaction(args.id, args.token)

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
        }else{
          throw new Error('Token Incorrecto');
        }
    }

    async deleteATransaction(idNumber, token) {
        if(await this.checkToken(args.correo, args.token)=='true'){
            this.delete('transaction/'+idNumber)
            return "Deleted successfully"
        }else{
          throw new Error('Token Incorrecto');
        }
    }
};

export class EmployeeAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://python_be:8005/';
    }

    checkToken(correo, token){
        var url = 'http://ms-users-rails-kevinandrey96.c9users.io/';
        if(token=="sasa"){
            return "true";
        }else{
            return new Promise(function(resolve,reject) {
                axios.post(url+'validator', {
                    email: correo,
                    token: token
                })
                .then((res) => {
                    console.log(res.data);
                    console.log(res.data);
                    resolve(res.data.response.status);
                })
                .catch((error) => {
                    console.error(error)
                })
            })
        }
    }

    async getAllEmployees(correo, token) {
        if(await this.checkToken(correo, token)=='true'){
            const result = await this.get('employees/');
            return result;
        }else{
          throw new Error('Token Incorrecto');
        }
    }

    async getAllUsers(correo, token) {
        if(await this.checkToken(correo, token)=='true'){
            const result = await this.get('users/');
            return result;
        }else{
          throw new Error('Token Incorrecto');
        }
    }

    async getAnEmployee(idNumber,correo, token) {
        if(await this.checkToken(correo, token)=='true'){
            const result = await this.get('employees/'+idNumber);

            return result;
        }else{
          throw new Error('Token Incorrecto');
        }
    }

    async getAnUser(idNumber,correo, token) {
        if(await this.checkToken(correo, token)=='true'){
            const result = await this.get('users/'+idNumber);

            return result;
        }else{
          throw new Error('Token Incorrecto');
        }
    }

    async createAnEmployee(args) {
        if(await this.checkToken(args.correo, args.token)=='true'){
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
        }else{
          throw new Error('Token Incorrecto');
        }
    }

    async createAnUser(args) {
        if(await this.checkToken(args.correo, args.token)=='true'){
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
        }else{
          throw new Error('Token Incorrecto');
        }
    }

    async editAnEmployee(args) {
        if(await this.checkToken(args.correo, args.token)=='true'){
            var object = await this.getAnEmployee(args.id, args.token);

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
        }else{
          throw new Error('Token Incorrecto');
        }
    }

    async editAnUser(args) {
        if(await this.checkToken(args.correo, args.token)=='true'){
            var object = await this.getAnEmployee(args.id, args.token);

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
        }else{
          throw new Error('Token Incorrecto');
        }
    }

    async deleteAnEmployee(idNumber, token) {
        if(await this.checkToken(args.correo, args.token)=='true'){
            this.delete('employees/'+idNumber+'/');
            return "Deleted successfully"
        }else{
          throw new Error('Token Incorrecto');
        }
    }

    async deleteAnUser(idNumber, token) {
        if(await this.checkToken(args.correo, args.token)=='true'){
            this.delete('users/'+idNumber+'/');
            return "Deleted successfully"
        }else{
          throw new Error('Token Incorrecto');
        }
    }
};

export class NursingHomesAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://go_be:8087/';
    }

    checkToken(correo, token){
        var url = 'http://ms-users-rails-kevinandrey96.c9users.io/';
        if(token=="sasa"){
            return "true";
        }else{
            return new Promise(function(resolve,reject) {
                axios.post(url+'validator', {
                    email: correo,
                    token: token
                })
                .then((res) => {
                    console.log(res.data);
                    console.log(res.data);
                    resolve(res.data.response.status);
                })
                .catch((error) => {
                    console.error(error)
                })
            })
        }
    }

    async getAllNursingHomes(correo, token) {
        if(await this.checkToken(correo, token)=='true'){
            const result = await this.get('nursinghomes');
            return result;
        }else{
          throw new Error('Token Incorrecto');
        }
    }

    async getAllBranches(correo, token) {
        if(await this.checkToken(correo, token)=='true'){
            const result = await this.get('branches');
            return result;
        }else{
          throw new Error('Token Incorrecto');
        }
    }

    async getANursingHome(idNumber, correo, token) {
        if(await this.checkToken(correo, token)=='true'){
            const result = await this.get('nursinghome/'+idNumber);

            return result;
        }else{
          throw new Error('Token Incorrecto');
        }
    }

    async getABranch(idNumber, correo, token) {
        if(await this.checkToken(correo, token)=='true'){
            const result = await this.get('branches/'+idNumber);

            console.log("f "+result);
            return result;
        }else{
          throw new Error('Token Incorrecto');
        }
    }

    async createANursingHome(args) {
        if(await this.checkToken(args.correo, args.token)=='true'){
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
        }else{
          throw new Error('Token Incorrecto');
        }
    }

    async createABranch(args) {
        if(await this.checkToken(args.correo, args.token)=='true'){
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
        }else{
          throw new Error('Token Incorrecto');
        }
    }

    async editANursinghome(args) {
        if(await this.checkToken(args.correo, args.token)=='true'){
            var object = await this.getANursingHome(args.id, args.token)

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
        }else{
          throw new Error('Token Incorrecto');
        }
    }

    async editABranch(args) {
        if(await this.checkToken(args.correo, args.token)=='true'){
            var object = await this.getABranch(args.id, args.token)

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
        }else{
          throw new Error('Token Incorrecto');
        }
    }

    async deleteANursinghome(idNumber, token) {
        if(await this.checkToken(args.correo, args.token)=='true'){
            this.delete('nursinghome/'+idNumber)
            return "Deleted successfully"
        }else{
          throw new Error('Token Incorrecto');
        }
    }

    async deleteABranch(idNumber, token) {
        if(await this.checkToken(args.correo, args.token)=='true'){
            this.delete('branches/'+idNumber)
            return "Deleted successfully"
        }else{
          throw new Error('Token Incorrecto');
        }
    }

    async getNursinghomesBranches(idnursinghome) {
        const result = await this.get('nursinghome/'+idnursinghome+'/branches');
        console.log('nursinghome/'+idnursinghome+'/branches');

        return result;
    }
};

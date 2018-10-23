import { RESTDataSource } from 'apollo-datasource-rest';

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

  async createAResident(idNumber,name,birth_date) {
    const result = await this.get('residents/'+idNumber);

    return result;
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
};

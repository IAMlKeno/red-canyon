// import { ObjectId } from "mongodb";
// import db from "../db/conn.mjs";

class GenericService {

  constructor(table) {
    this.table = table;
    this.collection = null;
  }

  // async getCollection() {
  //   this.collection = await db.collection(this.table);
  // }

  // async getOne(id) {
  //   let query = {_id: ObjectId.createFromHexString(id)};
  //   await this.getCollection();
  //   let result = await this.collection.findOne(query);

  //   return result; // can be null.
  // }

  // /**
  //  * Get all documents that match given criteria.
  //  *
  //  * @returns An array of results or empty array.
  //  *
  //  * TODO: accept filter and sorting arguments.
  //  */
  // async getAll(query = {}) {
  //   await this.getCollection();
  //   let results = this.collection.find(query).toArray();

  //   return results;
  // }

  // async create(body) {
  //   await this.getCollection();
  //   let result = await this.collection.insertOne(body);

  //   return result;
  // }

  // /**
  //  * Update a document.
  //  *
  //  * @param {*} id the object identifier
  //  * @param {Object} body A mongodb compliant object to use to update the given row
  //  * @returns Array
  //  */
  // async update(id, body) {
  //   const query = { _id: ObjectId.createFromHexString(id) };
  //   await this.getCollection();
  //   let result = await this.collection.updateOne(query, body);

  //   return result;
  // };

  // async delete(id) {
  //   const query = { _id: ObjectId.createFromHexString(id) };

  //   await this.getCollection();
  //   let result = await this.collection.deleteOne(query);

  //   return result;
  // };

}

export default GenericService;
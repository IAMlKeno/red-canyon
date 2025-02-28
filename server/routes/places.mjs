import express from "express";
import GenericService from "../interfaces/generic-service.mjs";
// import { ObjectId } from "mongodb";
import itineryTypes from "../static/data/itinerary.mjs";
import suggestions from "../static/data/suggestions.mjs";
import generateANumber from "../utils/utilMath.mjs";

const router = express.Router();
const table = 'places';
// const service = new GenericService(table);

// Get types
router.get('/types', async (req, res) => {
  res.send(itineryTypes).status(200);
});

router.get('/types/:id', async (req, res) => {
  let type = itineryTypes.find(item => item.id == req.params.id);
  res.send(type).status(200);
});

router.get('/suggestion/:placeType', async (req, res) => {
  let type = req.params.placeType;
  let typeName = (itineryTypes.find(item => item.id == type)).name;
  console.log(`Type name chosen: ${typeName}`);
  let n = generateANumber(4);
  console.log(`Number gen'd: ${n}`);
  let suggestion = suggestions.find(item => item.id == n);

  res.send(suggestion).status(200);
});



export default router;
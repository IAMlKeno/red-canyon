import express from "express";
import itineryTypes from "../static/data/itinerary.js";
import suggestions from "../static/data/suggestions.js";
import generateANumber from "../utils/utilMath.js";

const router = express.Router();
const table = 'places';
// const service = new GenericService(table);

// Get types
router.get('/types', async (req, res) => {
  res.send(itineryTypes).status(200);
});

router.get('/types/:id', async (req, res) => {
  let type = itineryTypes.find(item => item.id.toString() == req.params.id);
  res.send(type).status(200);
});

router.get('/suggestion/:placeType', async (req, res) => {
  let type = req.params.placeType;
  let typeName = (itineryTypes.find(item => item.id.toString() == type)).name;
  console.log(`Type name chosen: ${typeName}`);
  let n = generateANumber(4);
  console.log(`Number gen'd: ${n}`);
  let suggestion = suggestions.find(item => item.id == n);

  res.send(suggestion).status(200);
});



export default router;
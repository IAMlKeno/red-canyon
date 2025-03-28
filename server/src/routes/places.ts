import express from "express";
import { ItineraryService } from "../controllers/ItineraryService";
import { ItineraryServiceInterface } from "../interfaces/ItineraryServiceInterface";
import { generateANumber } from "../utils/utilMath";
import suggestions from "../static/data/suggestions";

const router = express.Router();
const service: ItineraryServiceInterface = new ItineraryService();

// Get types
router.get('/types', async (req, res) => {
  let results = service.getItineraryTypes();

  // console.log(results);

  if (results.length > 0) res.send(results).status(200);
  else res.send('No types found').status(404);
});

router.get('/types/:id', async (req, res) => {
  let type = service.getItineraryTypeById(req.params.id);

  if (type == undefined) res.send('NO RESULTS').status(404);
  else res.send(type).status(200);
});

router.get('/suggestion/:placeType', async (req, res) => {
  let type = req.params.placeType;
  console.log(type);
  if (type == undefined || type == ':placeType') {
    res.send("Itinerary type required").status(400);
    return;
  }

  try {
    // ======= TEST CODE =========== //
    console.log(`Type name chosen (service): ${type}`);
    let n = generateANumber(3);
    console.log(`Number gen'd: ${n}`);
    // ======= TEST CODE =========== //
    let suggestion = suggestions.at(n);//find(item => item.id == n.toString());

    res.send(suggestion).status(200);
  } catch (e) {
    res.send('BAD REQUEST').status(500);
  }
});

router.post('/v1/suggestion', async (req, res) => {
  let { lengthOfTrip, type } = req.body;

  if (type == undefined || lengthOfTrip == undefined) {
    res.status(400).send("Itinerary parameters are required");
    return;
  }

  try {
    let typeName = service.getItineraryTypeById(type);
    service.getAnItineraryByType(typeName, { length: lengthOfTrip })
        .then((suggestion) => {
          res.send(suggestion);
        });
  } catch (e) {
    res.status(500).send('BAD REQUEST');
  }
});

router.post('/v1/replace', async (req, res) => {
  let { type, exclude } = req.body;

  if (type == undefined) {
    res.status(400).send("A place type is required before replacing any.");
    return;
  }
  if (exclude == undefined || exclude.length == 0) {
    res.status(400).send("A list of place ids is required before replacing any.");
    return;
  }

  try {
    let typeName = service.getItineraryTypeById(type);
    service.getOnePlace(typeName, exclude)
        .then((replacement) => {
          res.send(replacement);
        });
  } catch (e) {
    res.status(500).send('BAD REQUEST');
  }
});

export default router;

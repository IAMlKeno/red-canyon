import express from "express";
import { ItineraryService } from "../controllers/ItineraryService";
import { ItineraryServiceInterface } from "../interfaces/ItineraryServiceInterface";

const router = express.Router();
const service: ItineraryServiceInterface = new ItineraryService();

// Get types
router.get('/types', async (req, res) => {
  let results = service.getItineraryTypes();

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
    let typeName = service.getItineraryTypeById(type);
    let suggestion = service.getAnItineraryByType(typeName)

    res.send(suggestion).status(200);
  } catch (e) {
    res.send('BAD REQUEST').status(500);
  }
});

export default router;
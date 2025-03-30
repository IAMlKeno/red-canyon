import 'dotenv/config';
import express from "express";
import { ItineraryService } from "../services/ItineraryService";
import { generateANumber } from "../utils/mathUtil";
import suggestions from "../static/data/suggestions";
import { ItineraryType } from "../interfaces/ItineraryInterface";
import { ItineraryHandler } from "../handlers/ItineraryHandler";
import { GoogleAuth } from 'google-auth-library';
import { PlacesClient } from '@googlemaps/places';
import { ItineraryServiceInterface } from '../interfaces/services/ItineraryServiceInterface';


const router = express.Router();

const auth = new GoogleAuth({apiKey: process.env['GOOGLE_API_KEY']});
const service: ItineraryServiceInterface = new ItineraryService(new PlacesClient({ auth }));
const handler: ItineraryHandler<typeof service> = new ItineraryHandler(service);

// Get types
router.get('/types', async (req, res) => {
  handler.getTypes().then((typesResponse) => {
    if (typesResponse.length > 0) {
      res.send(typesResponse).status(200);
    } else {
      res.send('No types found').status(404);
    }
  });
});

router.get('/types/:id', async (req, res) => {
  handler.getTypeById(req.params.id).then((typeResponse) => {
    if (typeResponse == undefined) {
      res.send('NO RESULTS').status(404);
    } else {
      res.send(typeResponse).status(200);
    }
  })

});

router.post('/v1/suggestion', async (req, res) => {
  let { lengthOfTrip, type } = req.body;

  if (type == undefined || lengthOfTrip == undefined) {
    res.status(400).send("Itinerary parameters are required");
    return;
  }

  try {
    let typeName: ItineraryType = service.getItineraryTypeById(type);
    handler.getAnItinerary(typeName, lengthOfTrip)
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
    handler.getTypeById(type).then((typeObj) => {
      handler.getOnePlace(typeObj, exclude)
        .then((replacement) => {
          res.send(replacement);
        });
    });
  } catch (e) {
    res.status(500).send('BAD REQUEST');
  }
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

export default router;

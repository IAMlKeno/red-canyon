import 'dotenv/config';
import express from "express";
import { ItineraryService } from "../itinerary-engine/services/itinerary.service";
import { generateANumber } from "../utils/math.utils";
import { ItineraryInterface, ItineraryType } from "../itinerary-engine/interfaces/itinerary.interface";
import { GoogleAuth } from 'google-auth-library';
import { PlacesClient } from '@googlemaps/places';
import { ItineraryServiceInterface } from '../itinerary-engine/interfaces/services/itinerary.service.interface';
import { RedisCacheHandler } from '../itinerary-cache-engine/handlers/redis.handler';
import { ItineraryHandler } from '../itinerary-engine/handlers/itinerary.handler';
import suggestions from '../itinerary-engine/static/data/suggestions';


const router = express.Router();

const auth = new GoogleAuth({apiKey: process.env['GOOGLE_API_KEY']});
const service: ItineraryServiceInterface = new ItineraryService(new PlacesClient({ auth }));
// const service: ItineraryServiceInterface = new ItineraryService(mockedPlacesClient as PlacesClient);
const handler: ItineraryHandler<typeof service> = new ItineraryHandler(service);

// Get types
router.get('/types', async (req, res) => {
  handler.getTypes().then((typesResponse: ItineraryType[]) => {
    if (typesResponse.length > 0) {
      res.send(typesResponse).status(200);
    } else {
      res.send('No types found').status(404);
    }
  });
});

router.get('/types/:id', async (req, res) => {
  handler.getTypeById(req.params.id).then((typeResponse: ItineraryType | undefined) => {
    if (typeResponse == undefined) {
      res.send('NO RESULTS').status(404);
    } else {
      res.send(typeResponse).status(200);
    }
  })

});

/**
 * This application expects session and user data to be tracked
 * and stored in the browser. With that in mind, its expected that the
 * apiBias is adjust from the front end.
 */
router.post('/v1/suggestion', async (req, res) => {
  let { lengthOfTrip, type, apiBias } = req.body;

  if (type == undefined || lengthOfTrip == undefined) {
    res.status(400).send("Itinerary parameters are required");
    return;
  }

  try {
    handler.getTypeById(type).then((typeResponse: ItineraryType) => {
      handler.getAnItinerary(typeResponse, lengthOfTrip)
        .then((suggestion: ItineraryInterface) => {
          res.send(suggestion);
        });
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
    let typeObj = await handler.getTypeById(type);
    let replacement = await handler.getOnePlace(typeObj, exclude);
    res.send(replacement);
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

router.post('/v1/test/cache', async (req, res) => {
  let obj = req.body.obj;
  const cacheHandler: RedisCacheHandler = new RedisCacheHandler();
  cacheHandler.addAPlace(suggestions[0].places[1], suggestions[0].type.name);
  res.send('cached something');
});

router.get('/v1/cache/list', async (req, res) => {
  // let obj = req.body.obj;
  // const cacheHandler: RedisCacheHandler = new RedisCacheHandler();
  // let r = await cacheHandler.listIndexes();/
  res.status(500).send('NOT IMPLEMENTEDD');
});

export default router;

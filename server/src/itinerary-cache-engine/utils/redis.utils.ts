import 'dotenv/config';
import { Place } from "../../itinerary-engine/interfaces/itinerary.interface";
import { createClient, RedisClientType, SchemaFieldTypes } from 'redis';
import { RedisResultSet } from '../types/cache.types';

/**
 * Store a place in cache using the google-provided placeId and the application
 * defined type. The redis key is formed using the key from "this.makeRedisKey".
 *
 * @param place Place object to store
 * @param type The type to categorize the place. This will be used for random selecting from cache.
 */
export async function storePlaceInCache(place: Partial<Place>, type: string): Promise<void> {
  const key: string = makeRedisKey(place.id, type);
  console.log(`attempting to add entry with key ${key}`);
  getRedisClient()
    .then((client: any) => {
      if (client != null) {
        // add the type;
        place['type'] = type;
        client.json.set(key, '$', place);
      } else {
        console.log(`no client to add`);
      }
    })
    .catch((e) => {
      console.log(`FAILED WRITING TO CACHE ${e}`);
    });
}

export async function existsInCache(placeId: string, type: string) {
  let result = await getPlaceFromCacheById(placeId, type);

  return Boolean(result);
}

/**
 * Get a singular place from the cache.
 *
 * @param placeId The google placeId
 * @param type The application defined type as string
 * @returns Place object or undefined
 */
export async function getPlaceFromCacheById(placeId: string, type?: string): Promise<Place | undefined> {
  let redisHit = undefined;

  try {
    if (type == undefined) {
      // search using just the placeId
      const result = await searchCacheById(placeId);
      redisHit = result.length > 0 ? result[0] : undefined;
    } else {
      const key = makeRedisKey(placeId, type);
      redisHit = (await getFromCache(key)) as Place;
    }
  } catch (e) {
    console.log(`CACHE MISS FOR PLACE ${placeId}`);
  } finally {
    return redisHit ?? undefined;
  }
}

export async function getRandomPlaceByTypeFromCache(type: string, max: number): Promise<RedisResultSet> {
  const client: RedisClientType = await getRedisClient();
  const results: RedisResultSet = await client.ft.search('$:places', `@type:{${type.toLowerCase()}}`, {
    LIMIT: { from: 0, size: max },
    SORTBY: {
      BY: 'RAND()',
      DIRECTION: 'ASC'
    }
   });

  return results;
}

/**
 * Search the cache for a place by only the placeId.
 *
 * @param placeId google placeId,
 * @returns An array of results used to create a place
 */
async function searchCacheById(placeId: string): Promise<any[]> {
  const client: RedisClientType = await getRedisClient();
  const results = await client.ft.search('$:places', `@placeId:{${placeId}}`);

  return (results.total > 0) ? results.documents : [];
}

/**
 * Constructs our Redis place key.
 * @param placeId The google placeId
 * @param typeName [Optional] The application-defined type of the place.
 * @returns string
 */
export function makeRedisKey(placeId: string, typeName: string): string {
  return `places:${typeName.toLowerCase()}:${placeId}`;
}

/**
 * Attempts to retrive a cache entry using the passed key.
 */
export async function getFromCache(key: string): Promise<Object> {
  const client: any = await getRedisClient();
  if (client == null || key == '') return;

  return client.json.get(key);
}

/**
 * Creates a redis client and attempts to connect to it.
 *
 * @returns [RedisClientType | null]
 */
async function getRedisClient(): Promise<any | null> {
  const retries = 3;
  let attempt = 1;
  let client = undefined;
  const redisUrl = process.env['NODE_REDIS'];
  while (attempt <= 3 || client == undefined) {
    try {
      attempt++;
      client = createClient({ url: redisUrl });
      await client.connect();

      createPlaceIndex(client);

      return client;
    } catch(e) {
      console.log(`something failed with redis setup ${e}`);
      if (attempt == retries) {
        return null;
      }
    }
  }
}

export async function listIndexes(client: any): Promise<Array<string>> {
  return await client.ft._LIST();
}

/**
 * Create indexes on the redis cache for each place type.
 * Indexes created on the following fields:
 *  [place.id] - google placeId,
 *  [name] - the name of place. ex. My Restaurant,
 *  [type] - The place type
 * Currently unsure how to check if the index exists before creating
 * looking at this example https://github.com/redis/node-redis/blob/924dafabc3c177cb1d3be4df0d685f679b5bbc19/examples/search-knn.js#L16-L36
 * it is observed that an error will be thrown if the index exists already. So
 * maybe run this when the redis client is fetched.
 * @param client The redis client
 */
async function createPlaceIndex(client: any): Promise<void> {

  const indexes: Array<string> = await listIndexes(client);
  ['Foodie', 'Action', 'Adventure']
    .forEach(async (uCType) => {
      const type = uCType.toLowerCase();
      let indexStr = `places:${type}`;
      try {
        if (!indexes.includes(indexStr)) {
          console.log(`Index: ${indexStr} doesnt exist, creating it`);
          await client.ft.create(indexStr, {
            id: SchemaFieldTypes.TEXT,
            name: SchemaFieldTypes.TEXT,
            type: SchemaFieldTypes.TEXT,
          }, {
            ON: 'JSON',
            PREFIX: `places:${type}:`
          });
        } else {
          console.log(`Index: ${indexStr} exist, nothing to do`);
        }
      } catch(e) {
        console.log(`FAILED TO CREATE INDEX: ${indexStr}: ${e}`);
      }
    });
}

/**
 * Use an aggregate function just to check if anyhting exists in redis.
 * @returns boolean showing if any results in redis
 */
export async function isPlaceCacheEmpty(): Promise<boolean> {return false;}

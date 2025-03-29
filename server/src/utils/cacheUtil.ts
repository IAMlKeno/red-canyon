import 'dotenv/config';
import { Place } from "../interfaces/ItineraryInterface";
import { createClient, RedisClientType, SchemaFieldTypes, SearchOptions } from 'redis';

/**
 * Store a place in cache using the google-provided placeId and the application
 * defined type. The redis key is formed using the key from "this.makeRedisKey".
 *
 * @param place Place object to store
 * @param type The type to categorize the place. This will be used for random selecting from cache.
 */
export async function storePlaceInCache(place: Partial<Place>, type: string): Promise<void> {
  const key: string = makeRedisKey(place.id, type);
  getRedisClient()
    .then((client: RedisClientType | null) => {
      if (client != null) {
        // add the type;
        place['type'] = type;
        client.json.set(key, '$', place);
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
      redisHit = (await getFromCache(makeRedisKey(placeId, type))) as Place;
    }
  } catch (e) {
    console.log(`CACHE MISS FOR PLACE ${placeId}`);
  } finally {
    return redisHit;
  }
}

export async function getRandomPlaceByTypeFromCache(type: string, max: number): Promise<RedisResultSet> {
  const client: RedisClientType = await getRedisClient();
  const results: RedisResultSet = await client.ft.search('$:places', `@type:{${type}}`, { LIMIT: { from: 0, size: max } });

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
  return `places:${typeName}:${placeId}`;
}

/**
 * Attempts to retrive a cache entry using the passed key.
 */
export async function getFromCache(key: string): Promise<Object> {
  const client: RedisClientType | null = await getRedisClient();
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
  while (attempt <= 3) {
    try {
      attempt++;
      const client = createClient({ url: process.env['NODE_REDIS'] });
      await client.connect();

      return client;
    } catch(e) {
      if (attempt == retries) {
        return null;
      }
    }
  }
}

/**
 * Create indexes on the redis cache for each place type.
 * Indexes created on the following fields:
 *  [placeId] - google placeId,
 *  [name] - the name of place. ex. My Restaurant,
 *  [type] - The place type
 * @param client The redis client
 */
async function createPlaceIndex(client: RedisClientType): Promise<void> {
  const types: string[] = ['Foodie', 'Action', 'Adventure'];

  types.forEach((type: string) => {
    Promise.all([
      client.ft.create('$:places', {
        placeId: {
          type: SchemaFieldTypes.TEXT,
          AS: 'placeId'
        },
        name: SchemaFieldTypes.TEXT,
        type: SchemaFieldTypes.TEXT,
      }, {
          ON: 'JSON',
          PREFIX: `places:${type}:`
      }),
    ]);
  });
}

type RedisResultSet = {
  total: number;
  documents: {
      id: string;
      value: any;
  }[];
};

export async function isPlaceCacheEmpty(): Promise<boolean> {return false;}
import { protos } from "@googlemaps/places";
import { DEFAULT_LANG, DEFAULT_PLACES_PER_DAY, DEFAULT_REGION } from "../constants";

/**
 * Creates a request object for the searchText API method.
 *
 * @param type Text representing a single supported place type
 * @param text A text query to search by
 * @param max The max number of results
 * @param lang A supported language code.
 * @param region A supported region code.
 * @returns protos.google.maps.places.v1.ISearchTextRequest
 */
export function createSearchRequest(
  type: string,
  text: string,
  max: number | undefined = undefined,
  lang: string | null = null,
  region: string | null = null
): protos.google.maps.places.v1.ISearchTextRequest {
  const req: protos.google.maps.places.v1.ISearchTextRequest = {
    textQuery: text,
    includedType: type,
    locationBias: this.locationBias,
    languageCode: lang ?? this.defaultLangPref,
    maxResultCount: max ?? this.placesPerDay,
    regionCode: region ?? this.defaultRegion,
    strictTypeFiltering: false,
  };

  return req;
}

/**
 * Creates a request object for the SearchNearby API method.
 *
 * @param type Array of strings representing supported place types
 * @param locationRestriction protos.google.maps.places.v1.SearchNearbyRequest.ILocationRestriction
 * @param max The max number of results
 * @param lang A supported language code.
 * @param region A supported region code.
 * @returns protos.google.maps.places.v1.ISearchNearbyRequest
 */
export function createNearbySearchRequest(
  type: string[],
  locationRestriction: protos.google.maps.places.v1.SearchNearbyRequest.ILocationRestriction,
  max: number | undefined = undefined,
  lang: string | null = null,
  region: string | null = null
): protos.google.maps.places.v1.ISearchNearbyRequest {
  const req: protos.google.maps.places.v1.ISearchNearbyRequest = {
    includedTypes: type,
    locationRestriction: locationRestriction,
    languageCode: lang ?? DEFAULT_LANG,
    maxResultCount: max ?? DEFAULT_PLACES_PER_DAY,
    regionCode: region ?? DEFAULT_REGION,
  };

  return req;
}

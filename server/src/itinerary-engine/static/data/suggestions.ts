import { generateUuid } from "../../../utils/math.utils";
import { ItineraryInterface } from "../../interfaces/itinerary.interface";
import { itineraryTypes } from "./itinerary";

const suggestions: ItineraryInterface[] = [
  {
    id: generateUuid(),
    type: itineraryTypes[0], //adventure
    places: [
      {
        id: "ChIJC_3cdla3j4ARMgf4Pw8Irek",
        name: 'Cucina Venti Restaurant',
        description: "Explore to your heart's content",
        location: '1390 Pear Ave Ste D, Mountain View, CA 94043, USA',
        realLocation: {
          lat: 37.4159532,
          lng: 37.4159532
        },
        operatingHours: {
          hours: 1,
          minutes: 46,
          seconds: 0,
          periods: [
            {
                open: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 10
                    },
                    day: 1,
                    _day: "day",
                    hour: 11,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                },
                close: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 10
                    },
                    day: 1,
                    _day: "day",
                    hour: 21,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                }
            },
            {
                open: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 11
                    },
                    day: 2,
                    _day: "day",
                    hour: 11,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                },
                close: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 11
                    },
                    day: 2,
                    _day: "day",
                    hour: 21,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                }
            },
            {
                open: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 12
                    },
                    day: 3,
                    _day: "day",
                    hour: 11,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                },
                close: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 12
                    },
                    day: 3,
                    _day: "day",
                    hour: 21,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                }
            },
            {
                open: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 13
                    },
                    day: 4,
                    _day: "day",
                    hour: 11,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                },
                close: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 13
                    },
                    day: 4,
                    _day: "day",
                    hour: 21,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                }
            },
            {
                open: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 14
                    },
                    day: 5,
                    _day: "day",
                    hour: 11,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                },
                close: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 14
                    },
                    day: 5,
                    _day: "day",
                    hour: 22,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                }
            },
            {
                open: {
                    "truncated": false,
                    "date": {
                        "year": 2025,
                        "month": 3,
                        "day": 15
                    },
                    "day": 6,
                    "_day": "day",
                    "hour": 16,
                    "_hour": "hour",
                    "minute": 0,
                    "_minute": "minute"
                },
                close: {
                    "truncated": false,
                    "date": {
                        "year": 2025,
                        "month": 3,
                        "day": 15
                    },
                    day: 6,
                    _day: "day",
                    hour: 22,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                }
            }
          ],
          weekdayDescriptions: [
              "Monday: 11:00\u202fAM – 9:00\u202fPM",
              "Tuesday: 11:00\u202fAM – 9:00\u202fPM",
              "Wednesday: 11:00\u202fAM – 9:00\u202fPM",
              "Thursday: 11:00\u202fAM – 9:00\u202fPM",
              "Friday: 11:00\u202fAM – 10:00\u202fPM",
              "Saturday: 4:00 – 10:00\u202fPM",
              "Sunday: Closed"
          ],
          specialDays: [],
          secondaryHoursType: "SECONDARY_HOURS_TYPE_UNSPECIFIED",
          nextOpenTime: null,
          nextCloseTime: {
              seconds: "1741665600",
              nanos: 0
          },
          openNow: true,
          _openNow: "openNow"
        },
        rating: 4.5
      },
      {
        id: "ChIJTzWDpDO3j4ARI08nSK_WLeU",
        name: 'Scratch',
        location: '401 Castro St #100, Mountain View, CA 94041, USA',
        description: "Explore to your heart's content",
        realLocation: {
          lat: 37.391093,
          lng: 37.391093
        },
        operatingHours: {
          hours: 1,
          minutes: 46,
          seconds: 0,
          periods: [
            {
                open: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 10
                    },
                    day: 1,
                    _day: "day",
                    hour: 11,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                },
                close: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 10
                    },
                    day: 1,
                    _day: "day",
                    hour: 21,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                }
            },
            {
                open: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 11
                    },
                    day: 2,
                    _day: "day",
                    hour: 11,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                },
                close: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 11
                    },
                    day: 2,
                    _day: "day",
                    hour: 21,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                }
            },
            {
                open: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 12
                    },
                    day: 3,
                    _day: "day",
                    hour: 11,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                },
                close: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 12
                    },
                    day: 3,
                    _day: "day",
                    hour: 21,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                }
            },
            {
                open: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 13
                    },
                    day: 4,
                    _day: "day",
                    hour: 11,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                },
                close: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 13
                    },
                    day: 4,
                    _day: "day",
                    hour: 21,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                }
            },
            {
                open: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 14
                    },
                    day: 5,
                    _day: "day",
                    hour: 11,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                },
                close: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 14
                    },
                    day: 5,
                    _day: "day",
                    hour: 22,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                }
            },
            {
                open: {
                    "truncated": false,
                    "date": {
                        "year": 2025,
                        "month": 3,
                        "day": 15
                    },
                    "day": 6,
                    "_day": "day",
                    "hour": 16,
                    "_hour": "hour",
                    "minute": 0,
                    "_minute": "minute"
                },
                close: {
                    "truncated": false,
                    "date": {
                        "year": 2025,
                        "month": 3,
                        "day": 15
                    },
                    day: 6,
                    _day: "day",
                    hour: 22,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                }
            }
          ],
          weekdayDescriptions: [
              "Monday: 11:00\u202fAM – 9:00\u202fPM",
              "Tuesday: 11:00\u202fAM – 9:00\u202fPM",
              "Wednesday: 11:00\u202fAM – 9:00\u202fPM",
              "Thursday: 11:00\u202fAM – 9:00\u202fPM",
              "Friday: 11:00\u202fAM – 10:00\u202fPM",
              "Saturday: 4:00 – 10:00\u202fPM",
              "Sunday: Closed"
          ],
          specialDays: [],
          secondaryHoursType: "SECONDARY_HOURS_TYPE_UNSPECIFIED",
          nextOpenTime: null,
          nextCloseTime: {
              seconds: "1741665600",
              nanos: 0
          },
          openNow: true,
          _openNow: "openNow"
        },
        rating: 4.5
      }
    ]
  },
  {
    id: generateUuid(),
    type: itineraryTypes[1], //action
    places: [
      {
        id: "ChIJTzWDpDO3j4ARI08nSK_WLeU",
        name: 'Sims',
        location: 'Some address',
        description: "Explore to your heart's content",
        realLocation: {
          lat: 37.391093,
          lng: 37.391093
        },
        operatingHours: {
          hours: 1,
          minutes: 46,
          seconds: 0,
          periods: [
            {
                open: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 10
                    },
                    day: 1,
                    _day: "day",
                    hour: 11,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                },
                close: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 10
                    },
                    day: 1,
                    _day: "day",
                    hour: 21,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                }
            },
            {
                open: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 11
                    },
                    day: 2,
                    _day: "day",
                    hour: 11,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                },
                close: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 11
                    },
                    day: 2,
                    _day: "day",
                    hour: 21,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                }
            },
            {
                open: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 12
                    },
                    day: 3,
                    _day: "day",
                    hour: 11,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                },
                close: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 12
                    },
                    day: 3,
                    _day: "day",
                    hour: 21,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                }
            },
            {
                open: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 13
                    },
                    day: 4,
                    _day: "day",
                    hour: 11,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                },
                close: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 13
                    },
                    day: 4,
                    _day: "day",
                    hour: 21,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                }
            },
            {
                open: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 14
                    },
                    day: 5,
                    _day: "day",
                    hour: 11,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                },
                close: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 14
                    },
                    day: 5,
                    _day: "day",
                    hour: 22,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                }
            },
            {
                open: {
                    "truncated": false,
                    "date": {
                        "year": 2025,
                        "month": 3,
                        "day": 15
                    },
                    "day": 6,
                    "_day": "day",
                    "hour": 16,
                    "_hour": "hour",
                    "minute": 0,
                    "_minute": "minute"
                },
                close: {
                    "truncated": false,
                    "date": {
                        "year": 2025,
                        "month": 3,
                        "day": 15
                    },
                    day: 6,
                    _day: "day",
                    hour: 22,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                }
            }
          ],
          weekdayDescriptions: [
              "Monday: 11:00\u202fAM – 9:00\u202fPM",
              "Tuesday: 11:00\u202fAM – 9:00\u202fPM",
              "Wednesday: 11:00\u202fAM – 9:00\u202fPM",
              "Thursday: 11:00\u202fAM – 9:00\u202fPM",
              "Friday: 11:00\u202fAM – 10:00\u202fPM",
              "Saturday: 4:00 – 10:00\u202fPM",
              "Sunday: Closed"
          ],
          specialDays: [],
          secondaryHoursType: "SECONDARY_HOURS_TYPE_UNSPECIFIED",
          nextOpenTime: null,
          nextCloseTime: {
              seconds: "1741665600",
              nanos: 0
          },
          openNow: true,
          _openNow: "openNow"
        },
        rating: 4.5
      },
      {
        id: "ChIJTzWDpDO3j4ARI08nSK_WLeU",
        name: 'Sims',
        location: 'Some address',
        description: "Explore to your heart's content",
        realLocation: {
          lat: 37.391093,
          lng: 37.391093
        },
        operatingHours: {
          hours: 1,
          minutes: 46,
          seconds: 0,
          periods: [
            {
                open: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 10
                    },
                    day: 1,
                    _day: "day",
                    hour: 11,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                },
                close: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 10
                    },
                    day: 1,
                    _day: "day",
                    hour: 21,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                }
            },
            {
                open: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 11
                    },
                    day: 2,
                    _day: "day",
                    hour: 11,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                },
                close: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 11
                    },
                    day: 2,
                    _day: "day",
                    hour: 21,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                }
            },
            {
                open: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 12
                    },
                    day: 3,
                    _day: "day",
                    hour: 11,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                },
                close: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 12
                    },
                    day: 3,
                    _day: "day",
                    hour: 21,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                }
            },
            {
                open: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 13
                    },
                    day: 4,
                    _day: "day",
                    hour: 11,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                },
                close: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 13
                    },
                    day: 4,
                    _day: "day",
                    hour: 21,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                }
            },
            {
                open: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 14
                    },
                    day: 5,
                    _day: "day",
                    hour: 11,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                },
                close: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 14
                    },
                    day: 5,
                    _day: "day",
                    hour: 22,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                }
            },
            {
                open: {
                    "truncated": false,
                    "date": {
                        "year": 2025,
                        "month": 3,
                        "day": 15
                    },
                    "day": 6,
                    "_day": "day",
                    "hour": 16,
                    "_hour": "hour",
                    "minute": 0,
                    "_minute": "minute"
                },
                close: {
                    "truncated": false,
                    "date": {
                        "year": 2025,
                        "month": 3,
                        "day": 15
                    },
                    day: 6,
                    _day: "day",
                    hour: 22,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                }
            }
          ],
          weekdayDescriptions: [
              "Monday: 11:00\u202fAM – 9:00\u202fPM",
              "Tuesday: 11:00\u202fAM – 9:00\u202fPM",
              "Wednesday: 11:00\u202fAM – 9:00\u202fPM",
              "Thursday: 11:00\u202fAM – 9:00\u202fPM",
              "Friday: 11:00\u202fAM – 10:00\u202fPM",
              "Saturday: 4:00 – 10:00\u202fPM",
              "Sunday: Closed"
          ],
          specialDays: [],
          secondaryHoursType: "SECONDARY_HOURS_TYPE_UNSPECIFIED",
          nextOpenTime: null,
          nextCloseTime: {
              seconds: "1741665600",
              nanos: 0
          },
          openNow: true,
          _openNow: "openNow"
        },
        rating: 4.5
      }
    ]
  },
  {
    id: generateUuid(),
    type: itineraryTypes[2], //Foodie
    places: [
      {
        id: "ChIJTzWDpDO3j4ARI08nSK_WLeU",
        name: 'Sims',
        location: 'Some address',
        description: "Explore to your heart's content",
        realLocation: {
          lat: 37.391093,
          lng: 37.391093
        },
        operatingHours: {
          hours: 1,
          minutes: 46,
          seconds: 0,
          periods: [
            {
                open: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 10
                    },
                    day: 1,
                    _day: "day",
                    hour: 11,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                },
                close: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 10
                    },
                    day: 1,
                    _day: "day",
                    hour: 21,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                }
            },
            {
                open: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 11
                    },
                    day: 2,
                    _day: "day",
                    hour: 11,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                },
                close: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 11
                    },
                    day: 2,
                    _day: "day",
                    hour: 21,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                }
            },
            {
                open: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 12
                    },
                    day: 3,
                    _day: "day",
                    hour: 11,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                },
                close: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 12
                    },
                    day: 3,
                    _day: "day",
                    hour: 21,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                }
            },
            {
                open: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 13
                    },
                    day: 4,
                    _day: "day",
                    hour: 11,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                },
                close: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 13
                    },
                    day: 4,
                    _day: "day",
                    hour: 21,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                }
            },
            {
                open: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 14
                    },
                    day: 5,
                    _day: "day",
                    hour: 11,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                },
                close: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 14
                    },
                    day: 5,
                    _day: "day",
                    hour: 22,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                }
            },
            {
                open: {
                    "truncated": false,
                    "date": {
                        "year": 2025,
                        "month": 3,
                        "day": 15
                    },
                    "day": 6,
                    "_day": "day",
                    "hour": 16,
                    "_hour": "hour",
                    "minute": 0,
                    "_minute": "minute"
                },
                close: {
                    "truncated": false,
                    "date": {
                        "year": 2025,
                        "month": 3,
                        "day": 15
                    },
                    day: 6,
                    _day: "day",
                    hour: 22,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                }
            }
          ],
          weekdayDescriptions: [
              "Monday: 11:00\u202fAM – 9:00\u202fPM",
              "Tuesday: 11:00\u202fAM – 9:00\u202fPM",
              "Wednesday: 11:00\u202fAM – 9:00\u202fPM",
              "Thursday: 11:00\u202fAM – 9:00\u202fPM",
              "Friday: 11:00\u202fAM – 10:00\u202fPM",
              "Saturday: 4:00 – 10:00\u202fPM",
              "Sunday: Closed"
          ],
          specialDays: [],
          secondaryHoursType: "SECONDARY_HOURS_TYPE_UNSPECIFIED",
          nextOpenTime: null,
          nextCloseTime: {
              seconds: "1741665600",
              nanos: 0
          },
          openNow: true,
          _openNow: "openNow"
        },
        rating: 4.5
      },
      {
        id: "ChIJTzWDpDO3j4ARI08nSK_WLeU",
        name: 'Sims',
        location: 'Some address',
        description: "Explore to your heart's content",
        realLocation: {
          lat: 37.391093,
          lng: 37.391093
        },
        operatingHours: {
          hours: 1,
          minutes: 46,
          seconds: 0,
          periods: [
            {
                open: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 10
                    },
                    day: 1,
                    _day: "day",
                    hour: 11,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                },
                close: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 10
                    },
                    day: 1,
                    _day: "day",
                    hour: 21,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                }
            },
            {
                open: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 11
                    },
                    day: 2,
                    _day: "day",
                    hour: 11,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                },
                close: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 11
                    },
                    day: 2,
                    _day: "day",
                    hour: 21,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                }
            },
            {
                open: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 12
                    },
                    day: 3,
                    _day: "day",
                    hour: 11,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                },
                close: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 12
                    },
                    day: 3,
                    _day: "day",
                    hour: 21,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                }
            },
            {
                open: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 13
                    },
                    day: 4,
                    _day: "day",
                    hour: 11,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                },
                close: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 13
                    },
                    day: 4,
                    _day: "day",
                    hour: 21,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                }
            },
            {
                open: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 14
                    },
                    day: 5,
                    _day: "day",
                    hour: 11,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                },
                close: {
                    truncated: false,
                    date: {
                        year: 2025,
                        month: 3,
                        day: 14
                    },
                    day: 5,
                    _day: "day",
                    hour: 22,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                }
            },
            {
                open: {
                    "truncated": false,
                    "date": {
                        "year": 2025,
                        "month": 3,
                        "day": 15
                    },
                    "day": 6,
                    "_day": "day",
                    "hour": 16,
                    "_hour": "hour",
                    "minute": 0,
                    "_minute": "minute"
                },
                close: {
                    "truncated": false,
                    "date": {
                        "year": 2025,
                        "month": 3,
                        "day": 15
                    },
                    day: 6,
                    _day: "day",
                    hour: 22,
                    _hour: "hour",
                    minute: 0,
                    _minute: "minute"
                }
            }
          ],
          weekdayDescriptions: [
              "Monday: 11:00\u202fAM – 9:00\u202fPM",
              "Tuesday: 11:00\u202fAM – 9:00\u202fPM",
              "Wednesday: 11:00\u202fAM – 9:00\u202fPM",
              "Thursday: 11:00\u202fAM – 9:00\u202fPM",
              "Friday: 11:00\u202fAM – 10:00\u202fPM",
              "Saturday: 4:00 – 10:00\u202fPM",
              "Sunday: Closed"
          ],
          specialDays: [],
          secondaryHoursType: "SECONDARY_HOURS_TYPE_UNSPECIFIED",
          nextOpenTime: null,
          nextCloseTime: {
              seconds: "1741665600",
              nanos: 0
          },
          openNow: true,
          _openNow: "openNow"
        },
        rating: 4.5
      }
    ]
  }
];

export default suggestions;
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';

import { userStore } from '@/userStore';
import type { Place } from '@/models/ItineraryInterface';
import { dividePlaces, getUserFriendlyDate } from './webUtils';

(pdfMake as any).vfs = pdfFonts.vfs;

export const createPdf = (text: string): Promise<void> => {
  const docDefinition = buildPdfDoc() as TDocumentDefinitions;

  const pdfDocGenerator = pdfMake.createPdf(docDefinition);

  return new Promise((resolve, reject) => {
    // These are examples, you can choose your preferred download method
    // pdfDocGenerator.download('generated.pdf'); 
    pdfDocGenerator.open(); // Opens in a new tab
    // pdfDocGenerator.print(); 

  });
};

function buildPdfDoc() {
  if (userStore.currentItinerary == undefined) return;

  const itinerary = userStore.currentItinerary

  let doc: Record<string, any> = {};
  doc['header'] = [{
    text: `Your suggested itinerary`,
    style: {
      fontSize: 20,
      bold: true
    },
    alignment: 'center',
    // marginTop: 20,
  }];

  const dividedPlaces = dividePlaces(itinerary.places);
  const days: Array<any> = [];

  dividedPlaces.forEach((dayAndPlaces: Partial<Place>[], index) => {
    days.push(`Day ${index + 1}:`);
    const activities: Record<string, string[]> = {ul: []};
    dayAndPlaces.forEach((place: Partial<Place>) => {
      const line: string = place.name != undefined
          ? `${place.name} (${place.location})`
          : 'Name Unavailable';
      activities.ul.push(line);
    });
    days.push(activities);
  });

  const preContent = [
    {
      text: `${getUserFriendlyDate(userStore.date.startDate)} to ${getUserFriendlyDate(userStore.date.endDate)}`,
      alignment: 'center',
    }
  ];

  doc['content'] = [...preContent, ...days];
  doc['footer'] = [{
    text: 'Brought to you by Avanti Insieme - Powered by Google',
    style: {
      fontSize: 12
    },
    italic: true,
    alignment: 'right',
    margin: [0, 0, 10, 10],
  }];

  return doc;
}

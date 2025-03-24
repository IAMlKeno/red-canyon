import { userStore } from '@/userStore';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import { dividePlaces, getUserFriendlyDate } from './webUtils';
import { placesPerDay } from '@/constants';
import type { Place } from '@/models/ItineraryInterface';

(pdfMake as any).vfs = pdfFonts.vfs;

export const createPdf = (text: string): Promise<void> => {
  // const docDefinition = {
  //   content: [
  //     { text: text },
  //   ]
  // };
  const docDefinition = buildPdfDoc() as TDocumentDefinitions;

  const pdfDocGenerator = pdfMake.createPdf(docDefinition);

  return new Promise((resolve, reject) => {
    // These are examples, you can choose your preferred download method
    // pdfDocGenerator.download('generated.pdf'); 
    pdfDocGenerator.open(); // Opens in a new tab
    // pdfDocGenerator.print(); 

    // pdfDocGenerator.on('error', (err) => {
    //   console.error('Error creating PDF:', err);
    //   reject(err);
    // });

    // pdfDocGenerator.on('end', () => {
    //   console.log('PDF generated successfully');
    //   resolve();
    // });
  });
};

function buildPdfDoc() {
  if (userStore.currentItinerary == undefined) return;

  const itinerary = userStore.currentItinerary

  let doc: Record<string, any> = {};
  doc['header'] = `Your suggested itinerary for ${getUserFriendlyDate(userStore.date.startDate)} to ${getUserFriendlyDate(userStore.date.endDate)}`;

  const dividedPlaces = dividePlaces(itinerary.places);
  const days: Array<any> = [];

  dividedPlaces.forEach((dayAndPlaces: Partial<Place>[], index) => {
    days.push(`Day ${index + 1}:`);
    const activities: Record<string, string[]> = {ul: []};
    dayAndPlaces.forEach((place: Partial<Place>) => {
      activities.ul.push(place.name ?? 'Name Unavailable');
    });
    days.push(activities);
  });

  doc['content'] = days;
  doc['footer'] = 'Brought to you by Avanti Insieme - Powered by Google';

  return doc;
}
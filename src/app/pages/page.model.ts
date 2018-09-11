import { ImageFilter } from './image-filter.model';

export class Page {
  id?: string;
  name: string;
  heading: string;
  subHeading: string;
  hasPersonalProjection: boolean;
  personalProjectionMessage: string;
  fullRangeMessage: string;
  imageFilterCurrentCompany: ImageFilter;
  imageFilterBigCompany: ImageFilter;
  imageFilterNone: ImageFilter;

  constructor(page: Page) {
    this.id = page.id ? page.id : null;
    this.name = page.name ? page.name : null,
    this.heading = page.heading ? page.heading : null;
    this.subHeading = page.subHeading ? page.subHeading : null;
    this.hasPersonalProjection = page.hasPersonalProjection ? page.hasPersonalProjection : false;
    this.personalProjectionMessage = page.personalProjectionMessage ? page.personalProjectionMessage : null;
    this.fullRangeMessage = page.fullRangeMessage ? page.fullRangeMessage : null;
    this.imageFilterBigCompany = page.imageFilterBigCompany ? new ImageFilter(page.imageFilterBigCompany) : null;
    this.imageFilterCurrentCompany = page.imageFilterCurrentCompany ? new ImageFilter(page.imageFilterCurrentCompany) : null;
    this.imageFilterNone = page.imageFilterNone ? new ImageFilter(page.imageFilterNone) : null;
  }
}

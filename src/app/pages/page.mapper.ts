import { Page } from './page.model';
import { ImageFilter } from './image-filter.model';

export class PageMapper {
  constructor() {}

  mapPageFromJson(json: any): Page {
    const page = {
      id: json._id,
      name: json.name ? json.name : null,
      heading: json.heading ? json.heading : null,
      subHeading: json.subHeading ? json.subHeading : null,
      hasPersonalProjection: json.hasPersonalProjection ? json.hasPersonalProjection : false,
      personalProjectionMessage: json.personalProjectionMessage
        ? json.personalProjectionMessage
        : null,
      fullRangeMessage: json.fullRangeMessage ? json.fullRangeMessage : null,
      imageFilterBigCompany: json.imageFilterBigCompany ? this.mapImageFilterFromJson(json.imageFilterBigCompany) : null,
    imageFilterCurrentCompany: json.imageFilterCurrentCompany ? this.mapImageFilterFromJson(json.imageFilterCurrentCompany) : null,
    imageFilterNone: json.imageFilterNone ? this.mapImageFilterFromJson(json.imageFilterNone) : null
    };
    return new Page(page);
  }

  mapPageToJson(page: Page): any {
    return {
      _id: page.id ? page.id : null,
      name: page.name ? page.name : null,
      heading: page.heading ? page.heading : null,
      subHeading: page.subHeading ? page.subHeading : null,
      hasPersonalProjection: page.hasPersonalProjection
        ? page.hasPersonalProjection
        : false,
      personalProjectionMessage: page.personalProjectionMessage
        ? page.personalProjectionMessage
        : null,
      fullRangeMessage: page.fullRangeMessage ? page.fullRangeMessage : null,
      imageFilterBigCompany: page.imageFilterBigCompany ? this.mapImageFilterToJson(page.imageFilterBigCompany) : null,
      imageFilterCurrentCompany: page.imageFilterCurrentCompany ? this.mapImageFilterToJson(page.imageFilterCurrentCompany) : null,
      imageFilterNone: page.imageFilterNone ? this.mapImageFilterToJson(page.imageFilterNone) : null
    };
  }

  mapImageFilterFromJson(json: any): ImageFilter {
    return {
      heading: json.heading ? json.heading : null,
      subHeading: json.subHeading ? json.subHeading : null,
      filter: json.filter ? json.filter : null,
      message: json.message ? json.message : null,
      showSubHeading: json.showSubHeading
        ? json.showSubHeading
        : false,
      isActive: json.isActive ? json.isActive : false
    };
  }

  mapImageFilterToJson(imageFilter: ImageFilter): any {
    return {
      heading: imageFilter.heading ? imageFilter.heading : null,
      subHeading: imageFilter.subHeading ? imageFilter.subHeading : null,
      filter: imageFilter.filter ? imageFilter.filter : null,
      message: imageFilter.message ? imageFilter.message : null,
      showSubHeading: imageFilter.showSubHeading
        ? imageFilter.showSubHeading
        : false,
      isActive: imageFilter.isActive ? imageFilter.isActive : false
    };
  }
}

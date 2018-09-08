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
      hasPersonalProjection: json.hasPersonalProjection
        ? json.hasPersonalProjection
        : false,
      personalProjectionMessage: json.personalProjectionMessage
        ? json.personalProjectionMessage
        : null,
      fullRangeMessage: json.fullRangeMessage ? json.fullRangeMessage : null,
      imageFilters: json.imageFilters
        ? this.getMenuFilters(json.imageFilters)
        : []
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
      menuFilter: page.imageFilters
        ? this.getMenuFilters(page.imageFilters)
        : []
    };
  }

  private getMenuFilters(imageFilters: Array<any>): Array<any> {
    var sanitizedImageFilters = [];
    if (imageFilters && imageFilters.length) {
      sanitizedImageFilters.push({
        currentCompany: this.getMenuFilter(imageFilters[0])
      });
      sanitizedImageFilters.push({
        bigCompany: this.getMenuFilter(imageFilters[1])
      });
      sanitizedImageFilters.push({ none: this.getMenuFilter(imageFilters[2]) });
    }
    return sanitizedImageFilters;
  }

  private getMenuFilter(imageFilter: any): ImageFilter {
    return {
      heading: imageFilter.heading ? imageFilter.heading : null,
      subHeading: imageFilter.subHeading ? imageFilter.subHeading : null,
      filter: imageFilter.filter ? imageFilter.filter : false,
      message: imageFilter.message ? imageFilter.message : null,
      showSubHeading: imageFilter.showSubHeading ? imageFilter.showSubHeading : false,
      isActive: imageFilter.isActive ? imageFilter.isActive : false
    };
  }
}

export class ImageFilter {
  heading: string;
  subHeading: string;
  filter: string;
  message: string;
  showSubHeading: boolean;
  isActive: boolean;

  constructor(imageFilter: ImageFilter) {
    this.heading = imageFilter.heading ? imageFilter.heading : null;
    this.subHeading = imageFilter.subHeading ? imageFilter.subHeading : null;
    this.filter = imageFilter.filter ? imageFilter.filter : null;
    this.message = imageFilter.message ? imageFilter.message : null;
    this.showSubHeading = imageFilter.showSubHeading ? imageFilter.showSubHeading : false;
    this.isActive = imageFilter.isActive ? imageFilter.isActive : false;
  }
}

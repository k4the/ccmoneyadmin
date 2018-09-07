import { ResultPage } from './result-page.model';

export class ResultPageMapper {
  constructor() {}

  mapFromJson(json: any): ResultPage {
    const resultPage = {
      id: json._id,
      hurray: json.hurray,
      youCanSave: json.youCanSave,
      sorted: json.sorted
    };
    return new ResultPage(resultPage);
  }

  mapToJson(resultPage: ResultPage): any {
    return {
      _id: resultPage.id ? resultPage.id : null,
      hurray: resultPage.hurray,
      youCanSave: resultPage.youCanSave,
      sorted: resultPage.sorted
    };
  }
}

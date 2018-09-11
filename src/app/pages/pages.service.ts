import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Page } from './page.model';
import { PageMapper } from './page.mapper';
import { PageUrl } from './pages.constants';

const pagesUrl = environment.apiUrl + PageUrl +  '/';

@Injectable({ providedIn: 'root' })
export class PagesService {

  constructor(
    private http: HttpClient,
    private pageMapper: PageMapper
  ) {}

  getPages(): Observable<Page[]> {
    const results = this.http.get<{ message: string; pages: Array<any> }>(pagesUrl);
    return results.pipe(
      map(pageData => {
        return pageData.pages.map(page => {
          return this.pageMapper.mapPageFromJson(page);
        });
      })
    );
  }

  addPage(page: Page): Observable<any> {
    if (page) {
      page = this.pageMapper.mapPageToJson(page);
      const result = this.http.post<{ message: string; pageId: string }>(pagesUrl, page);
      return result.pipe(
        map(pageData => {
          page.id = pageData.pageId;
        })
      );
    }
  }

  updatePage(id: string, page: Page): Observable<any> {
    if (page) {
      page = this.pageMapper.mapPageToJson(page);
      return this.http.put(pagesUrl + id, page);
    }
  }

  getPage(name: string): Observable<any> {
    if (name) {
      const result = this.http.get<{}>(pagesUrl + name);
      return result.pipe(
        map(pageData => {
          return this.pageMapper.mapPageFromJson(pageData);
        })
      );
    }
  }

  deletePage(id: string): Observable<any> {
    if (id) {
      return this.http.delete<{}>(pagesUrl + id);
    }
  }
}

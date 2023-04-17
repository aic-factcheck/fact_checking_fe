import http, { scrapingService } from "../http_common";
import { IArticle } from "../common/types";

class ArticlesService {

  getArticlesList() {
    const headers = { "Authorization": `Bearer ${localStorage.getItem('token')}` }; 
    return http.get<IArticle[]>("/articles" , { headers });
  }
   
  saveUnsaveArticle(saved: boolean, articleId: string) {
    const headers = { "Authorization": `Bearer ${localStorage.getItem('token')}` }; 
    if (!saved) {
        return http.post<any>(`/save?articleId=${articleId}`, { headers } );
    }
    return http.delete<any>(`/save?articleId=${articleId}`, { headers } );
  }

  getArticle(articleId: string){
    const headers = { "Authorization": `Bearer ${localStorage.getItem('token')}` }; 
    return http.get<IArticle>(`/articles/${articleId}`, { headers } );
  }

  getMyArticles(userId: string){
    const headers = { "Authorization": `Bearer ${localStorage.getItem('token')}` }; 
    return http.get<IArticle[]>(`/users/${userId}/articles`, { headers } );
  }

  getTextFromURL(urlAdress: string){
    const headers = { "Authorization": `Bearer ${localStorage.getItem('token')}` }; 
    return scrapingService.get<any>(`/extract/json?url=${urlAdress}`, { headers } );
  }

  editArticle(id: string, mergedValues: any) {
    const headers = { "Authorization": `Bearer ${localStorage.getItem('token')}` }; 
    return http.patch<any>(`/articles/${id}`, mergedValues, { headers } );
  }

  createArticle(mergedValues: any) {
    const headers = { "Authorization": `Bearer ${localStorage.getItem('token')}` }; 
    return http.post<any>(`/articles`, mergedValues, { headers } );
  }

}

export default new ArticlesService();
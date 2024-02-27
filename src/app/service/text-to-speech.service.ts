import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TextRequest } from '../model/textRequest';

@Injectable({
  providedIn: 'root'
})
export class TextToSpeechService {
  private readonly apiUrl = 'https://localhost:5000/api/TextToSpeech';

  constructor(private http: HttpClient) { }

  synthesizeText(request: TextRequest): Observable<Blob> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Blob>(this.apiUrl + '/synthesize', request, { headers, responseType: 'blob' as 'json' });
  }
}

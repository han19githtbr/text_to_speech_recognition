import { Component } from '@angular/core';
import { TextToSpeechService } from './service/text-to-speech.service';
import { LoadingService } from './service/loading.service';
import { TextRequest } from './model/textRequest';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'texttospeech';
  textToSynthesize: string = '';
  selectedLang!: string;
  voiceGender!: string;

  languageOptions = [
    { value: 'en-IN', label: 'English' },
    { value: 'fr-IN', label: 'French' },
    { value: 'pt-IN', label: 'Portuguese' }
  ];

  constructor(private textToSpeechService: TextToSpeechService, private loadingService: LoadingService) {
    this.voiceGender = "M";
  }

  synthesizeText(): void {
    this.loadingService.showLoader();
    this.textToSpeechService.synthesizeText(new TextRequest(this.textToSynthesize, this.selectedLang, this.voiceGender)).subscribe({
      next: (audioBlob) => {
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();
        this.loadingService.hideLoader();
      },
      error: (err) => {
        console.error('Error synthesizing text', err);
        this.loadingService.hideLoader();
      },
      complete: () => console.info('Request completed')
    });
  }
}

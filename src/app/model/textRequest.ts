export class TextRequest {
  text!: string;
  language!: string;
  voiceGender!: string;

  constructor(txt: string, lan: string, vg: string) {
    this.text = txt;
    this.language = lan;
    this.voiceGender = vg;
  }
}

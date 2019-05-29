export class mdFileUploaderConfig {
  multiple?: boolean;
  formatsAllowed?: string[];
  maxSize?: number; // in MB
  hideProgressBar?: boolean;
  hideResetBtn?: boolean;
  text?: string;
  uploadEndpoint?: string;
  constructor(
    _multiple?: boolean,
    _formatsAllowed?: string[],
    _maxSize?: number,
    _hideProgressBar?: boolean,
    _hideResetBtn?: boolean,
    _text?: string,
    _uploadEndpoint?: string
  ) {
    this.loadDefaults();
    if (_multiple != null) {
      this.multiple = _multiple;
    }
    if (_formatsAllowed != null) {
      this.formatsAllowed = _formatsAllowed;
    }
    if (_maxSize != null) {
      this.maxSize = _maxSize;
    }
    if (_hideProgressBar != null) {
      this.hideProgressBar = _hideProgressBar;
    }
    if (_hideResetBtn != null) {
      this.hideResetBtn = _hideResetBtn;
    }
    if (_text != null) {
      this.text = _text;
    }
    if (_uploadEndpoint != null) {
      this.uploadEndpoint = _uploadEndpoint;
    }
  }

  loadDefaults() {
    this.multiple = false;
    this.formatsAllowed = ["*"];
    this.maxSize = 20;
    this.hideProgressBar = false;
    this.hideResetBtn = false;
    this.uploadEndpoint = "";
  }

  setConfig(instance: mdFileUploaderConfig) {
    if (instance.multiple != null) {
      this.multiple = instance.multiple;
    }
    if (instance.formatsAllowed != null) {
      this.formatsAllowed = instance.formatsAllowed;
    }
    if (instance.maxSize != null) {
      this.maxSize = instance.maxSize;
    }
    if (instance.hideProgressBar != null) {
      this.hideProgressBar = instance.hideProgressBar;
    }
    if (instance.hideResetBtn != null) {
      this.hideResetBtn = instance.hideResetBtn;
    }
  }
}

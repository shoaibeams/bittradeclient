export class mdPreferences {
  default_currency_id: number;
  default_currency_pair_id: number;
  two_fa_on_withdrawal: boolean;
  two_fa_on_order: boolean;
  notify_email_on_order_execution: boolean;
  notify_email_on_deposit_verification: boolean;
  notify_email_on_withdrawal_verification: boolean;
  notify_email_on_kyc_verification: boolean;
  timezone_offset: number;

  constructor(loadDefault = false) {
    this.default_currency_id = 2;
    this.default_currency_pair_id = 1;
    this.two_fa_on_order = false;
    this.two_fa_on_withdrawal = true;
    this.notify_email_on_deposit_verification = true;
    this.notify_email_on_kyc_verification = true;
    this.notify_email_on_order_execution = true;
    this.notify_email_on_withdrawal_verification = true;
    this.timezone_offset = null;
  }
  static defaultPreferences = () => {
    return new mdPreferences(true);
  };
}

export class PreferencesKeys {
  static default_currency_id = "default_currency_id";
  static default_currency_pair_id = "default_currency_pair_id";
  static two_fa_on_withdrawal = "two_fa_on_withdrawal";
  static two_fa_on_order = "two_fa_on_order";
  static notify_email_on_order_execution = "notify_email_on_order_execution";
  static notify_email_on_deposit_verification =
    "notify_email_on_deposit_verification";
  static notify_email_on_withdrawal_verification =
    "notify_email_on_withdrawal_verification";
  static notify_email_on_kyc_verification = "notify_email_on_kyc_verification";
  static timezone_offset = "timezone_offset";
}

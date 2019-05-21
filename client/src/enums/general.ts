export enum RecordStatuses {
  active = 1,
  deleted = 2,
  pendingVerification = 3
}
export enum Messages {
  TaskExecuted = "TaskExecuted",
  QueueProcessStarted = "QueueProcessStarted"
}
export enum SpinnerSize {
  small = "small",
  default = "default",
  medium = "medium",
  large = "large"
}
export enum InputTypes {
  Text = "text",
  Password = "password",
  TextArea = "textarea",
  Select = "select",
  Number = "number",
  AutoSuggest = "autoSuggest",
  Daterange = "daterange",
  Label = "label",
  NumberWithDropdown = "number-with-dropdown",
  Date = "date",
  Checkbox = "checkbox"
}
export enum NotificationTypes {
  success = "success",
  info = "info",
  warning = "warning",
  error = "error"
}
export enum SelectSizes {
  small = "small",
  default = "default",
  large = "large"
}
export enum AccountTypes {
  Individual = "individual",
  Business = "business"
}
export enum NavMenuTypes {
  Sidebar = 1,
  Topbar = 2
}
export enum Genders {
  Male = "male",
  Female = "female",
  Other = "Other"
}

export enum TwoFactorAuthTypes {
  None = "none",
  Google = "google"
}

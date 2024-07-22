export interface IWizardProps<T> {
  touched?: boolean;
  onSubmit: (value: T) => void;
  onPrevious?: (value: Partial<T>) => void;
}

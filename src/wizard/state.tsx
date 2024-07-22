import { createContext, useContext, useState } from 'react';
import * as z from 'zod';
import { CreateAccountSchema, type AccountFields } from './CreateAccount';
import { EnterDetailsSchema, type EnterDetailsValue } from './EnterDetails';

export const WizardSchema = z
  .object({ about: z.string().optional().default('') })
  .merge(CreateAccountSchema)
  .merge(EnterDetailsSchema);

export type WizardValue = z.infer<typeof WizardSchema>;

export interface IWizard extends Partial<AccountFields>, Partial<EnterDetailsValue> {
  about?: string;
}

type WizardState = [IWizard, React.Dispatch<React.SetStateAction<IWizard>>];
export const WizardContext = createContext<WizardState | undefined>(undefined);

interface Props {
  children?: React.ReactNode;
}

export function WizardProvider({ children }: Props) {
  const value = useState<IWizard>({
    about: ''
  });
  return <WizardContext.Provider value={value}>{children}</WizardContext.Provider>;
}

export function useWizardState() {
  const context = useContext(WizardContext);
  if (!context) throw new Error('useWizardState must be used within the WizardProvider');
  return context;
}

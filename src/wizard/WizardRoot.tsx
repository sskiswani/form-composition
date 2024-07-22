import { Container, Stepper } from '@mantine/core';
import { useState } from 'react';
import { About } from './About';
import { CreateAccount } from './CreateAccount';
import { EnterDetails } from './EnterDetails';
import { WizardProvider } from './state';
import { Summary } from './Summary';

export function WizardRoot() {
  const [active, setActive] = useState(0);
  const onPrev = () => setActive(a => Math.max(0, --a));
  const onNext = () => setActive(a => Math.min(3, ++a));

  return (
    <WizardProvider>
      <Container size="xl">
        <Stepper active={active} allowNextStepsSelect={false} onStepClick={setActive}>
          <Stepper.Step allowStepClick={active > 0} description="Create an account" label="First step">
            <CreateAccount onSubmit={onNext} />
          </Stepper.Step>
          <Stepper.Step allowStepClick={active > 1} description="Enter details" label="Second step">
            <EnterDetails onPrevious={onPrev} onSubmit={onNext} />
          </Stepper.Step>
          <Stepper.Step allowStepClick={active > 2} description="About me" label="Final step">
            <About onPrevious={onPrev} onSubmit={onNext} />
          </Stepper.Step>
          <Stepper.Completed>
            <Summary onPrevious={onPrev} onSubmit={value => console.info('yo submit', value)} />
          </Stepper.Completed>
        </Stepper>
      </Container>
    </WizardProvider>
  );
}

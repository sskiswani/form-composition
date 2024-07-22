import { Button, Container, Group, Stack, Textarea } from '@mantine/core';
import { useState } from 'react';
import { useWizardState } from './state';
import type { IWizardProps } from './utils';

export type AboutFields = { about: string };

interface IAboutProps extends IWizardProps<AboutFields> {}

export function About(props: IAboutProps) {
  const [state, setState] = useWizardState();
  const [value, setValue] = useState(state.about ?? '');

  const clickHandler = () => {
    const formValue = { about: value };
    setState(s => ({ ...s, ...formValue }));
    return formValue;
  };

  return (
    <>
      <Container>
        <Stack gap="md">
          <Textarea label="About me" rows={5} value={value} onChange={ev => setValue(ev.currentTarget.value)} />
          <Group>
            <Button
              onClick={() => {
                props.onPrevious?.(clickHandler());
              }}>
              {'< Previous'}
            </Button>
            <Button
              onClick={() => {
                props.onSubmit(clickHandler());
              }}>
              {'Next >'}
            </Button>
          </Group>
        </Stack>
      </Container>
    </>
  );
}

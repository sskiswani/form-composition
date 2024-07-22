import { Button, Code, Container, Group, Stack, Tooltip } from '@mantine/core';
import { IconWash } from '@tabler/icons-react';
import { useWizardState, WizardSchema } from './state';

export interface SubmitArgs {
  user: {
    name: string;
    email: string;
  };
  details: {
    about: string;
    five: number;
  };
}

interface ISummaryProps {
  onSubmit?: (value: SubmitArgs) => void;
  onPrevious?: () => void;
}

export function Summary({ onPrevious, onSubmit }: ISummaryProps) {
  const [state, setState] = useWizardState();
  const tester = WizardSchema.safeParse(state);

  const handleSubmit = () => {
    const result = tester.data;
    if (result) {
      onSubmit?.({
        user: { email: result.email, name: result.email },
        details: { about: result.about, five: result.fives }
      });
    }
  };

  return (
    <Container size="md">
      <Stack justify="center" mb="md">
        <Code block fz="sm" miw="20rem">
          {JSON.stringify(state, null, 2)}
        </Code>
        <Code block fz="sm" miw="20rem">
          {JSON.stringify(tester, null, 2)}
        </Code>
      </Stack>
      <Group>
        <Button color="teal" onClick={() => setState(s => ({ ...s, fives: 1 }))}>
          Create error
        </Button>
        {onPrevious && <Button onClick={onPrevious}>Back</Button>}
        {onSubmit && (
          <Button
            disabled={tester.error != null}
            leftSection={
              tester.error != null && (
                <Tooltip label={tester.error.message}>
                  <IconWash />
                </Tooltip>
              )
            }
            onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </Group>
    </Container>
  );
}

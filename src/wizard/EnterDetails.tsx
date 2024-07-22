import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Container, Group, NumberInput, Stack } from '@mantine/core';

import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import { useWizardState } from './state';
import type { IWizardProps } from './utils';

export const EnterDetailsSchema = z.object({
  fives: z.number().multipleOf(5, { message: 'must be a multiple of 5' })
});

export type EnterDetailsValue = z.infer<typeof EnterDetailsSchema>;

interface IEnterDetailsProps extends IWizardProps<EnterDetailsValue> {}

export function EnterDetails(props: IEnterDetailsProps) {
  const [state, setState] = useWizardState();

  const { control, getValues, handleSubmit, formState, trigger } = useForm<EnterDetailsValue>({
    resolver: zodResolver(EnterDetailsSchema),
    defaultValues: state
  });

  useEffect(() => {
    if (state.fives != null || props.touched) trigger();
  }, [props.touched, state.fives, trigger]);

  const errors = formState.errors;
  const handlePrev = () => {
    props.onPrevious?.(getValues());
  };

  const submit = handleSubmit(d => {
    setState(state => ({ ...state, ...d }));
    props.onSubmit(d);
  });

  return (
    <>
      <Container>
        <Stack gap="md">
          <Controller
            control={control}
            name="fives"
            render={({ field }) => (
              <NumberInput
                required
                description="fav multiple of 5?"
                label="Five"
                placeholder="Input placeholder"
                {...field}
                error={errors.fives?.message}
              />
            )}
          />
          <Group>
            <Button onClick={handlePrev}>{'< Previous'}</Button>
            <Button onClick={submit}>{'Next >'}</Button>
          </Group>
        </Stack>
      </Container>
      <DevTool control={control} />
    </>
  );
}

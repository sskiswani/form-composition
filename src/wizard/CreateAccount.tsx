import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Container, rem, Stack, TextInput } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useWizardState } from './state';
import type { IWizardProps } from './utils';

export const CreateAccountSchema = z.object({
  name: z.string().min(1, { message: 'Required' }).trim(),
  email: z.string().email({ message: 'Invalid email address' })
});

export type AccountFields = z.infer<typeof CreateAccountSchema>;

interface ICreateAccountProps extends IWizardProps<AccountFields> {
  defaultValue?: Partial<AccountFields>;
  values?: Partial<AccountFields>;
}

export function CreateAccount({ defaultValue, values, touched = false, onSubmit, ...props }: ICreateAccountProps) {
  const [state, setState] = useWizardState();

  const { register, control, handleSubmit, getValues, formState, trigger } = useForm<AccountFields>({
    resolver: zodResolver(CreateAccountSchema),
    defaultValues: state
  });
  useEffect(() => {
    if (state.email != null || state.name != null || touched) trigger();
  }, [state.email, state.name, touched, trigger]);

  const errors = formState.errors;

  const handlePrev = () => {
    props.onPrevious?.(getValues());
  };

  const submit = handleSubmit(d => {
    setState(state => ({ ...state, ...d }));
    onSubmit(d);
  });

  return (
    <>
      <Container size="xs">
        <Stack mb="xl">
          <TextInput label="Name" placeholder="Your name" {...register('name')} required error={errors.name?.message} />
          <TextInput
            label="Your email"
            leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
            leftSectionPointerEvents="none"
            mt="md"
            placeholder="Your email"
            {...register('email')}
            required
            error={errors.email?.message}
          />
        </Stack>
        {props.onPrevious && <Button onClick={handlePrev}>Prev</Button>}
        <Button type="submit" onClick={() => submit()}>
          Next
        </Button>
      </Container>
      <DevTool control={control} />
    </>
  );
}

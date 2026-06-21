import { FC } from 'react';
import { useForm } from '../../hooks/useForm';
import { Form, FormField, FormActions, FormError } from './Form';
import { TextField } from '../ui/TextField';
import { Button } from '../ui/Button';

// INTEGRATION LAYER - Connects logic with UI
// This is where logic hooks and UI components come together
// But the logic is still completely separate

interface UserFormData {
  username: string;
  email: string;
  password: string;
}

const validateUser = (values: UserFormData) => {
  const errors: Partial<Record<keyof UserFormData, string>> = {};

  if (!values.username) {
    errors.username = 'Username is required';
  } else if (values.username.length < 3) {
    errors.username = 'Username must be at least 3 characters';
  }

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }

  return errors;
};

interface UserFormProps {
  onSuccess?: (data: UserFormData) => void;
  onError?: (error: Error) => void;
  isLoading?: boolean;
}

export const UserForm: FC<UserFormProps> = ({
  onSuccess,
  onError,
  isLoading,
}) => {
  // Use the logic hook - completely decoupled from UI
  const form = useForm<UserFormData>({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validate: validateUser,
    onSubmit: async (values) => {
      try {
        // Call API or service
        const response = await fetch('/api/users', {
          method: 'POST',
          body: JSON.stringify(values),
        });

        if (!response.ok) throw new Error('Failed to create user');

        onSuccess?.(values);
      } catch (error) {
        onError?.(error as Error);
      }
    },
  });

  // Render - pure presentation with no logic
  return (
    <Form onSubmit={form.handleSubmit} className="space-y-4">
      <FormError
        message="There was an error. Please try again."
        visible={false}
      />

      <FormField
        label="Username"
        error={form.errors.username}
        touched={form.touched.username}
        required
      >
        <TextField
          value={form.values.username}
          onChange={(e) => form.handleChange('username', e.target.value)}
          onBlur={() => form.handleBlur('username')}
          placeholder="Choose a username"
          fullWidth
          disabled={isLoading || form.isSubmitting}
        />
      </FormField>

      <FormField
        label="Email"
        error={form.errors.email}
        touched={form.touched.email}
        required
      >
        <TextField
          type="email"
          value={form.values.email}
          onChange={(e) => form.handleChange('email', e.target.value)}
          onBlur={() => form.handleBlur('email')}
          placeholder="your@email.com"
          fullWidth
          disabled={isLoading || form.isSubmitting}
        />
      </FormField>

      <FormField
        label="Password"
        error={form.errors.password}
        touched={form.touched.password}
        required
      >
        <TextField
          type="password"
          value={form.values.password}
          onChange={(e) => form.handleChange('password', e.target.value)}
          onBlur={() => form.handleBlur('password')}
          placeholder="••••••••"
          fullWidth
          disabled={isLoading || form.isSubmitting}
        />
      </FormField>

      <FormActions>
        <Button variant="secondary" disabled={form.isSubmitting || isLoading}>
          Clear
        </Button>
        <Button
          variant="primary"
          type="submit"
          isLoading={form.isSubmitting || isLoading}
          disabled={!form.isDirty}
        >
          Create Account
        </Button>
      </FormActions>
    </Form>
  );
};

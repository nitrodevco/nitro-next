import { FC, ReactNode, HTMLAttributes } from 'react';

// PRESENTATION LAYER - Pure UI components
// These components have ZERO business logic
// All they do is render based on props

interface FormProps extends HTMLAttributes<HTMLFormElement> {
  children: ReactNode;
  onSubmit: (e?: React.FormEvent) => void;
  isSubmitting?: boolean;
}

export const Form: FC<FormProps> = ({
  children,
  onSubmit,
  isSubmitting,
  ...props
}) => {
  return (
    <form onSubmit={onSubmit} {...props}>
      {children}
    </form>
  );
};

interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  error?: string;
  touched?: boolean;
  required?: boolean;
  children: ReactNode;
}

export const FormField: FC<FormFieldProps> = ({
  label,
  error,
  touched,
  required,
  children,
  ...props
}) => {
  const showError = touched && error;

  return (
    <div {...props}>
      {label && (
        <label className="block text-sm font-medium mb-1">
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </label>
      )}
      {children}
      {showError && (
        <span className="text-xs text-red-600 mt-1 block">{error}</span>
      )}
    </div>
  );
};

interface FormErrorProps extends HTMLAttributes<HTMLDivElement> {
  message: string;
  visible?: boolean;
}

export const FormError: FC<FormErrorProps> = ({ message, visible, ...props }) => {
  if (!visible) return null;

  return (
    <div
      role="alert"
      className="p-3 bg-red-100 border border-red-300 text-red-700 rounded text-sm"
      {...props}
    >
      {message}
    </div>
  );
};

interface FormActionsProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const FormActions: FC<FormActionsProps> = ({ children, ...props }) => {
  return (
    <div className="flex gap-2 justify-end mt-4" {...props}>
      {children}
    </div>
  );
};

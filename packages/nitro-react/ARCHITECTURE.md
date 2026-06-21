# Architecture & Separation of Concerns

This document explains how to keep logic separated from UI for maximum customizability.

## The Problem

When logic and UI are mixed, it becomes hard to:
- Test components
- Reuse logic with different UIs
- Customize styling without touching business logic
- Replace components
- Share code across projects

## The Solution: Layered Architecture

We use three distinct layers:

```
┌─────────────────────────────────────────┐
│     APPLICATION/INTEGRATION LAYER       │
│  (Combines logic hooks with UI)         │
│  Example: UserForm, LoginWindow         │
└──────────────┬──────────────────────────┘
               │
        ┌──────┴──────┐
        │             │
┌───────▼──────┐  ┌──▼──────────┐
│  LOGIC LAYER │  │ PRESENTATION│
│   (Hooks &   │  │  LAYER      │
│   Stores)    │  │ (Components)│
├──────────────┤  ├─────────────┤
│ useForm      │  │ Form        │
│ useAuth      │  │ FormField   │
│ useModal     │  │ TextField   │
│ useTheme     │  │ Button      │
│ useChat      │  │ Card        │
└──────────────┘  └─────────────┘
```

## Layer Breakdown

### 1. Logic Layer (Hooks & Stores)

**Location:** `src/hooks/`, `src/theme/stores/`

**Responsibility:** Pure business logic with NO UI references

**Characteristics:**
- No imports from `react-dom`
- No JSX or React components
- Pure functions where possible
- Can be tested independently
- Can be used from multiple UIs

**Example: `useForm` hook**

```tsx
// ✅ GOOD - Pure logic
export const useForm = <T extends Record<string, any>>({
  initialValues,
  onSubmit,
  validate,
}: UseFormOptions<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleChange = useCallback((field: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
  }, []);

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    // ... no UI stuff
  };
};
```

**Another example: Store**

```tsx
// ✅ GOOD - Pure state management
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (credentials) => {
    const user = await api.login(credentials);
    set({ user, isAuthenticated: true });
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));
```

### 2. Presentation Layer (Components)

**Location:** `src/components/ui/`, `src/components/windows/`

**Responsibility:** Pure UI rendering - zero business logic

**Characteristics:**
- Receives all data via props
- Functions are presentation-only (onClick handlers that prop up, not handlers that do API calls)
- Simple, dumb components
- Easy to customize and style
- Can be used with any business logic

**Example: Presentation Component**

```tsx
// ✅ GOOD - Pure presentation
interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
  fullWidth?: boolean;
}

export const TextField: FC<TextFieldProps> = ({
  label,
  error,
  helper,
  fullWidth = false,
  ...props
}) => {
  return (
    <div className={cn(fullWidth && 'w-full')}>
      {label && <label>{label}</label>}
      <input {...props} className="..." />
      {error && <span className="text-red-600">{error}</span>}
      {helper && <span className="text-gray-600">{helper}</span>}
    </div>
  );
};
```

**Not this:**

```tsx
// ❌ BAD - Logic mixed with UI
export const TextField: FC<TextFieldProps> = ({
  label,
  validate,
}) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
    if (validate) {
      const err = validate(e.target.value);
      setError(err);
    }
  };

  return (
    <div>
      <input onChange={handleChange} value={value} />
      {error && <span>{error}</span>}
    </div>
  );
};
```

### 3. Integration Layer (Feature Components)

**Location:** `src/components/features/`, `src/windows/`

**Responsibility:** Connect logic hooks with presentation components

**Characteristics:**
- Imports from both logic layer and presentation layer
- Orchestrates the flow
- Maps hook data to component props
- Usually small and focused on one feature

**Example: Integration Component**

```tsx
// ✅ GOOD - Connects logic and UI
export const UserForm: FC<UserFormProps> = ({ onSuccess }) => {
  // Get logic from hook
  const form = useForm({
    initialValues: { username: '', email: '' },
    validate: validateUser,
    onSubmit: async (values) => {
      await api.createUser(values);
      onSuccess?.(values);
    },
  });

  // Combine with UI
  return (
    <Form onSubmit={form.handleSubmit}>
      <FormField error={form.errors.username}>
        <TextField
          value={form.values.username}
          onChange={(e) => form.handleChange('username', e.target.value)}
        />
      </FormField>
      <Button type="submit">Submit</Button>
    </Form>
  );
};
```

## How to Customize

### Scenario 1: Change the Look of Forms

Change the presentation components WITHOUT touching the logic:

```tsx
// Old UI
import { Form, TextField, Button } from './components/ui';

// New UI - just swap the imports
import { Form, TextField, Button } from './components/ui/alternate-theme';

// The form logic (`useForm` hook) stays exactly the same!
```

### Scenario 2: Reuse Form Logic in Different UI

```tsx
// Web version
import { UserForm } from './components/web/UserForm';

// Mobile version - different UI, same logic
import { UserForm as MobileUserForm } from './components/mobile/UserForm';

// Both use the same `useForm` hook behind the scenes
```

### Scenario 3: Use Logic in Non-Component Context

```tsx
import { useForm } from './hooks/useForm';

// Can use the same form logic in a command-line tool, Node script, etc.
const form = useForm({
  initialValues: { username: '', email: '' },
  onSubmit: async (values) => {
    // Save to database
  },
});

// Call logic methods directly
form.handleChange('username', 'john');
await form.handleSubmit();
```

### Scenario 4: Add New Features Without Changing Components

```tsx
// Old form behavior
const form = useForm({
  initialValues,
  onSubmit,
  validate,
});

// Enhanced form with analytics
const form = useForm({
  initialValues,
  onSubmit,
  validate,
  onFieldChange: (field, value) => {
    // Track analytics
    analytics.track('form_field_changed', { field, value });
  },
});

// UI components don't change at all!
```

## File Structure

```
src/
├── hooks/                          # Logic layer
│   ├── useForm.ts
│   ├── useAuth.ts
│   ├── useChat.ts
│   ├── useModal.ts
│   └── index.ts
├── services/                       # Business logic (API calls, etc.)
│   ├── userService.ts
│   ├── chatService.ts
│   ├── authService.ts
│   └── index.ts
├── stores/                         # Global state (Zustand)
│   ├── useAuthStore.ts
│   ├── useUserStore.ts
│   ├── useChatStore.ts
│   └── index.ts
├── components/
│   ├── ui/                         # Pure presentation
│   │   ├── Button.tsx
│   │   ├── TextField.tsx
│   │   ├── Form.tsx
│   │   └── index.ts
│   ├── common/                     # Shared/semi-generic
│   │   ├── Form.tsx
│   │   ├── Modal.tsx
│   │   └── index.ts
│   ├── features/                   # Integration layer
│   │   ├── UserForm.tsx
│   │   ├── LoginForm.tsx
│   │   ├── ChatWindow.tsx
│   │   └── index.ts
│   └── windows/                    # Draggable window components
│       ├── DraggableWindow.tsx
│       ├── UserProfileWindow.tsx
│       └── index.ts
└── theme/                          # Themeing system
    ├── config/
    ├── context/
    ├── hooks/
    ├── stores/
    └── index.ts
```

## Testing Strategy

Because of the separation, testing becomes simple:

### Test Logic (Easy - No Browser/React Needed)

```tsx
import { renderHook, act } from '@testing-library/react';
import { useForm } from '../hooks/useForm';

describe('useForm', () => {
  it('should validate on blur', async () => {
    const { result } = renderHook(() =>
      useForm({
        initialValues: { email: '' },
        validate: (v) => (!v.email ? { email: 'Required' } : {}),
      })
    );

    act(() => {
      result.current.handleBlur('email');
    });

    expect(result.current.errors.email).toBe('Required');
  });
});
```

### Test UI (Easy - Just Props)

```tsx
import { render, screen } from '@testing-library/react';
import { TextField } from '../components/ui/TextField';

describe('TextField', () => {
  it('should display error message', () => {
    render(
      <TextField
        label="Email"
        error="Invalid email"
        touched={true}
      />
    );

    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });
});
```

### Test Integration (Combines Both)

```tsx
import { render, screen, userEvent } from '@testing-library/react';
import { UserForm } from '../components/features/UserForm';

describe('UserForm', () => {
  it('should submit form with valid data', async () => {
    const onSuccess = jest.fn();
    render(<UserForm onSuccess={onSuccess} />);

    await userEvent.type(screen.getByLabelText('Username'), 'john');
    await userEvent.type(screen.getByLabelText('Email'), 'john@example.com');
    await userEvent.type(screen.getByLabelText('Password'), 'password123');
    await userEvent.click(screen.getByText('Submit'));

    expect(onSuccess).toHaveBeenCalled();
  });
});
```

## Best Practices

### ✅ DO

- **Put validation logic in hooks** - Makes it reusable and testable
- **Keep components as dumb as possible** - They should just render props
- **Use props for everything** - No hidden state in components
- **Create custom hooks for features** - `useChat`, `useNotifications`, `useModal`
- **Use stores for global state** - User, theme, settings, etc.
- **Write integration components** - Connect hooks with UI
- **Test logic separately from UI** - Much easier and faster

### ❌ DON'T

- **Mix business logic in components** - Hard to reuse and test
- **Fetch data directly in components** - Use hooks/services instead
- **Hide state inside components** - Pass everything via props
- **Create "smart" components** - That's what integration layer is for
- **Use React context for everything** - Use Zustand stores instead
- **Rely on component order** - Dependencies should be explicit

## Example: Chat Feature

Here's how the three layers work together for a chat feature:

### Logic Layer (Hook)

```tsx
// src/hooks/useChat.ts
export const useChat = (roomId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (text: string) => {
    setIsLoading(true);
    try {
      const message = await chatService.sendMessage(roomId, text);
      setMessages(prev => [...prev, message]);
    } finally {
      setIsLoading(false);
    }
  }, [roomId]);

  useEffect(() => {
    chatService.subscribe(roomId, (message) => {
      setMessages(prev => [...prev, message]);
    });
  }, [roomId]);

  return { messages, isLoading, sendMessage };
};
```

### Presentation Layer (Component)

```tsx
// src/components/ui/ChatWidget.tsx
export const ChatWidget: FC<ChatWidgetProps> = ({
  messages,
  onSendMessage,
  isLoading,
}) => {
  const [input, setInput] = useState('');

  return (
    <div className="chat-widget">
      <div className="messages">
        {messages.map(msg => (
          <div key={msg.id}>{msg.text}</div>
        ))}
      </div>
      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={() => onSendMessage(input)}
          disabled={isLoading}
        >
          Send
        </button>
      </div>
    </div>
  );
};
```

### Integration Layer (Window)

```tsx
// src/components/windows/ChatWindow.tsx
export const ChatWindow: FC<ChatWindowProps> = ({ roomId, onClose }) => {
  const { messages, isLoading, sendMessage } = useChat(roomId);

  return (
    <DraggableWindow id={`chat-${roomId}`} title="Chat" onClose={onClose}>
      <ChatWidget
        messages={messages}
        onSendMessage={sendMessage}
        isLoading={isLoading}
      />
    </DraggableWindow>
  );
};
```

## Customization Examples

### Example 1: Skinning the Chat UI

```tsx
// Use different UI components, same logic
import { ChatWidgetCompact } from './ChatWidgetCompact';  // Different UI

export const ChatWindow: FC = ({ roomId }) => {
  const { messages, isLoading, sendMessage } = useChat(roomId);

  return (
    <DraggableWindow id={`chat-${roomId}`} title="Chat">
      {/* Just swap the component */}
      <ChatWidgetCompact
        messages={messages}
        onSendMessage={sendMessage}
        isLoading={isLoading}
      />
    </DraggableWindow>
  );
};
```

### Example 2: Different Logic, Same UI

```tsx
// Using the same UI with different logic
export const OfflineChatWindow: FC = ({ conversations }) => {
  const { messages, isLoading, sendMessage } = useOfflineChat(conversations);

  return (
    <DraggableWindow id="offline-chat" title="Offline Messages">
      <ChatWidget
        messages={messages}
        onSendMessage={sendMessage}
        isLoading={isLoading}
      />
    </DraggableWindow>
  );
};
```

### Example 3: Enhanced Logic Without Changing UI

```tsx
// The hook can grow in features without touching the component
export const useChat = (roomId: string, options?: ChatOptions) => {
  const { messages, isLoading, sendMessage } = useBaseChat(roomId);

  // Add search
  const [searchQuery, setSearchQuery] = useState('');
  const filteredMessages = useMemo(() => {
    if (!searchQuery) return messages;
    return messages.filter(m => m.text.includes(searchQuery));
  }, [messages, searchQuery]);

  // Add typing indicator
  const { typingUsers } = useTypingIndicator(roomId);

  // Add reactions
  const { addReaction, reactions } = useReactions(roomId);

  return {
    messages: filteredMessages,
    isLoading,
    sendMessage,
    searchQuery,
    setSearchQuery,
    typingUsers,
    addReaction,
    reactions,
  };
};

// If ChatWidget only used what it needs via destructuring,
// the component doesn't change at all!
```

## Summary

The key to maintainability and customizability is:

1. **Logic → Hooks & Stores** (testable, reusable, no UI)
2. **UI → Components** (dumb, pure, only render props)
3. **Integration → Feature Components** (connects the two)

This makes it trivial to:
- Change styling without touching logic
- Reuse logic in different contexts
- Test each layer independently
- Add new features without side effects
- Swap implementations

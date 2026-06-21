# Creating Custom Hooks - Complete Guide

This guide shows you how to create custom hooks for your features, keeping logic completely separate from UI.

## The Pattern

Every custom hook should:
1. **Take configuration as parameters** - What does this feature need?
2. **Return data and handlers** - What can the UI do?
3. **Have ZERO UI references** - No React components imported
4. **Be testable in isolation** - Can be tested without React Testing Library

```tsx
// The template
export const useMyFeature = (config?: MyFeatureConfig) => {
  // State
  const [data, setData] = useState<Data>();
  
  // Effects
  useEffect(() => {
    // Setup
  }, []);
  
  // Handlers - pure logic
  const handleAction = useCallback(() => {
    // Do something
  }, []);
  
  // Return only data and handlers
  return {
    data,
    isLoading,
    error,
    handleAction,
  };
};
```

## Complete Example: Chat Hook

Here's a real example showing proper separation of concerns:

### Step 1: Create the Service Layer (Optional but Recommended)

```tsx
// src/services/chatService.ts
// This is pure business logic, NO React at all

export interface ChatMessage {
  id: string;
  userId: string;
  text: string;
  timestamp: number;
  reactions?: Record<string, string[]>;
}

export interface ChatRoom {
  id: string;
  name: string;
  members: string[];
}

export class ChatService {
  private baseUrl = '/api/chat';

  async fetchMessages(roomId: string, limit = 50): Promise<ChatMessage[]> {
    const response = await fetch(`${this.baseUrl}/rooms/${roomId}/messages?limit=${limit}`);
    return response.json();
  }

  async sendMessage(roomId: string, text: string): Promise<ChatMessage> {
    const response = await fetch(`${this.baseUrl}/rooms/${roomId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ text }),
    });
    return response.json();
  }

  async deleteMessage(roomId: string, messageId: string): Promise<void> {
    await fetch(`${this.baseUrl}/rooms/${roomId}/messages/${messageId}`, {
      method: 'DELETE',
    });
  }

  async editMessage(roomId: string, messageId: string, text: string): Promise<ChatMessage> {
    const response = await fetch(`${this.baseUrl}/rooms/${roomId}/messages/${messageId}`, {
      method: 'PUT',
      body: JSON.stringify({ text }),
    });
    return response.json();
  }

  async addReaction(
    roomId: string,
    messageId: string,
    emoji: string
  ): Promise<ChatMessage> {
    const response = await fetch(
      `${this.baseUrl}/rooms/${roomId}/messages/${messageId}/reactions`,
      {
        method: 'POST',
        body: JSON.stringify({ emoji }),
      }
    );
    return response.json();
  }

  subscribeToMessages(roomId: string, callback: (message: ChatMessage) => void) {
    // Setup WebSocket or polling
    // Return unsubscribe function
    return () => {
      // Cleanup
    };
  }
}

export const chatService = new ChatService();
```

### Step 2: Create the Hook (Pure React Logic, No UI)

```tsx
// src/hooks/useChat.ts
import { useState, useEffect, useCallback, useRef } from 'react';
import { ChatMessage, chatService } from '../services/chatService';

export interface UseChatOptions {
  roomId: string;
  autoLoadMessages?: boolean;
  initialMessageLimit?: number;
  onError?: (error: Error) => void;
}

export interface UseChatReturn {
  // State
  messages: ChatMessage[];
  isLoading: boolean;
  error: Error | null;
  isSending: boolean;

  // Handlers
  sendMessage: (text: string) => Promise<void>;
  deleteMessage: (messageId: string) => Promise<void>;
  editMessage: (messageId: string, text: string) => Promise<void>;
  addReaction: (messageId: string, emoji: string) => Promise<void>;
  loadMoreMessages: () => Promise<void>;
  clearMessages: () => void;
}

export const useChat = ({
  roomId,
  autoLoadMessages = true,
  initialMessageLimit = 50,
  onError,
}: UseChatOptions): UseChatReturn => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(autoLoadMessages);
  const [error, setError] = useState<Error | null>(null);
  const [isSending, setIsSending] = useState(false);

  const messageCountRef = useRef(initialMessageLimit);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  // Load initial messages
  useEffect(() => {
    if (!autoLoadMessages) return;

    const loadMessages = async () => {
      try {
        setIsLoading(true);
        const loaded = await chatService.fetchMessages(
          roomId,
          messageCountRef.current
        );
        setMessages(loaded);
        setError(null);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to load messages');
        setError(error);
        onError?.(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMessages();
  }, [roomId, autoLoadMessages, onError]);

  // Subscribe to new messages
  useEffect(() => {
    unsubscribeRef.current = chatService.subscribeToMessages(
      roomId,
      (newMessage) => {
        setMessages(prev => [...prev, newMessage]);
      }
    );

    return () => {
      unsubscribeRef.current?.();
    };
  }, [roomId]);

  // Handlers - pure logic
  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim()) return;

      setIsSending(true);
      try {
        const newMessage = await chatService.sendMessage(roomId, text);
        setMessages(prev => [...prev, newMessage]);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to send message');
        setError(error);
        onError?.(error);
      } finally {
        setIsSending(false);
      }
    },
    [roomId, onError]
  );

  const deleteMessage = useCallback(
    async (messageId: string) => {
      try {
        await chatService.deleteMessage(roomId, messageId);
        setMessages(prev => prev.filter(m => m.id !== messageId));
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to delete message');
        setError(error);
        onError?.(error);
      }
    },
    [roomId, onError]
  );

  const editMessage = useCallback(
    async (messageId: string, text: string) => {
      try {
        const updated = await chatService.editMessage(roomId, messageId, text);
        setMessages(prev =>
          prev.map(m => (m.id === messageId ? updated : m))
        );
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to edit message');
        setError(error);
        onError?.(error);
      }
    },
    [roomId, onError]
  );

  const addReaction = useCallback(
    async (messageId: string, emoji: string) => {
      try {
        const updated = await chatService.addReaction(roomId, messageId, emoji);
        setMessages(prev =>
          prev.map(m => (m.id === messageId ? updated : m))
        );
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to add reaction');
        setError(error);
        onError?.(error);
      }
    },
    [roomId, onError]
  );

  const loadMoreMessages = useCallback(async () => {
    try {
      setIsLoading(true);
      messageCountRef.current += 50;
      const loaded = await chatService.fetchMessages(
        roomId,
        messageCountRef.current
      );
      setMessages(loaded);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to load messages');
      setError(error);
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  }, [roomId, onError]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isLoading,
    error,
    isSending,
    sendMessage,
    deleteMessage,
    editMessage,
    addReaction,
    loadMoreMessages,
    clearMessages,
  };
};
```

### Step 3: Create UI Components (Pure Presentation)

```tsx
// src/components/ui/ChatMessage.tsx
import { FC } from 'react';
import { ChatMessage as ChatMessageType } from '../../services/chatService';

interface ChatMessageProps {
  message: ChatMessageType;
  isOwn?: boolean;
  onEdit?: (text: string) => void;
  onDelete?: () => void;
  onReact?: (emoji: string) => void;
}

export const ChatMessage: FC<ChatMessageProps> = ({
  message,
  isOwn,
  onEdit,
  onDelete,
  onReact,
}) => {
  return (
    <div className={`message ${isOwn ? 'own' : 'other'}`}>
      <div className="message-content">
        <p>{message.text}</p>
      </div>

      <div className="message-reactions">
        {message.reactions &&
          Object.entries(message.reactions).map(([emoji, userIds]) => (
            <button
              key={emoji}
              className="reaction"
              onClick={() => onReact?.(emoji)}
            >
              {emoji} {userIds.length}
            </button>
          ))}
        <button onClick={() => onReact?.('👍')}>+</button>
      </div>

      {isOwn && (
        <div className="message-actions">
          <button onClick={() => onEdit?.('')}>Edit</button>
          <button onClick={onDelete}>Delete</button>
        </div>
      )}

      <time className="message-time">
        {new Date(message.timestamp).toLocaleTimeString()}
      </time>
    </div>
  );
};

interface ChatMessagesListProps {
  messages: ChatMessageType[];
  currentUserId: string;
  isLoading?: boolean;
  onEdit?: (messageId: string, text: string) => void;
  onDelete?: (messageId: string) => void;
  onReact?: (messageId: string, emoji: string) => void;
  onLoadMore?: () => void;
}

export const ChatMessagesList: FC<ChatMessagesListProps> = ({
  messages,
  currentUserId,
  isLoading,
  onEdit,
  onDelete,
  onReact,
  onLoadMore,
}) => {
  return (
    <div className="messages-list">
      {isLoading && <div className="loading">Loading...</div>}

      {messages.length === 0 ? (
        <div className="empty">No messages yet</div>
      ) : (
        <>
          {messages.map(msg => (
            <ChatMessage
              key={msg.id}
              message={msg}
              isOwn={msg.userId === currentUserId}
              onEdit={(text) => onEdit?.(msg.id, text)}
              onDelete={() => onDelete?.(msg.id)}
              onReact={(emoji) => onReact?.(msg.id, emoji)}
            />
          ))}
        </>
      )}
    </div>
  );
};

interface ChatInputProps {
  onSend: (text: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export const ChatInput: FC<ChatInputProps> = ({ onSend, isLoading, disabled }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSend(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="chat-input">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        disabled={isLoading || disabled}
      />
      <button
        type="submit"
        disabled={!text.trim() || isLoading || disabled}
      >
        Send
      </button>
    </form>
  );
};
```

### Step 4: Create Feature Component (Integration)

```tsx
// src/components/windows/ChatWindow.tsx
import { FC, useState } from 'react';
import { DraggableWindow } from './DraggableWindow';
import { useChat } from '../../hooks/useChat';
import { ChatMessagesList, ChatInput } from '../ui/ChatMessage';
import { Panel } from '../ui/Panel';
import { useUserStore } from '../../stores/useUserStore';

interface ChatWindowProps {
  roomId: string;
  roomName: string;
  onClose: () => void;
}

export const ChatWindow: FC<ChatWindowProps> = ({
  roomId,
  roomName,
  onClose,
}) => {
  // Get current user
  const { user } = useUserStore();

  // Get chat logic
  const {
    messages,
    isLoading,
    error,
    isSending,
    sendMessage,
    deleteMessage,
    editMessage,
    addReaction,
  } = useChat({
    roomId,
    autoLoadMessages: true,
    onError: (error) => {
      console.error('Chat error:', error);
    },
  });

  if (!user) return null;

  return (
    <DraggableWindow
      id={`chat-${roomId}`}
      title={`Chat - ${roomName}`}
      onClose={onClose}
      defaultWidth={400}
      defaultHeight={500}
    >
      <div className="flex flex-col h-full">
        {error && (
          <Panel variant="accent">
            <p className="text-sm">{error.message}</p>
          </Panel>
        )}

        <ChatMessagesList
          messages={messages}
          currentUserId={user.id}
          isLoading={isLoading}
          onEdit={editMessage}
          onDelete={deleteMessage}
          onReact={addReaction}
        />

        <ChatInput
          onSend={sendMessage}
          isLoading={isSending}
          disabled={error !== null}
        />
      </div>
    </DraggableWindow>
  );
};
```

## How This Achieves Separation

### The Logic Layer (`useChat`)
- ✅ Takes a config object
- ✅ Returns data and handlers
- ✅ No UI imports
- ✅ Can be tested independently
- ✅ Can be used from Node.js script
- ✅ Can be used with mobile UI
- ✅ Can be used in web workers

### The UI Layer (`ChatMessage*`)
- ✅ Pure presentation
- ✅ All logic via props
- ✅ No business logic
- ✅ Can be styled however you want
- ✅ Can be animated however you want
- ✅ Can be used with different logic

### The Integration Layer (`ChatWindow`)
- ✅ Connects logic and UI
- ✅ Orchestrates the feature
- ✅ Small and focused
- ✅ Easy to modify behavior

## Testing Examples

### Test the Service
```tsx
describe('ChatService', () => {
  it('should send message', async () => {
    const message = await chatService.sendMessage('room1', 'Hello');
    expect(message.text).toBe('Hello');
  });
});
```

### Test the Hook
```tsx
import { renderHook, act } from '@testing-library/react';
import { useChat } from '../hooks/useChat';

describe('useChat', () => {
  it('should send message', async () => {
    const { result } = renderHook(() =>
      useChat({ roomId: 'room1' })
    );

    act(() => {
      result.current.sendMessage('Hello');
    });

    await waitFor(() => {
      expect(result.current.messages).toHaveLength(1);
      expect(result.current.messages[0].text).toBe('Hello');
    });
  });
});
```

### Test the UI
```tsx
import { render, screen } from '@testing-library/react';
import { ChatMessage } from '../components/ui/ChatMessage';

describe('ChatMessage', () => {
  it('should display message text', () => {
    render(
      <ChatMessage
        message={{ id: '1', text: 'Hello', userId: 'user1', timestamp: 0 }}
      />
    );

    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### Test the Integration
```tsx
import { render, screen, userEvent } from '@testing-library/react';
import { ChatWindow } from '../components/windows/ChatWindow';

describe('ChatWindow', () => {
  it('should send message when form is submitted', async () => {
    render(
      <ChatWindow
        roomId="room1"
        roomName="General"
        onClose={() => {}}
      />
    );

    const input = screen.getByPlaceholderText('Type a message...');
    await userEvent.type(input, 'Hello world');
    await userEvent.click(screen.getByText('Send'));

    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });
});
```

## Key Takeaways

1. **Service Layer** - Pure business logic, no React
2. **Hook Layer** - React logic, no UI components
3. **Component Layer** - Pure UI, no business logic
4. **Integration Layer** - Connects everything

This makes your code:
- ✅ Testable at every level
- ✅ Reusable across contexts
- ✅ Easy to customize
- ✅ Easy to refactor
- ✅ Easy to share

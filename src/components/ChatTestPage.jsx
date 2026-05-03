import { useState } from 'react';
import { ChatInput } from '@faclon-labs/design-sdk/ChatInput';
import { ChatMessage } from '@faclon-labs/design-sdk/ChatMessage';

const DEMO_MESSAGES = [
  { id: 1, senderType: 'self',  text: 'Hello! Can you explain how neural networks work?' },
  { id: 2, senderType: 'other', text: 'Neural networks are computing systems inspired by biological neural networks in animal brains. They consist of layers of interconnected nodes that process information using connectionist approaches.' },
  { id: 3, senderType: 'self',  text: 'That sounds complex. Can you give a simpler analogy?' },
  { id: 4, senderType: 'other', text: 'Think of it like teaching a child to recognize cats. You show them thousands of cat pictures and they learn the patterns — pointy ears, whiskers, etc. Neural networks learn the same way from data.' },
];

const SUGGESTIONS = [
  'Tell me more about deep learning',
  'What are activation functions?',
  'How is backpropagation used?',
];

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: 'calc(100vh - 120px)',
  maxWidth: 760,
  margin: '0 auto',
  gap: 0,
};

const messagesStyle = {
  flex: 1,
  overflowY: 'auto',
  padding: '20px 16px',
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
};

const inputAreaStyle = {
  padding: '12px 16px',
  borderTop: '1px solid #e5e7eb',
  background: '#fff',
};

const sectionTitle = {
  fontSize: 11,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: '#9ca3af',
  margin: '16px 0 8px',
};

export default function ChatTestPage() {
  const [messages, setMessages] = useState(DEMO_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingMsgId, setLoadingMsgId] = useState(null);

  function handleSubmit({ value }) {
    if (!value.trim()) return;
    const userMsg = { id: Date.now(), senderType: 'self', text: value };
    const botMsgId = Date.now() + 1;
    const botMsg = {
      id: botMsgId,
      senderType: 'other',
      text: '',
      isLoading: true,
      loadingText: ['Thinking', 'Processing your question', 'Generating response…'],
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInputValue('');
    setIsGenerating(true);
    setLoadingMsgId(botMsgId);

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === botMsgId
            ? { ...m, isLoading: false, text: `You asked: "${value}". This is a simulated response to demonstrate the ChatMessage component with animation.` }
            : m
        )
      );
      setIsGenerating(false);
      setLoadingMsgId(null);
    }, 2500);
  }

  function handleStop() {
    if (!loadingMsgId) return;
    setMessages((prev) =>
      prev.map((m) =>
        m.id === loadingMsgId
          ? { ...m, isLoading: false, text: '[Generation stopped]', validationState: 'error', errorText: 'Stopped by user' }
          : m
      )
    );
    setIsGenerating(false);
    setLoadingMsgId(null);
  }

  return (
    <div>
      <p style={sectionTitle}>Chat Components — ChatInput + ChatMessage</p>

      <div style={containerStyle}>
        <div style={messagesStyle}>
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              senderType={msg.senderType}
              isLoading={msg.isLoading}
              loadingText={msg.loadingText}
              validationState={msg.validationState}
              errorText={msg.errorText}
            >
              {msg.text}
            </ChatMessage>
          ))}
        </div>

        <div style={inputAreaStyle}>
          <ChatInput
            value={inputValue}
            onChange={({ value }) => setInputValue(value)}
            onSubmit={handleSubmit}
            placeholder="Ask something…"
            isGenerating={isGenerating}
            onStop={handleStop}
            suggestions={SUGGESTIONS}
            onSuggestionAccept={({ suggestion }) => setInputValue(suggestion)}
          />
        </div>
      </div>
    </div>
  );
}

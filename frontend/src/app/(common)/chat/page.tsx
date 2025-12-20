'use client';

import { useState, useRef, useEffect } from 'react';
import Button from '@/components/ui/Button';

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: Date;
  isMe: boolean;
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
  online: boolean;
}

// Mock data
const mockConversations: Conversation[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'SJ',
    lastMessage: 'Thanks for the feedback on my assignment!',
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    unreadCount: 2,
    online: true
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    avatar: 'MC',
    lastMessage: 'Your progress on the React course is excellent.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    unreadCount: 0,
    online: true
  },
  {
    id: '3',
    name: 'Emma Davis',
    avatar: 'ED',
    lastMessage: 'Can we schedule a 1-on-1 session?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    unreadCount: 1,
    online: false
  },
  {
    id: '4',
    name: 'Learn-Up Support',
    avatar: 'LS',
    lastMessage: 'Your course certificate is ready to download.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    unreadCount: 0,
    online: true
  }
];

const mockMessages: Message[] = [
  {
    id: 1,
    sender: 'Sarah Johnson',
    content: 'Hi! I wanted to thank you for the detailed feedback on my assignment.',
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
    isMe: false
  },
  {
    id: 2,
    sender: 'You',
    content: 'You\'re welcome! I\'m glad you found it helpful. Keep up the great work!',
    timestamp: new Date(Date.now() - 1000 * 60 * 8),
    isMe: true
  },
  {
    id: 3,
    sender: 'Sarah Johnson',
    content: 'I\'ll make sure to apply these suggestions to my next project.',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    isMe: false
  }
];

export default function ChatPage() {
  const [conversations, setConversations] = useState(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleConversationSelect = (conversationId: string) => {
    setSelectedConversation(conversationId);
    setMessages(mockMessages);

    // Mark as read
    setConversations(conversations.map(conv =>
      conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv
    ));
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: messages.length + 1,
      sender: 'You',
      content: newMessage,
      timestamp: new Date(),
      isMe: true
    };

    setMessages([...messages, message]);
    setNewMessage('');

    // Simulate typing indicator
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const reply: Message = {
        id: messages.length + 2,
        sender: 'Sarah Johnson',
        content: 'Thanks for your message! I\'ll get back to you soon.',
        timestamp: new Date(),
        isMe: false
      };
      setMessages(prev => [...prev, reply]);
    }, 2000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const selectedConv = conversations.find(conv => conv.id === selectedConversation);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-heading mb-2">Messages</h1>
        <p className="text-body">Connect with instructors, students, and support</p>
      </div>

      <div className="bg-card rounded-lg shadow-sm overflow-hidden" style={{ height: '600px' }}>
        <div className="grid grid-cols-12 h-full">
          {/* Conversations Sidebar */}
          <div className="col-span-4 border-r border-secondary/20 flex flex-col">
            <div className="p-4 border-b border-secondary/20">
              <h2 className="text-lg font-semibold text-heading mb-2">Conversations</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full px-4 py-2 rounded-lg border border-secondary bg-card text-heading transition-colors focus:border-primary text-sm"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => handleConversationSelect(conversation.id)}
                  className={`w-full p-4 text-left hover:bg-softPurple transition-colors border-b border-secondary/10 ${
                    selectedConversation === conversation.id ? 'bg-softPurple' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-semibold">
                        {conversation.avatar}
                      </div>
                      {conversation.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-card"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-heading font-medium truncate">{conversation.name}</p>
                        <span className="text-xs text-muted">{formatTime(conversation.timestamp)}</span>
                      </div>
                      <p className="text-sm text-body truncate">{conversation.lastMessage}</p>
                    </div>
                    {conversation.unreadCount > 0 && (
                      <div className="bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {conversation.unreadCount}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="col-span-8 flex flex-col">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-secondary/20 flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-semibold">
                      {selectedConv?.avatar}
                    </div>
                    {selectedConv?.online && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-card"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-heading font-semibold">{selectedConv?.name}</h3>
                    <p className="text-sm text-muted">
                      {selectedConv?.online ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.isMe
                            ? 'bg-primary text-white'
                            : 'bg-softPurple text-heading'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${message.isMe ? 'text-primary-foreground/70' : 'text-muted'}`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-softPurple text-heading px-4 py-2 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-muted rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-muted rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 bg-muted rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-secondary/20">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-2 rounded-lg border border-secondary bg-card text-heading transition-colors focus:border-primary"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      size="sm"
                    >
                      Send
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">💬</div>
                  <h3 className="text-xl font-semibold text-heading mb-2">Select a conversation</h3>
                  <p className="text-body">Choose a conversation from the sidebar to start chatting</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

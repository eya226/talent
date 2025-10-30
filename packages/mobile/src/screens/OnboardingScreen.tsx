import React, { useState, useCallback } from 'react';
import { Button } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { useNavigation } from '@react-navigation/native';

const OnboardingScreen = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const navigation = useNavigation();

  React.useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello! I am Aria, your personal career mentor. I am here to help you build your profile and find the perfect job. What is your name?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Aria',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages: IMessage[] = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );

    const message = messages[0];
    if (message.text.toLowerCase().includes('hello')) {
        const responseMessage = {
            _id: new Date().getTime(),
            text: `Nice to meet you, ${message.text}! What are your career goals?`,
            createdAt: new Date(),
            user: {
                _id: 2,
                name: 'Aria',
            },
        };
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, [responseMessage]),
        );
    } else {
        const responseMessage = {
            _id: new Date().getTime(),
            text: `That's a great goal! Let's get started on building your profile.`,
            createdAt: new Date(),
            user: {
                _id: 2,
                name: 'Aria',
            },
        };
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, [responseMessage]),
        );
    }
  }, []);

  return (
    <>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
      {messages.length > 2 && (
        <Button
          title="Get Started"
          onPress={() => navigation.navigate('StudentDashboard')}
        />
      )}
    </>
  );
};

export default OnboardingScreen;

import { Box } from '@mui/material';
import ChatInterface from './ChatInterface';
import { useEffect, useRef, useState } from 'react';
import TakeUserInfo from './TakeUserInfo';
import connectWebSocket from '../lib/webSocket';
import type { Socket } from 'socket.io-client';
import { EVENTS_NAME } from '../constant';
import { toast } from 'sonner';

export interface IChat {
  id: number;
  username: string;
  message: string;
  role: 'receiver' | 'sender';
}

const GroupChat = () => {
  const socket = useRef<Socket | null>(null);
  const timer = useRef<number | null>(null);
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [chatHistories, setChatHistories] = useState<IChat[]>([]);
  const [isShowPopUp, setIsShowPopUp] = useState(true);
  const [typerLists, setTyperLists] = useState<string[]>([]);

  /**
   * Send Message
   */
  const handleSendMessage = () => {
    const msg = message.trim();
    if (!msg) return;

    const chatPayload = {
      id: Date.now(),
      username,
      message,
    };

    setChatHistories((prev) => [...prev, { ...chatPayload, role: 'sender' }]);
    socket.current?.emit(EVENTS_NAME.message, chatPayload);

    setMessage('');
  };

  useEffect(() => {
    socket.current = connectWebSocket();

    socket.current.on('connect', () => {
      // When some one join in the group
      socket.current?.on(EVENTS_NAME.notice, (user) => {
        toast.success(`${user} has been joined in the room!`);
      });

      // receive message
      socket.current?.on(EVENTS_NAME.message, (payload) => {
        const chatPayload: IChat = {
          ...payload,
          role: 'receiver',
        };

        setChatHistories((prev) => [...prev, chatPayload]);
      });
    });

    // track the user which are typing
    socket.current.on(EVENTS_NAME.typing, (userName) => {
      setTyperLists((prev) => {
        const isExist = prev.find((typer) => typer === userName);
        if (!isExist) {
          return [...prev, userName];
        }

        return prev;
      });
    });

    // remove the stopTyping users
    socket.current.on(EVENTS_NAME.stopTyping, (userName) => {
      setTyperLists((prev) => prev.filter((typer) => typer !== userName));
    });

    return () => {
      socket.current?.off(EVENTS_NAME.joinRoom);
      socket.current?.off(EVENTS_NAME.message);
      socket.current?.off(EVENTS_NAME.notice);
      socket.current?.off(EVENTS_NAME.typing);
      socket.current?.off(EVENTS_NAME.stopTyping);
    };
  }, []);

  useEffect(() => {
    if (message) {
      socket.current?.emit(EVENTS_NAME.typing, username);
      clearTimeout(timer.current as any);
    }

    timer.current = setTimeout(() => {
      socket.current?.emit(EVENTS_NAME.stopTyping, username);
    }, 1000);

    return () => {
      clearTimeout(timer.current as any);
    };
  }, [message, username]);

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#1B3C53',
        p: 2,
      }}
    >
      {isShowPopUp ? (
        <TakeUserInfo
          onContinue={(name) => {
            if (!!name) {
              setIsShowPopUp(false);
              setUsername(name);

              // on submit username
              socket.current?.emit(EVENTS_NAME.joinRoom, name);
            }
          }}
        />
      ) : (
        <ChatInterface
          username={username}
          message={message}
          setMessage={setMessage}
          chatHistories={chatHistories}
          handleSendMessage={handleSendMessage}
          typerLists={typerLists}
          onRestart={() => {
            setUsername('');
            setIsShowPopUp(true);
            setChatHistories([]);
          }}
        />
      )}
    </Box>
  );
};

export default GroupChat;

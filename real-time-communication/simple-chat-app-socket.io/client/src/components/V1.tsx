import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';

interface ChatMessage {
  id: string;
  message: string;
  role: 'user' | 'friend';
}

const AppV1 = () => {
  const [chats, setChats] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState('');
  const socket = useMemo(() => io('http://localhost:8000'), []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle message sending logic here

    setChats((prevChats) => [
      ...prevChats,
      {
        id: Date.now().toString(),
        message,
        role: 'user',
      },
    ]);

    socket.emit('message', message);

    setMessage('');
  };

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server with ID:', socket.id);
    });

    // Handle incoming messages here
    socket.on('receive-message', (msg: string) => {
      setChats((prevChats) => [
        ...prevChats,
        {
          id: Date.now().toString(),
          message: msg,
          role: 'friend',
        },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Container>
      <Typography variant='h4' align='center' my={4} gutterBottom>
        Real-Time Chat Application
      </Typography>
      <Box
        width={500}
        sx={{
          margin: '0 auto',
          border: '1px solid gray',
          borderRadius: '6px',
          p: 4,
          height: '80vh',
        }}
      >
        <Stack
          sx={{
            height: '65vh',
            overflowY: 'auto',
          }}
        >
          {chats.map((chat) => (
            <Box
              key={chat.id}
              sx={{
                alignSelf: chat.role === 'user' ? 'flex-end' : 'flex-start',
                bgcolor: chat.role === 'user' ? 'primary.main' : 'grey.300',
                color: chat.role === 'user' ? 'primary.contrastText' : 'black',
                p: 1,
                borderRadius: '8px',
                maxWidth: '70%',
                mb: 1,
              }}
            >
              <Typography>{chat.message}</Typography>
            </Box>
          ))}
        </Stack>
        <form onSubmit={handleSubmit}>
          <Stack direction='row' alignItems={'center'} gap={1} height={'15vh'}>
            <TextField
              name='message'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              fullWidth
              placeholder='Type a message...'
              size='small'
            />
            <Button type='submit' variant='contained'>
              Send
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};
export default AppV1;

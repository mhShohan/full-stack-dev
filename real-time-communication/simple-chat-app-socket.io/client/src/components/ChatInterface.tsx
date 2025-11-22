import { Box, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import TelegramIcon from '@mui/icons-material/Telegram';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import type { IChat } from './GroupChat';

function formatTime(ts: string | number) {
  const d = new Date(ts);
  let hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // convert 0 -> 12
  const hh = String(hours).padStart(2, '0');
  return `${hh}:${minutes} ${ampm}`;
}

interface Props {
  username: string;
  message: string;
  onRestart: () => void;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: () => void;
  chatHistories: IChat[];
  typerLists: string[];
}

const ChatInterface = ({
  username,
  message,
  setMessage,
  onRestart,
  chatHistories,
  handleSendMessage,
  typerLists,
}: Props) => {
  return (
    <Box
      sx={{
        maxWidth: '500px',
        borderRadius: '8px',
        bgcolor: '#fff',
        height: '100%',
        margin: '0 auto',
        border: '2px solid #427A76',
      }}
    >
      <Stack>
        <Stack
          direction='row'
          alignItems='center'
          sx={{
            height: '10vh',
            borderBottom: '1px solid #427A76',
            bgcolor: '#1D546C',
            borderRadius: '6px 6px 0 0',
            px: 2,
          }}
        >
          <Box
            sx={{
              width: '46px',
              height: '46px',
              bgcolor: '#1976d2',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '8px',
            }}
          >
            <QuestionAnswerIcon sx={{ color: 'white' }} />
          </Box>
          <Stack flex={1}>
            <Typography variant='h6' sx={{ color: 'white' }} lineHeight={0.8} pt={1}>
              Hello {username}
            </Typography>
            <Typography variant='body2' sx={{ color: 'white' }} color='textSecondary'>
              {typerLists.length > 0 && `${typerLists.join(', ')} typing....`}
            </Typography>
          </Stack>
          <Tooltip title='Restart Conversation'>
            <IconButton onClick={onRestart}>
              <RestartAltIcon sx={{ color: 'white' }} />
            </IconButton>
          </Tooltip>
        </Stack>
        <Stack sx={{ height: '74vh', bgcolor: '#1A3D64', overflowY: 'auto' }}>
          {chatHistories?.map((chat) => (
            <Box
              p={2}
              key={chat.id}
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: chat.role === 'sender' ? 'flex-end' : 'flex-start',
              }}
            >
              <Box
                sx={{
                  padding: 2,
                  borderRadius: 2,
                  maxWidth: '80%',
                  bgcolor: chat.role === 'sender' ? '#8ABEB9' : '#B7B89F',
                }}
              >
                <Typography variant='body1'>{chat.message}</Typography>
                <Box
                  mt={2}
                  minWidth={250}
                  display={'flex'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                >
                  <Typography variant='body2' fontWeight={800}>
                    {chat.username}
                  </Typography>
                  <Typography variant='body2' fontWeight={600}>
                    {formatTime(chat.id)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Stack>
        <Stack
          sx={{
            height: '12vh',
            borderTop: '1px solid gray',
            bgcolor: '#1D546C',
            borderRadius: '0 0 6px 6px',
            justifyContent: 'center',
            alignItems: 'center',
            px: 2,
          }}
        >
          <Box
            sx={{
              p: 1,
              width: '100%',
              border: '1px solid #427A76',
              bgcolor: 'white',
              borderRadius: '50px',
              display: 'flex',
            }}
          >
            <input
              type='text'
              placeholder='Type a message...'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.code === 'Enter') {
                  handleSendMessage();
                }
              }}
              style={{
                width: '100%',
                border: 'none',
                outline: 'none',
                fontSize: '16px',
                padding: '0 10px',
              }}
            />
            <button
              onClick={handleSendMessage}
              style={{
                backgroundColor: '#1976d2',
                color: 'white',
                border: 'none',
                borderRadius: '50px',
                width: '36px',
                height: '36px',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TelegramIcon />
            </button>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ChatInterface;

import { Button, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';

interface TakeUserInfoProps {
  onContinue: (username: string) => void;
}

const TakeUserInfo = ({ onContinue }: TakeUserInfoProps) => {
  const [username, setUsername] = useState('');

  const handleContinue = () => {
    if (username.trim() === '') return;
    onContinue(username.trim());
  };

  return (
    <Stack justifyContent={'center'} alignItems='center' sx={{ height: '100%' }}>
      <Stack
        sx={{
          maxWidth: '400px',
          p: 4,
          bgcolor: 'white',
          minWidth: '300px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant='h5' lineHeight={1} align='center' gutterBottom>
          Welcome to Chat!
        </Typography>
        <Typography variant='body1' lineHeight={1} align='center'>
          Please enter your Username to continue.
        </Typography>
        <TextField
          size='small'
          label='Username'
          variant='outlined'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => {
            if (e.code === 'Enter') {
              handleContinue();
            }
          }}
          fullWidth
          sx={{ mt: 3, mb: 2 }}
        />
        <Button onClick={handleContinue} variant='contained' color='primary' fullWidth>
          Continue
        </Button>
      </Stack>
    </Stack>
  );
};

export default TakeUserInfo;

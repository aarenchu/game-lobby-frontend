import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
// import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
interface Props {
  isOpen: boolean;
  message: string;
  closeMsg: Function;
}

const Error: React.FC<Props> = ({ isOpen, message, closeMsg }) => {
  return (
    <Collapse in={isOpen}>
      <Alert
        severity='error'
        action={
          <IconButton
            aria-label='close'
            color='inherit'
            size='small'
            onClick={() => {
              closeMsg(false);
            }}
          >
            <CloseIcon fontSize='inherit' />
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        <AlertTitle>Error</AlertTitle>
        {message}
      </Alert>
    </Collapse>
  );
};

export default Error;

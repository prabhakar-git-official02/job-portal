import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function ProgressLoad({setSize,trigger,msg,msgClass,textColor}) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Stack spacing={2} direction="row">
     {trigger ===  1 && 
     <div className={`d-flex justify-content-center ${textColor ? textColor : null}`}>
      <span className={msgClass}>{msg}</span><span className='mx-2 mt-1'><CircularProgress enableTrackSlot size={setSize} /></span>
    </div>}

     {trigger === 2 &&  <CircularProgress enableTrackSlot size={40} />}
     {trigger === 3 && <CircularProgress enableTrackSlot size="3rem" />}
     {trigger === 4 && <CircularProgress enableTrackSlot variant="determinate" value={70} />}
     {trigger === 5 && <CircularProgress
        enableTrackSlot
        variant="determinate"
        color="secondary"
        value={progress}
      />}
    </Stack>
  );
}

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import ButtonUI from './ButttonUI';
import { showAlert } from '../Scripts/Alert';
function ErrorAlert({
   alertMsg,
    colorbg,
        colortext,
        hoverColorbg,
        buttonName,
        handlefn,
        buttonVariant,
        buttonClass,
        Custom,
   }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try{
    if (alertMsg?.msg) {
      setVisible(true)
      const timer = setTimeout(() => {
        setVisible(false)
      }, 10000);

      return () => clearTimeout(timer);
    }
  } catch(err){
    showAlert("Error",err.mesaage,"error")
  }
  }, [alertMsg])

  return (
    <>
        <div>
    <Stack sx={{ width: '100%' }} spacing={2} className='mt-3'>
      {visible && (
        <Alert
          severity="error"
          onClose={() => setVisible(false)}
        >
          {alertMsg?.msg}
        </Alert>
      )}
    </Stack>
    </div>
    <ButtonUI 
    colorbg={colorbg}
    colortext={colortext}
    hoverColorbg={hoverColorbg}
    buttonName={buttonName}
    handlefn={handlefn}
    buttonVariant={buttonVariant}
    buttonClass={buttonClass}
    Custom={Custom}
    />
    </>
  );
}

export default ErrorAlert;

import Button from '@mui/material/Button';

export default function ButtonUI(
    {
        colorbg,
        colortext,
        hoverColorbg,
        buttonName,
        handlefn,
        buttonVariant,
        buttonClass,
        Custom
    }
) {



  return (
<Button
{...Custom}
onClick={handlefn}
className={buttonClass}
 variant={buttonVariant}
 sx={{
   backgroundColor:colorbg,
   color:colortext,
   '&:hover':{
     backgroundColor:hoverColorbg
   }
 }}
>
{buttonName}
</Button>

  );
}

/* Button colors :

 primary

secondary

success

error

warning

info

inherit*/

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export default function ImageAvatar({
  altMsg,
  srcLink,
  avatarSizeH,
  avatarSizeW,
  nameMsg,
  nameClass,
  nameStyle
}) {
  return (
    <Stack direction="row" spacing={2}>
      <span>
      <Avatar style={{width : `${avatarSizeW}`,height : `${avatarSizeH}`}} alt={altMsg} src={`${srcLink}`}/>
      </span>
      <span style={nameStyle} className={nameClass}>{nameMsg}</span>
    </Stack>
  );
}

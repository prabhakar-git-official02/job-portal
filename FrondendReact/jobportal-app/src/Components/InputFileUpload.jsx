import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function InputFileUpload({ setdata, setPreview,name }) {
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      {name}
      <VisuallyHiddenInput
        type="file"
        id="resumeUpload"
        accept=".pdf,.doc,.docx"
        onChange={(e) => {
          const file = e.target.files[0];
          if (!file) return;
          setdata(file);
          setPreview(URL.createObjectURL(file));
        }}
        multiple
      />
    </Button>
  );
}

export default InputFileUpload;

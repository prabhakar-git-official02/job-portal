import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { styled } from "@mui/material/styles";

const PremiumTextField = styled(TextField)({
  width: "100%",

  "& .MuiOutlinedInput-root": {

    borderRadius: "14px",
    background: "rgba(255,255,255,0.7)",
    backdropFilter: "blur(10px)",
    transition: "all 0.3s ease",

    "& fieldset": {
      borderColor: "#e0e7ff",
    },

    "&:hover fieldset": {
      borderColor: "#6366f1",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#4f46e5",
      boxShadow: "0 0 0 4px rgba(79,70,229,0.1)",
    },

  },

  "& input": {
    padding: "14px 12px",
    fontSize: "15px",
  },
});

function SearchInput({ search, setSearch,placeholder }) {
  return (
    <Box
      className="premium-search-container"
      sx={{
        width: "100%",
        maxWidth: "500px",
      }}
    >
      <PremiumTextField
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder}
        variant="outlined"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon
                sx={{
                  color: "#6366f1",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "scale(1.2)",
                  },
                }}
              />
            </InputAdornment>
          ),
        }}
      />

      <style>
        {`
        .premium-search-container{

          background: linear-gradient(135deg,#f8fafc,#eef2ff);
          padding:6px;
          border-radius:16px;

          box-shadow:
          0 4px 20px rgba(0,0,0,0.05),
          inset 0 1px 0 rgba(255,255,255,0.6);

        }

        @media(max-width:768px){

          .premium-search-container{
            max-width:100%;
          }

        }
        `}
      </style>

    </Box>
  );
}

export default SearchInput;

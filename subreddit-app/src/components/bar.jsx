import { AppBar, Toolbar, Typography, InputBase } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";


export function Bar() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="16"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            cReddit Hours
          </Typography>
          
        </Toolbar>
      </AppBar>
    </>
  );
}

import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GroupIcon from "@mui/icons-material/Group";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import { styled } from "@mui/material/styles";

const ListStyle = styled((props) => <List {...props} />)(({ theme }) => ({
  marginTop: "15vh",
}));

const ListItemStyle = styled((props) => (
  <ListItemButton disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: "relative",
  textTransform: "capitalize",
  color: "#333232",
  padding: 30,
  alignContent: "center",
  marginTop: 10,
  borderRadius: theme.shape.borderRadius,
}));

const ListIconStyle = styled((props) => <ListItemIcon {...props} />)(
  ({ theme }) => ({
    color: "#F73D93",
  })
);
export default function Navsection() {
  return (
    <ListStyle>
      <ListItemStyle component="a" href="/dashboard">
        <ListIconStyle>
          <DashboardIcon />
        </ListIconStyle>
        <ListItemText primary="Dashboard" />
      </ListItemStyle>
      <ListItemStyle>
        <ListIconStyle>
          <GroupIcon />
        </ListIconStyle>
        <ListItemText primary="Users" />
      </ListItemStyle>
      <ListItemStyle component="a" href="/finance">
        <ListIconStyle>
          <AccountBalanceIcon />
        </ListIconStyle>
        <ListItemText primary="Finance" />
      </ListItemStyle>
      <ListItemStyle component="a" href="/inventory">
        <ListIconStyle>
          <InventoryIcon />
        </ListIconStyle>
        <ListItemText primary="Inventory" />
      </ListItemStyle>

      <ListItemStyle component="a" href="/library">
        <ListIconStyle>
          <LocalLibraryIcon />
        </ListIconStyle>

        <ListItemText primary="Library" />
      </ListItemStyle>
    </ListStyle>
  );
}

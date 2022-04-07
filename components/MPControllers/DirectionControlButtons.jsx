import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const buttons = [
  {
    id: 1,
    icon: <ArrowForwardIcon />,
    link: "RIGHT",
  },
  {
    id: 2,
    icon: <ArrowBackIcon />,
    link: "LEFT",
  },
  {
    id: 3,
    icon: <ArrowUpwardIcon />,
    link: "FORWARD",
  },
  {
    id: 4,
    icon: <ArrowDownwardIcon />,
    link: "BACK",
  },
];


const DirectionControlButtons = ({ mpSdk }) => {
  const handleClick = async (link) => {
    try {
     mpSdk.Camera.moveInDirection(link);
    } catch (error) {
      console.log("An error occured while moving in that direction.", error);
    }
  };

  return (
    <Box>
      {buttons.map((item) => (
        <Button
          key={item.id}
          variant="contained"
          aria-label="horizontal contained button group"
          sx={{ margin: 1 }}
          onClick={() => handleClick(item.link)}
        >
          {item.icon}
        </Button>
      ))}
    </Box>
  );
};
export default DirectionControlButtons;

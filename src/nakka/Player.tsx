import { Card } from "@mui/material";
import React from "react";

interface PlayerProps {
  tpid: string;
  name: string;
  avg?: number;
}

const Player = (props: PlayerProps) => {
  return (
    <div style={{ color: "white" }}>
      {props.tpid} {props.name}
    </div>
  );
};

export default Player;

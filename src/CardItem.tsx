import { Card, CardContent, Checkbox } from "@mui/material";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
const DND_PTN1 = "DND_PTN1";

export const CardItem = ({ owncard, updateData, updateCheckBox }: any) => {
  const ref = useRef<HTMLDivElement>(null);

  const acceptdata = () => {
    if (owncard.area === "layoutcompleted") {
      return ""
    } else if (owncard.area === "unlayout") {
      return "outoflayout"
    } else {
      return "unlayout"
    }
  }

  const [{ isDragging }, drag] = useDrag({
    type: owncard.area,
    item: {
      type: owncard.area,
      area: owncard.area,
      CMaterialId: owncard.CMaterialId
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  });

  const [{ isOver }, drop] = useDrop({
    accept: acceptdata(),
    drop(item: any) {
      if (!ref.current || item.area === owncard.area) {
        console.log("item.area", item.area);
        return;
      }
      console.log("item:", item);
      updateData({ area: owncard.area, CMaterialId: item.CMaterialId })
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  });

  drag(drop(ref));

  return (
    <Card ref={ref}>
      <CardContent
        key={owncard.CMaterialId}
        sx={{ alignItems: "center", display: "grid", gridTemplateColumns: "0.4fr 1fr 1fr" }}
      >
        <Checkbox checked={owncard.checkflg} onClick={() => updateCheckBox({ area: owncard.area, CMaterialId: owncard.CMaterialId })} />
        <li>{owncard.CMaterialId}</li>
        <li>{owncard.name}</li>
      </CardContent>
    </Card>
  );
};

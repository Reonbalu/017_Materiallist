import { Accordion, AccordionDetails, AccordionSummary, Card, Checkbox, Divider } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CardList } from "./CardList";
import { useRef } from "react";
import { useDrop } from "react-dnd";

export const CardPanel = ({ items, updateData, area,updateCheckBox }: any) => {
  const ref = useRef<HTMLDivElement>(null)

  const acceptdata = () => {
    if(area === "layoutcompleted"){
      return ""
    }else if(area === "unlayout" ){
      return "outoflayout"
    }else{
      return "unlayout"
    }
  }

  const [{isOver}, drop] = useDrop({
    accept : acceptdata(),
    drop(item:any){
      if(!ref.current){
        return
      }
      updateData({area: area, CMaterialId: item.CMaterialId})
    },
    collect : monitor => ({
      isOver : !!monitor.isOver()
    })
  })

  drop(ref)
  const PanelStyle = isOver ? {backgroundColor: "#FEB2B2" } : { backgroundColor: "#BEE3F8" }

  const parentflg = items.length !== 0 ? items.every(
    (item: any) => item.checkflg === true
  ) : false;

  const updatedata = (event:any) => {
    event.stopPropagation()
    updateCheckBox({
      ptn: "parent",
      area: area,
      parentflg: parentflg
    });
  };

  return (
    <Card ref={ref}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Checkbox checked={parentflg} onClick={(e)=>updatedata(e)}/>
          {area}
        </AccordionSummary>
        <Divider />
        <AccordionDetails sx={PanelStyle}>
          <CardList
            items={items}
            updateData={updateData}
            updateCheckBox={updateCheckBox}
          />
        </AccordionDetails>
      </Accordion>
    </Card>
  )
}
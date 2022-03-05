import { Accordion, AccordionDetails, AccordionSummary, Card, Divider } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CardList } from "./CardList";
import { useRef } from "react";
import { useDrop } from "react-dnd";

export const CardPanel = ({ data, getRecord, updateData, area }: any) => {
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
  console.log("isOver:", isOver)
  const PanelStyle = isOver ? {backgroundColor: "#FEB2B2" } : { backgroundColor: "#BEE3F8" }

  return (
    <Card ref={ref}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          {area}
        </AccordionSummary>
        <Divider />
        <AccordionDetails sx={PanelStyle}>
          <CardList
            items={getRecord({ data, area: area })}
            updateData={updateData}
          />
        </AccordionDetails>
      </Accordion>
    </Card>
  )
}
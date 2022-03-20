import { HighlightOff } from "@mui/icons-material"
import { Card, CardContent, IconButton } from "@mui/material"
import { useRef } from "react"
import { useDrag, useDrop } from "react-dnd"

export const LayoutCard = ({ owncard, updateData, insertData,setDropState, index }: any) => {
  const ref = useRef<HTMLDivElement>(null)
  const dragRef = useRef<HTMLDivElement>(null)

  const [{ isOver }, drop] = useDrop({
    accept: ["layout","unlayout","outoflayout"],
    drop(item: any) {
      if (!ref.current || item.CMaterialId === owncard.CMaterialId) {
        return
      }
      console.log("item:",item ,"owncard.CMaterialId:",owncard.CMaterialId)
      insertData({ CMaterialId: item.CMaterialId, preCMaterialId: owncard.CMaterialId })
    },
    hover(item:any){
      setDropState(false)
    },
    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  })

  const [{isDragging}, drag] = useDrag({
    type : "layout",
    item: {
      type: owncard.area,
      area: owncard.area,
      CMaterialId: owncard.CMaterialId
    },
    collect : monitor => ({
      isDragging : !!monitor.isDragging()
    })
  })

  const unlayoutData = () => {
    updateData({ area: "unlayout", CMaterialId: owncard.CMaterialId })
  }

  drop(ref)
  drag(dragRef)

  const hoverstyle = isOver ? { width: "95%", margin: "0 auto" , height: "30px", backgroundColor: "#FEB2B2"} : { width: "95%", margin: "0 auto" ,height: "10px", backgroundColor: "#BEE3F8"}

  return (
    <>
      <div ref={ref} style={hoverstyle} />
      <Card ref={dragRef} style={{ width: "95%", margin: "0 auto" }}>
        <CardContent style={{ display: "grid", gridTemplateColumns: "1fr 30px" }}>
          <div>
            {owncard.area}/{owncard.CMaterialId}/{owncard.name}
          </div>
          <IconButton aria-label="delete" onClick={() => unlayoutData()}>
            <HighlightOff />
          </IconButton>
        </CardContent>
      </Card>
    </>

  )
}
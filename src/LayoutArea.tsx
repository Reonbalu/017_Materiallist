import { Card } from "@mui/material"
import { color } from "@mui/system"
import { useRef, useState } from "react"
import { useDrop } from "react-dnd"
import { LayoutCard } from "./LayoutCard"

export const LayoutArea = ({ items, updateData, insertData, area }: any) => {
  const ref = useRef<HTMLDivElement>(null)
  const ref2 = useRef<HTMLDivElement>(null)
  const [dropState, setDropState] = useState(true)

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ["unlayout","outoflayout"],
    drop(item: any, monitor) {
      const didDrop = monitor.didDrop()
      if (!ref.current || didDrop) {
        return
      }
      console.log("didrop:", monitor.didDrop())
      insertData({ CMaterialId: item.CMaterialId, preCMaterialId: null })
    },
    canDrop: () => dropState,
    hover(item: any) {
      setDropState(true)
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop()
    })
  })

  drop(ref)

  const Cardstyle = isOver ? { width: "95%", margin: "0 auto", backgroundColor: "#FEB2B2" } : { width: "95%", margin: "0 auto", backgroundColor: "#BEE3F8" }

  return (
    <Card style={{ height: "95vh", padding: "10px 0", display:"grid", gridTemplateRows :"auto 1fr" }}>
      <div>
        {items.map((item: any, index: any) => (
          <LayoutCard key={index} owncard={item} updateData={updateData} insertData={insertData} setDropState={setDropState} index={index} />
        ))}
      </div>
      <div ref={ref} style={Cardstyle} />
    </Card>
  )
}
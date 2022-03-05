import "./styles.css";
import { record } from "./data1";
import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Divider
} from "@mui/material";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { LayoutArea } from "./LayoutArea";
import { CardPanel } from "./CardPanel";

const getRecord = ({ data, area }: any) => {
  const targetAreaList = data.MaterialItem.filter((value: any) => {
    return value.area === area;
  });
  return targetAreaList;
};

export default function App() {
  const [data, setData] = useState(record);

  const updateData = ({ area, CMaterialId }: any) => {
    setData((prev) => {
      const data = prev.MaterialItem.map(item => {
        return item.CMaterialId === CMaterialId ? { ...item, area: area } : item
      })
      return { ...prev, MaterialItem: data }
    })
  }

  const insertData = ({ CMaterialId, preCMaterialId }: any) => {
    let insertIndex = -1
    console.log("CMaterialId:", CMaterialId, "preCMaterialId:", preCMaterialId)
    const targetItem = data.MaterialItem.filter(item => {
      return item.CMaterialId === CMaterialId
    }).map(item => { return { ...item, area: "layoutcompleted" } })
    const newItems = data.MaterialItem.filter(item => {
      return item.CMaterialId !== CMaterialId
    })

    if (preCMaterialId !== null) {
      insertIndex = newItems.findIndex(item => item.CMaterialId === preCMaterialId)
    }

    console.log("inserindex:", insertIndex, "targetItem:", targetItem, "newItems:", newItems)
    newItems.splice(insertIndex, 0, ...targetItem)
    setData(prev => {
      return { ...prev, MaterialItem: newItems }
    })
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Box display="grid" gridTemplateColumns="350px 1fr 350px" style={{ gridGap: "10px" }}>
        <Box>
          <CardPanel data={data} getRecord={getRecord} updateData={updateData} area={"layoutcompleted"} />
          <Divider />
          <CardPanel data={data} getRecord={getRecord} updateData={updateData} area={"unlayout"} />
          <Divider />
          <CardPanel data={data} getRecord={getRecord} updateData={updateData} area={"outoflayout"} />
        </Box>
        <Box>
          <LayoutArea items={getRecord({ data, area: "layoutcompleted" })} updateData={updateData} insertData={insertData} area={"layoutcompleted"} />
        </Box>
        <Box>
          <Card>
            <CardContent>
              配信情報
            </CardContent>
          </Card>
        </Box>
      </Box>
    </DndProvider>
  );
}

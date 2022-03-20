import { CardItem } from "./CardItem";

export const CardList = ({ items, updateData, area ,updateCheckBox}: any) => {
  return (
    <div style={{ display: "grid", gridGap: "5px" }}>
      {items.map((item: any, index: any) => {
        return <CardItem key={index} owncard={item} updateData={updateData} updateCheckBox={updateCheckBox}/>;
      })}
    </div>
  );
};

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

function DropDown({
  datas,
  setDatas,
  dataName,
  initialName,
  classname,
  dropDirection,
}) {
  return (
    <Select
      value={dataName || ""}
      displayEmpty
      className={classname}
      onChange={(e) => setDatas(e.target.value)}
      renderValue={(selected) => {
        if (!selected) {
          return (
            <span style={{ color: "#9e9e9e" }}>
              {initialName}
            </span>
          );
        }
        return selected;
      }}
      MenuProps={{
        anchorOrigin: {
          vertical: dropDirection === "up" ? "top" : "bottom",
          horizontal: "left",
        },
        transformOrigin: {
          vertical: dropDirection === "up" ? "bottom" : "top",
          horizontal: "left",
        },
      }}
    >
      {datas?.map((data, index) => (
        <MenuItem key={index} value={data}>
          {data}
        </MenuItem>
      ))}
    </Select>
  );
}

export default DropDown;
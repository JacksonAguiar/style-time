import { generateHourList } from "@/utils/time";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { FiTrash2 } from "react-icons/fi";

export default function ScheduleTime({
  with_trash = true,
  index = 0,
  valueStart = "",
  onChangeStart = (value: string) => {},
  valueEnd = "",
  onChangeEnd = (value: string) => {},
  onRemove = () => {},
  defaultTime = { start: "", end: "" },
  listHours = [""],
}) {
  return (
    <div key={index} className="w-full flex flex-now gap-4 items-center pt-5">
      {with_trash && (
        <Button size="sm" isIconOnly color="danger" onClick={onRemove}>
          <FiTrash2 />
        </Button>
      )}
      <Select
        labelPlacement={"outside"}
        label="De"
        placeholder="Horário"
        className="max-w-xs"
        onChange={(el)=> onChangeStart(el.target.value)}
        value={valueStart}
        // defaultSelectedKeys={[defaultTime.start]}
      >
        {listHours.map((hour, i) => (
          <SelectItem key={hour} value={hour}>
            {hour}
          </SelectItem>
        ))}
      </Select>
      <Select
        labelPlacement={"outside"}
        label="Até"
        placeholder="Horário"
        className="max-w-xs"
        // defaultSelectedKeys={[defaultTime.end]}
        onChange={(el)=> onChangeEnd(el.target.value)}
        value={valueEnd}
      >
        {listHours.map((hour, i) => (
          <SelectItem key={hour} value={hour}>
            {hour}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}

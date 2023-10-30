import { useState, useRef, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { CheckIcon } from "@radix-ui/react-icons";

export type SelectionData = {
  label: string;
  icon: JSX.Element;
  value: string;
}[];

export default function MultiSelectComponent({
  selectionData,
  selected,
  setSelected,
  notSelectedIcon,
  notSelectedLabel,
  notSelectedValue,
  selectFor,
  align = "left",
  setNotInteractingWithModal,
}: {
  selectionData: SelectionData;
  selected: string[];
  setSelected: (value: string[]) => void;
  notSelectedIcon: JSX.Element;
  notSelectedLabel: string;
  selectFor: string;
  notSelectedValue: string;
  align?: "left" | "right";
  setNotInteractingWithModal: (value: boolean) => void;
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredData, setFilteredData] = useState(selectionData);

  const search = (e: any) => {
    const keyword = e.target.value;
    if (keyword !== "") {
      const results = selectionData.filter((data) => {
        return data.label.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setFilteredData(results);
    } else {
      setFilteredData(selectionData);
    }
  };

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const clickOutside = (e: any) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target)
      ) {
        setShowDropdown(false);
        setTimeout(() => {
          setNotInteractingWithModal(false);
        }, 100);
      }
    };

    document.addEventListener("mousedown", clickOutside);

    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [setShowDropdown, setNotInteractingWithModal]);

  return (
    <div className="relative flex gap-2 items-center justify-center rounded-lg border border-zinc-300 hover:bg-zinc-100">
      <button
        className="flex items-center justify-center px-2 py-1 gap-1 font-medium  text-sm text-zinc-500"
        onClick={() => {
          setShowDropdown(!showDropdown);
          setNotInteractingWithModal(!showDropdown);
        }}
        ref={triggerRef}
      >
        {selected.length === 0
          ? notSelectedIcon
          : selectionData.find((selection) => selection.value === selected[0])
              ?.icon}
        <span className="hidden lg:block">
          {selected.length === 0
            ? notSelectedLabel
            : selected.length === 1
            ? selectionData.find((selection) => selection.value === selected[0])
                ?.label
            : `${selected.length} ${selectFor}`}
        </span>
      </button>
      <Transition
        show={showDropdown}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        className={`absolute top-8 z-[20] w-60 text-sm font-medium text-zinc-500 bg-white border border-zinc-200 rounded-lg ${
          align === "left" ? "left-0" : "right-0"
        }`}
        ref={dropdownRef}
      >
        <div className="p-1 w-full border-b border-zinc-200">
          <input
            className="p-1 w-full focus:outline-none bg-transparent"
            placeholder="Search"
            onChange={search}
          />
        </div>
        {filteredData.length > 0 && (
          <div className="flex flex-col rounded-lg p-1 max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-300 scrollbar-track-transparent scrollbar-thumb-rounded-full">
            <button
              className="flex items-center justify-between rounded-lg p-1 hover:bg-zinc-200"
              onClick={() => {
                setSelected([]);
              }}
            >
              <div className="flex gap-1 items-center">
                {notSelectedIcon}
                <span>{notSelectedValue}</span>
              </div>
              {selected.length === 0 && <CheckIcon className="w-4 h-4" />}
            </button>
            {filteredData.map((data, index) => (
              <button
                key={data.value}
                className="flex items-center justify-between rounded-lg p-1 hover:bg-zinc-200"
                onClick={() => {
                  if (selected.includes(data.value)) {
                    setSelected(selected.filter((item) => item !== data.value));
                  } else {
                    setSelected([...selected, data.value]);
                  }
                }}
              >
                <div className="flex gap-1 items-center">
                  {data.icon}
                  <span>{data.label}</span>
                </div>
                {selected.includes(data.value) && (
                  <CheckIcon className="w-4 h-4" />
                )}
              </button>
            ))}
          </div>
        )}
      </Transition>
    </div>
  );
}

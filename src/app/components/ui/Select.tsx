import { useState, useRef, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { CheckIcon } from "@radix-ui/react-icons";

export type SelectionData = {
  label: string;
  icon: JSX.Element;
  value: string;
}[];

export default function SelectComponent({
  selectionData,
  selected,
  setSelected,
  notSelectedLabel,
  align = "left",
  setNotInteractingWithModal,
}: {
  selectionData: SelectionData;
  selected: string;
  setSelected: (value: string) => void;
  notSelectedLabel?: string;
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
        {selectionData.find((selection) => selection.value === selected)?.icon}
        <span className="hidden lg:block">
          {selected === ""
            ? notSelectedLabel
            : selectionData.find((selection) => selection.value === selected)
                ?.label}
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
        className={`absolute top-8 z-[20] w-40 text-sm font-medium text-zinc-500 bg-white border border-zinc-200 rounded-lg ${
          align === "left" ? "left-0" : "right-0"
        }`}
        ref={dropdownRef}
      >
        <div className="p-1 w-full border-b border-zinc-200">
          <input
            type="text"
            className="p-1 w-full focus:outline-none bg-transparent"
            onChange={(e) => search(e)}
            placeholder="Search..."
          />
        </div>
        {filteredData.length > 0 && (
          <div className="flex flex-col rounded-lg p-1 max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-300 scrollbar-track-transparent scrollbar-thumb-rounded-full">
            {filteredData.map((selection, index) => (
              <button
                key={index}
                className="flex items-center justify-between rounded-lg p-1 hover:bg-zinc-200"
                onClick={() => {
                  setSelected(selection.value);
                  setShowDropdown(false);
                }}
              >
                <div className="flex gap-1 items-center">
                  {selection.icon}
                  <span>{selection.label}</span>
                </div>
                {selection.value === selected && (
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

// FlagList.tsx
import React, { RefObject } from "react";

interface FlagListProps {
  ulRef: RefObject<HTMLUListElement>;
  handleCountryClick: (event: React.MouseEvent<HTMLLIElement>) => void;
}

const FlagList: React.FC<FlagListProps> = ({ ulRef, handleCountryClick }) => {
  return (
    <ul
      ref={ulRef}
      className="absolute cursor-pointer z-10 list-none text-left p-0 m-0 -ml-px shadow-md bg-white border border-gray-300 whitespace-nowrap max-h-[200px] overflow-y-scroll hide"
    >
      <li
        className="py-[5px] px-[10px] highlight"
        data-dial-code="61"
        data-country-code="au"
        onClick={handleCountryClick}
      >
        <div className="mr-[6px] align-middle inline-block w-[20px]">
          <div
            className="w-[20px] h-[14px] bg-[top] bg-no-repeat "
            style={{
              backgroundPosition: "-286px 0",
              boxShadow: "0 0 1px 0 #888",
              backgroundImage: "url('/images/flags.02985cd6.png')",
              backgroundColor: "#fff",
            }}
          ></div>
        </div>
        <span className="mr-[6px] align-middle">Australia</span>
        <span className="text-[#999]">+ 61</span>
      </li>
      <li
        className="py-[5px] px-[10px]"
        data-dial-code="91"
        data-country-code="in"
        onClick={handleCountryClick}
      >
        <div className="mr-[6px] align-middle inline-block w-[20px]">
          <div
            className="w-[20px] h-[14px] bg-[top] bg-no-repeat "
            style={{
              backgroundPosition: "-2413px 0",
              boxShadow: "0 0 1px 0 #888",
              backgroundImage: "url('/images/flags.02985cd6.png')",
              backgroundColor: "#fff",
            }}
          ></div>
        </div>
        <span className="mr-[6px] align-middle">India (भारत)</span>
        <span className="text-[#999]">+ 91</span>
      </li>
      <li
        className="py-[5px] px-[10px]"
        data-dial-code="1"
        data-country-code="us"
        onClick={handleCountryClick}
      >
        <div className="mr-[6px] align-middle inline-block w-[20px]">
          <div
            className="w-[20px] h-[14px] bg-[top] bg-no-repeat "
            style={{
              backgroundPosition: "-5241px 0",
              boxShadow: "0 0 1px 0 #888",
              backgroundImage: "url('/images/flags.02985cd6.png')",
              backgroundColor: "#fff",
            }}
          ></div>
        </div>
        <span className="mr-[6px] align-middle">United States</span>
        <span className="text-[#999]">+ 1</span>
      </li>
    </ul>
  );
};

export default FlagList;

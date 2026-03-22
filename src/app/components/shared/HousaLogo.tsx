import svgPaths from "../../../imports/svg-01g126oxur";
import { FAMILY } from "../../brand";

export function HousaLogo() {
  return (
    <div className="relative shrink-0" style={{ width: 53, height: 93 }}>
      <div
        className="absolute overflow-hidden"
        style={{ top: 0, left: "5.66%", right: "3.77%", bottom: "37.63%" }}
      >
        <svg
          className="block w-full h-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 48 58"
        >
          <path
            clipRule="evenodd"
            d={svgPaths.p3ca2da00}
            fill="white"
            fillRule="evenodd"
            opacity="0.28"
          />
        </svg>
      </div>
      <p
        className={`${FAMILY} absolute left-0 right-0 text-center text-white m-0 p-0`}
        style={{ top: "calc(50% + 19.5px)", fontSize: 20, fontWeight: 600, lineHeight: 0, letterSpacing: "-1px" }}
      >
        <span style={{ lineHeight: "normal" }}>hous</span>
        <span style={{ lineHeight: "normal", letterSpacing: "-0.95px" }}>a</span>
      </p>
    </div>
  );
}

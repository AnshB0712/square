import { Link } from "react-router-dom";
import { useAuthCtx } from "../../context/authContext";
import { buttonVariants } from "../ui/button";

const RBARoute = ({ children, roles }) => {
  const { user } = useAuthCtx();

  const isAllowed = user.role.filter((role) => roles.includes(role));

  if (isAllowed.length) return children;

  return (
    <div className="flex flex-col gap-2 items-center justify-center p-1 min-h-[50vh]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: "60%",
          maxWidth: "200px",
        }}
        viewBox="0 0 1080 1080"
      >
        <defs>
          <clipPath id="clip-path">
            <path
              className="cls-1"
              d="M588.94 624.7c-1.82.55-3.59 1.17-5.31 1.88a7.13 7.13 0 0 1-9.52-4.61l-28.42-95.49L222 622.81l77.17 259.32a35.67 35.67 0 0 0 44.36 24l255.34-76a35.67 35.67 0 0 0 24-44.36l-18.24-61.31a7.14 7.14 0 0 1 5.45-9.07 53.68 53.68 0 0 0 5.47-1.32c26.8-8 42.56-34.45 35.22-59.14s-35.03-38.2-61.83-30.23Z"
            />
          </clipPath>
          <clipPath id="clip-path-2">
            <path
              className="cls-2"
              d="m458.35 233-289.53 86.14a35.66 35.66 0 0 0-24 44.35L222 622.81l111.08-33a6.58 6.58 0 0 1 8.35 5q.49 2.5 1.24 5c8 26.79 34.45 42.56 59.13 35.21s38.24-35 30.26-61.82c-.5-1.66-1.06-3.29-1.7-4.87a6.58 6.58 0 0 1 4.27-8.72l111.08-33.06Z"
            />
          </clipPath>
          <clipPath id="clip-path-3">
            <path
              className="cls-3"
              d="m458.35 233 24.87 83.56a9.74 9.74 0 0 1-7.79 12.44 55.84 55.84 0 0 0-7.67 1.7c-26.79 8-42.56 34.45-35.21 59.14s35 38.23 61.81 30.26a53.33 53.33 0 0 0 7.35-2.78 9.76 9.76 0 0 1 13.29 6.16l30.65 103L651.38 495a12 12 0 0 0 8-14.9l-.09-.3c-8-26.8 5.58-54.48 30.26-61.82s51.16 8.42 59.13 35.22l.09.29a12 12 0 0 0 14.9 8.08l71.5-21.28a35.66 35.66 0 0 0 24-44.35l-67-225.14a35.66 35.66 0 0 0-44.35-24Z"
            />
          </clipPath>
          <style>
            {
              ".cls-1,.cls-6{fill:#99adf9}.cls-2{fill:#fec272}.cls-10,.cls-3{fill:#ff97c9}.cls-6{opacity:.25}.cls-10,.cls-6{mix-blend-mode:multiply}.cls-10{opacity:.19}.cls-11{fill:#1c3177}.cls-15{fill:none;stroke:#1c3177;stroke-linecap:round;stroke-miterlimit:10;stroke-width:12px}"
            }
          </style>
        </defs>
        <g
          style={{
            isolation: "isolate",
          }}
        >
          <g id="Layer_2" data-name="Layer 2">
            <path
              className="cls-1"
              d="M588.94 624.7c-1.82.55-3.59 1.17-5.31 1.88a7.13 7.13 0 0 1-9.52-4.61l-28.42-95.49L222 622.81l77.17 259.32a35.67 35.67 0 0 0 44.36 24l255.34-76a35.67 35.67 0 0 0 24-44.36l-18.24-61.31a7.14 7.14 0 0 1 5.45-9.07 53.68 53.68 0 0 0 5.47-1.32c26.8-8 42.56-34.45 35.22-59.14s-35.03-38.2-61.83-30.23Z"
            />
            <path
              className="cls-6"
              d="M502.37 868.25S360.75 908 329.56 884.92c-26.28-19.4-27.49-39.4-64.79-118.31-.42 68 36.69 179.6 36.69 179.6Z"
              style={{
                clipPath: "url(#clip-path)",
              }}
            />
            <path
              className="cls-6"
              d="M342.65 599.74s13.82 66.16 63.91 51.26S432 573.13 432 573.13Z"
            />
            <path
              className="cls-2"
              d="m458.35 233-289.53 86.14a35.66 35.66 0 0 0-24 44.35L222 622.81l111.08-33a6.58 6.58 0 0 1 8.35 5q.49 2.5 1.24 5c8 26.79 34.45 42.56 59.13 35.21s38.24-35 30.26-61.82c-.5-1.66-1.06-3.29-1.7-4.87a6.58 6.58 0 0 1 4.27-8.72l111.08-33.06Z"
            />
            <g
              style={{
                clipPath: "url(#clip-path-2)",
              }}
            >
              <path
                d="M185.1 517.73s-39.71-141.62-16.68-172.81c19.41-26.28 53.76-41.66 94.33-53.74-68-.42-155.62 25.64-155.62 25.64Z"
                style={{
                  opacity: 0.52,
                  mixBlendMode: "multiply",
                  fill: "#fec272",
                }}
              />
            </g>
            <path
              className="cls-3"
              d="m458.35 233 24.87 83.56a9.74 9.74 0 0 1-7.79 12.44 55.84 55.84 0 0 0-7.67 1.7c-26.79 8-42.56 34.45-35.21 59.14s35 38.23 61.81 30.26a53.33 53.33 0 0 0 7.35-2.78 9.76 9.76 0 0 1 13.29 6.16l30.65 103L651.38 495a12 12 0 0 0 8-14.9l-.09-.3c-8-26.8 5.58-54.48 30.26-61.82s51.16 8.42 59.13 35.22l.09.29a12 12 0 0 0 14.9 8.08l71.5-21.28a35.66 35.66 0 0 0 24-44.35l-67-225.14a35.66 35.66 0 0 0-44.35-24Z"
            />
            <g
              style={{
                clipPath: "url(#clip-path-3)",
              }}
            >
              <path
                className="cls-10"
                d="M467.76 330.69s-27.76 14.68-17.64 48.74 33.79 38.49 49.36 41.27c-28 24.38-110.74-9.18-110.74-9.18L420 327.43ZM838.73 327s-44.19-140.29-80.52-153.82c-30.62-11.39-74.45-15.58-115-3.51 56.73-37.55 151-53.52 151-53.52Z"
              />
            </g>
            <circle className="cls-11" cx={260.44} cy={431.83} r={17.12} />
            <circle className="cls-11" cx={387.43} cy={394.05} r={17.12} />
            <path
              d="M314.57 453s.48-13.33 16.2-18 22.93 6.37 22.93 6.37"
              style={{
                strokeWidth: 9,
                fill: "none",
                stroke: "#1c3177",
                strokeLinecap: "round",
                strokeMiterlimit: 10,
              }}
            />
            <circle className="cls-11" cx={366.95} cy={729.71} r={17.12} />
            <circle className="cls-11" cx={493.94} cy={691.92} r={17.12} />
            <path
              className="cls-11"
              d="M605.57 329.13c2.69 9.06-4 13.43-13.07 16.13s-17.06 2.7-19.76-6.36a17.13 17.13 0 1 1 32.83-9.77ZM732.55 291.34c2.7 9.07-4 13.43-13.07 16.13s-17.06 2.7-19.76-6.36a17.13 17.13 0 1 1 32.83-9.77Z"
            />
            <path
              d="M690.87 342.83c-.63 8.63-11.11 7.71-26.3 12.23s-22.45 12-28.71 4.14c-8-10 5.73-25.8 20.92-30.32s35.02 1.23 34.09 13.95Z"
              style={{
                fill: "#f774b9",
              }}
            />
            <rect
              x={397.52}
              y={735.45}
              width={86.09}
              height={22.04}
              rx={11.02}
              transform="rotate(-16.57 440.648 746.561)"
              style={{
                fill: "#fff",
              }}
            />
            <path
              className="cls-15"
              d="m744.07 681.76 17.07 30.9M780.34 575.78l31.99-14.93M778.35 632.95l41.25 13.56"
            />
          </g>
        </g>
      </svg>
      <p className="min-h-full text-sm font-medium">
        You are {<span className="text-blue-500 italic">authorised</span>} to
        access this route
      </p>
      <Link
        to="/dashboard"
        className={`${buttonVariants({
          variant: "outline",
          size: "sm",
        })} mt-4`}
      >
        Go to Home
      </Link>
    </div>
  );
};

export default RBARoute;

import React from "react";
import { useRandomInterval, random, range } from "../../hooks/useInterval";

const DEFAULT_COLOR = "yellow";

const generateSparkle = (color) => {
  const sparkle = {
    id: String(random(10000, 99999)),
    createdAt: Date.now(),
    color,
    size: random(10, 20),
    style: {
      top: random(0, 100) + "%",
      left: random(0, 100) + "%",
    },
  };
  return sparkle;
};

const Sparkles = ({ color = DEFAULT_COLOR, children, ...delegated }) => {
  const [sparkles, setSparkles] = React.useState(() => {
    return range(4).map(() => generateSparkle(color));
  });

  useRandomInterval(
    () => {
      const now = Date.now();
      const sparkle = generateSparkle(color);
      const nextSparkles = sparkles.filter((sp) => {
        const delta = now - sp.createdAt;
        return delta < 750;
      });
      nextSparkles.push(sparkle);
      setSparkles(nextSparkles);
    },
    50,
    450
  );

  return (
    <div {...delegated} className="relative w-full inline-block">
      {sparkles.map((sparkle) => (
        <Sparkle
          key={sparkle.id}
          color={sparkle.color}
          size={sparkle.size}
          style={sparkle.style}
        />
      ))}
      <strong className="relative z-[1] font-bold">{children}</strong>
    </div>
  );
};

const Sparkle = ({ size, color = DEFAULT_COLOR, style }) => {
  const path =
    "M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z";
  return (
    <span style={style} className="absolute animate-come-in-out ">
      <svg
        width={size}
        height={size}
        viewBox="0 0 68 68"
        fill="none"
        className="animate-my-spin absolute pointer-events-none z-[2]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={path} fill={color} />
      </svg>
    </span>
  );
};

export default Sparkles;

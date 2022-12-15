import { Chart } from "@/base-components";
import { colors } from "@/utils";
import PropTypes from "prop-types";
import { useRecoilValue } from "recoil";
import { colorScheme as colorSchemeStore } from "@/stores/color-scheme";
import { darkMode as darkModeStore } from "@/stores/dark-mode";
import { useMemo } from "react";
import { useSelector } from "react-redux";

function Main(props) {
  const goal = useSelector((state) => state.goal?.goal?.data?.data[0]?.goalUnits);
  const goalMet = useSelector((state) => state?.paymentSummary?.paymentSummary?.data?.paySummary[0]?.purchasedUnits);

  const goalMetPercent = (goalMet / goal) * 100
  const goalRemainderPercent = 100 - goalMetPercent

  const darkMode = useRecoilValue(darkModeStore);
  const colorScheme = useRecoilValue(colorSchemeStore);

  const chartData = [Number(goalMetPercent), Number(goalRemainderPercent)];
  const chartColors = () => [
    // colors.pending(0.9),
    colors.primary(0.9),
    colors.success(0.9),
   
  ];
  const data = useMemo(() => {
    return {
      labels: ["Goal Met", "Goal Remainder"],
      datasets: [
        {
          data: chartData,
          backgroundColor: colorScheme ? chartColors() : "",
          hoverBackgroundColor: colorScheme ? chartColors() : "",
          borderWidth: 5,
          borderColor: darkMode ? colors.darkmode[700]() : colors.white,
        },
      ],
    };
  });

  const options = useMemo(() => {
    return {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
    };
  });

  return (
    <Chart
      type="pie"
      width={props.width}
      height={props.height}
      data={data}
      options={options}
      className={props.className}
    />
  );
}

Main.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};

Main.defaultProps = {
  width: "auto",
  height: "auto",
  className: "",
};

export default Main;

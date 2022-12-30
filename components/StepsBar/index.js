import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Flex, Text } from "@chakra-ui/react";

export const STEP_STATUS = {
  DONE: "DONE",
  HOLD: "HOLD",
  DOING: "DOING",
};

const STATUS_COLORS = {
  DONE: "green.200",
  HOLD: "gray.200",
  DOING: "blue.200",
};

const StepsBar = (props) => {
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    setSteps(props.steps);
    return () => {
      setSteps([]);
    };
  }, [props.steps]);

  return (
    <Flex align="center">
      {steps.map((step, i) => {
        return renderStep(step, i, steps);
      })}
    </Flex>
  );
};

const renderStep = (step, index, steps) => {
  const barColor =
    step.status !== STEP_STATUS.DONE
      ? STATUS_COLORS[STEP_STATUS.HOLD]
      : STATUS_COLORS[STEP_STATUS.DONE];
  const isLastStep = index === steps.length - 1;
  const barWidth = 100 / (steps.length - 1) - 7;

  return (
    <>
      <Flex direction="column" align="center">
        <Text fontSize="xs">{step.description}</Text>
        <Box
          width="25px"
          height="25px"
          backgroundColor={STATUS_COLORS[step.status]}
          borderRadius="20px"
          marginTop={step.description === "" ? "16px" : "0px"}
        />
      </Flex>
      {!isLastStep && (
        <Box
          width={barWidth + "%"}
          height="1px"
          backgroundColor={barColor}
          marginTop="16px"
        ></Box>
      )}
    </>
  );
};

StepsBar.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      stepIndex: PropTypes.number,
      description: PropTypes.string,
      status: PropTypes.string,
    })
  ),
};

export default StepsBar;

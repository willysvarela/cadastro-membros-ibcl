import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Box, Button } from "@chakra-ui/react";

import Container from "./../components/Container";
import SignUpStepBasicData from "./../components/SignUpSteps/SignUpStepBasicData";
import SignUpStepMemberData from "../components/SignUpSteps/SignUpStepMemberData";
import SignUpStepSkillsData from "./../components/SignUpSteps/SignUpStepSkillsData";
import SignUpStepPhoto from "../components/SignUpSteps/SignUpStepPhoto";
import SignUpRevisionStep from "./../components/SignUpSteps/SignUpRevisionStep";
import SignUpFinalStep from "./../components/SignUpSteps/SignUpFinalStep";
import CardHeader from "../components/CardHeader";
import StepsBar from "../components/StepsBar";
import StepBox from "../components/SignUpSteps/StepBox";

import api from "./../utils/api";

import { STEP_STATUS, API_STATUS } from "../utils/constants";

const STEPS_INDEX = {
  ONE: 0,
  TWO: 1,
  THREE: 2,
  FOUR: 3,
  FIVE: 4,
  SIX: 5,
};

const STEPS = [
  {
    stepIndex: STEPS_INDEX.ONE,
    description: "Dados",
    status: STEP_STATUS.DOING,
  },
  {
    stepIndex: STEPS_INDEX.TWO,
    description: "Ministério",
    status: STEP_STATUS.HOLD,
  },
  {
    stepIndex: STEPS_INDEX.THREE,
    description: "Habilidades",
    status: STEP_STATUS.HOLD,
  },
  {
    stepIndex: STEPS_INDEX.FOUR,
    description: "Foto",
    status: STEP_STATUS.HOLD,
  },
  {
    stepIndex: STEPS_INDEX.FIVE,
    description: "Revisão",
    status: STEP_STATUS.HOLD,
  },
  {
    stepIndex: STEPS_INDEX.SIX,
    description: "Finalizado",
    status: STEP_STATUS.HOLD,
  },
];

const SignUp = (props) => {
  const [steps, setSteps] = useState(STEPS);
  const [currentStep, setCurrentStep] = useState(STEPS_INDEX.FOUR);
  const [dataSteps, setDataSteps] = useState([]);
  const [apiStatus, setApiStatus] = useState(API_STATUS.NONE);

  const [memberData, setMemberData] = useState({});

  useEffect(() => {}, [currentStep]);

  const updateSteps = (newStepIndex, memberData = {}) => {
    const newSteps = steps.map((step) => {
      const status =
        step.stepIndex < newStepIndex
          ? STEP_STATUS.DONE
          : step.stepIndex === newStepIndex
          ? STEP_STATUS.DOING
          : STEP_STATUS.HOLD;
      return { ...step, status };
    });
    setSteps(newSteps);
    setCurrentStep(newStepIndex);
    if (memberData) updateMemberData(memberData);
  };

  const updateMemberData = (memberData) => {
    console.log({ memberData });
    setMemberData((oldData) => ({ ...oldData, ...memberData }));
  };

  const submitMemberData = async (memberData) => {
    const memberSanitized = sanitizeMemberData(memberData);
    console.log({ memberSanitized });

    updateSteps(STEPS_INDEX.SIX);
    setApiStatus(API_STATUS.LOADING);
    try {
      const response = await api.post("/api/member", {
        memberData: memberSanitized,
      });

      if (response.status === 200) {
        setApiStatus(API_STATUS.SUCCESSFUL);
      } else setApiStatus(API_STATUS.ERROR);
    } catch (e) {
      console.log(e);
      setApiStatus(API_STATUS.ERROR);
    }
  };

  const sanitizeMemberData = (data) => {
    const coursesFiltered = data.courses?.filter((course) => course);

    const newCourses = coursesFiltered
      ? [...coursesFiltered, data.otherCourses]
      : [data.otherCourses];
    const newHealthSkills = data.healthSkills?.filter((skill) => skill);
    const newTeachSkills = data.teachSkills?.filter((skill) => skill);
    const newSocialSkills = data.socialSkills?.filter((skill) => skill);
    const newMaintenanceSkills = data.maintenanceSkills?.filter(
      (skill) => skill
    );
    const newHowJoin =
      data.howJoin !== "" && data.howJoin !== "Outro"
        ? data.howJoin
        : data.otherHowJoin;
    //let member = data;
    const {
      courses,
      otherCourses,
      healthSkills,
      socialSkills,
      maintenanceSkills,
      howJoin,
      otherHowJoin,
      ...member
    } = data;
    // delete member.courses;
    // delete member.otherCourses;
    // delete member.healthSkills;
    // delete member.socialSkills;
    // delete member.maintenanceSkills;
    // delete member.howJoin;
    // delete member.otherHowJoin;
    return {
      ...member,
      courses: newCourses,
      healthSkills: newHealthSkills,
      teachSkills: newTeachSkills,
      socialSkills: newSocialSkills,
      maintenanceSkills: newMaintenanceSkills,
      howJoin: newHowJoin,
    };
  };

  return (
    <Container>
      <Box padding="30px">
        <CardHeader />
        <Box marginTop="30px" />
        <StepsBar steps={steps} />
        <Box marginTop="30px" />
        <StepBox
          onClickNext={(memberData) => updateSteps(STEPS_INDEX.TWO, memberData)}
          show={currentStep === STEPS_INDEX.ONE}
          component={SignUpStepBasicData}
        />
        <StepBox
          show={currentStep === STEPS_INDEX.TWO}
          onClickNext={(memberData) =>
            updateSteps(STEPS_INDEX.THREE, memberData)
          }
          onClickBack={() => updateSteps(STEPS_INDEX.ONE)}
          component={SignUpStepMemberData}
        />

        <StepBox
          show={currentStep === STEPS_INDEX.THREE}
          onClickNext={(memberData) =>
            updateSteps(STEPS_INDEX.FOUR, memberData)
          }
          onClickBack={() => updateSteps(currentStep - 1)}
          component={SignUpStepSkillsData}
        />
        <StepBox
          show={currentStep === STEPS_INDEX.FOUR}
          onClickNext={(memberData) =>
            updateSteps(STEPS_INDEX.FIVE, memberData)
          }
          onClickBack={() => updateSteps(currentStep - 1)}
          component={SignUpStepPhoto}
        />
        <StepBox
          show={currentStep === STEPS_INDEX.FIVE}
          onClickNext={() => submitMemberData(memberData)}
          onClickBack={() => updateSteps(currentStep - 1)}
          component={SignUpRevisionStep}
          nextTitle="Enviar"
          memberData={{ ...memberData }}
        />
        {currentStep === STEPS_INDEX.SIX && (
          <SignUpFinalStep
            status={apiStatus}
            onClickBack={() => updateSteps(STEPS_INDEX.ONE)}
          />
        )}
      </Box>
    </Container>
  );
};

SignUp.propTypes = {};

export default SignUp;

import React, { useState, useEffect } from "react"
import { Flex, Box, Text, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, SimpleGrid, Grid, GridItem, RadioGroup, HStack, VStack, Stack, Radio, Select, Checkbox } from "@chakra-ui/react"
import { Controller, useFormContext, useFormState } from "react-hook-form";

''
const healthSkills = ["Medicina", "Tec. Enfermagem", "Nutricionista", "Fisioterapeuta", "Farmacêutico", "Psicologia", "Odontologia"];
const teachSkills = ["Professor de Português", "Idiomas", "geografia", "Música", "Pedagogia"];
const socialSkills = ["Assistência Social", "Advogado", "Administrador", "Contabilidade"];
const maintenanceSkills = ["Eletricista", "Soldador", "Mecânico", "Marceneiro", "Carpinteiro", "Pedreiro", "Pintor"];

const SignUpStepSkillsData = props => {
    const { register, control } = useFormContext();
    const { errors } = useFormState();

    return (
        <Box>
            <Box>
            </Box>
            <Grid templateColumns={{sm: "repeat(6, 1fr)", md: "repeat(6, 1fr)", }} gap={6}>
                <GridItem colSpan={6}>
                    <SkillInputGroup skillName="Saúde" skills={healthSkills} fieldName="healthSkills"/>
                </GridItem>
                <GridItem colSpan={6}>
                    <SkillInputGroup skillName="Ensino" skills={teachSkills} fieldName="teachSkills"/>
                </GridItem>
                <GridItem colSpan={6}>
                    <SkillInputGroup skillName="Social" skills={socialSkills} fieldName="socialSkills"/>
                </GridItem>
                    
                <GridItem colSpan={6}>
                    <SkillInputGroup skillName="Manutenção" skills={maintenanceSkills} fieldName="maintenanceSkills"/>
                </GridItem>
                <GridItem colSpan={6}>
                <FormControl id="otherSkills">
                    <FormLabel>Tem habilidades diferentes das acima? Escreva aqui:</FormLabel>
                    <Input id="otherSkills" type="text" {...register('otherSkills')} />
                </FormControl>
                </GridItem>

            </Grid>
        </Box>
    )
}

const SkillInputGroup = props => {
    const { register } = useFormContext();
    const [otherSkillFieldName, setOtherSkillFieldName] = useState("skill");

    useEffect(() => {
        setOtherSkillFieldName("");
    }, [props.fieldName, props.skills.length]);
    
    return (
        <Box>
            <Text>{props.skillName}</Text>
            <Flex flexWrap="wrap">
                {
                    props.skills.map((skill, i) =>( 
                        <Checkbox key={skill} value={skill}
                            {...register(`${props.fieldName}[${i}]`)} margin="10px"
                        >
                            {skill}
                        </Checkbox>))
                }
            </Flex>
            <FormControl id={otherSkillFieldName}>
                <FormLabel>Outras habilidades na área de {props.skillName}? Escreva aqui:</FormLabel>
                <Input id={otherSkillFieldName} type="text" {...register(`${props.fieldName}[${props.skills.length}]`)} />
            </FormControl>
        </Box>
    )
}


export default SignUpStepSkillsData

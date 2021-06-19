import React from "react"
import { Flex, Box, Text, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, SimpleGrid, Grid, GridItem, RadioGroup, HStack, VStack, Stack, Radio, Checkbox } from "@chakra-ui/react"
import { Controller, useFormContext, useFormState } from "react-hook-form";

const COURSES = ["Leite", "Pão", "Carne", "Peixe", "Introd. à Vida Cristã", "Um Com Deus",  "Introd. à Bíblia", "8 Qualidades de Cristo"];

const SignUpStep2 = props => {
    const { register, control } = useFormContext();
    const { errors } = useFormState();

    return (
        <Box>
            <Box>
            </Box>
            <Grid templateColumns={{sm: "repeat(6, 1fr)", md: "repeat(6, 1fr)", }} gap={6}>
                <GridItem colSpan={6}>
                    <FormControl as="fieldset">
                        <FormLabel as="legend">Como se tornou membro da IBCL:</FormLabel>
                        <Controller
                            name="howJoin"
                            control={control} 
                            render={({ field }) => (
                                <RadioGroup {...field} name="howJoin">
                                    <Flex flexWrap="wrap" justifyContent="space-between">
                                        <Radio name="howJoin" value="Batismo">Batismo</Radio>
                                        <Radio name="howJoin" value="Aclamação">Aclamação</Radio>
                                        <Radio name="howJoin" value="Carta">Carta de Transferência</Radio><br/>
                                        <Radio name="howJoin" value="Outro">Outro</Radio>
                                    </Flex>
                                </RadioGroup>
                            )}
                        />
                    </FormControl>
                </GridItem>

                <GridItem colSpan={6}>
                    <FormControl id="otherHowJoin" isInvalid={errors.otherHowJoin}>
                        <FormLabel>Outro:</FormLabel>
                        <Input id="otherHowJoin" type="text" {...register("otherHowJoin")} />
                        <FormErrorMessage>
                            {errors.otherHowJoin && errors.otherHowJoin.message}
                        </FormErrorMessage>
                    </FormControl>
                </GridItem>

                <GridItem colSpan={6}>
                    <FormControl as="fieldset">
                        <FormLabel as="legend">Qual culto você mais frequenta?</FormLabel>
                        <Controller
                            name="favoriteReunion"
                            control={control} 
                            render={({ field }) => (
                                <RadioGroup {...field} name="favoriteReunion">
                                    <Flex flexWrap="wrap" justifyContent="space-evenly">
                                        <Radio name="favoriteReunion" value="Matinal">Matinal</Radio>
                                        <Radio name="favoriteReunion" value="Tarde">À Tarde</Radio>
                                        <Radio name="favoriteReunion" value="Noite">À Noite</Radio>
                                    </Flex>
                                </RadioGroup>
                            )}
                        />
                    </FormControl>
                </GridItem>

                <GridItem colSpan={6}>
                    <FormControl id="ministries" isInvalid={errors.ministries}>
                        <FormLabel>Participa de algum ministério? Se sim, escreva quais:</FormLabel>
                        <Input id="ministries" type="text" {...register("ministries")} />
                        <FormErrorMessage>
                            {errors.ministries && errors.ministries.message}
                        </FormErrorMessage>
                    </FormControl>
                </GridItem>

                <GridItem colSpan={6}>
                    <FormControl id="intendedMinistries" isInvalid={errors.intendedMinistries}>
                        <FormLabel>Em quais ministérios você gostaria de participar?</FormLabel>
                        <Input id="intendedMinistries" type="text" {...register("intendedMinistries")} />
                        <FormErrorMessage>
                            {errors.intendedMinistries && errors.intendedMinistries.message}
                        </FormErrorMessage>
                    </FormControl>
                </GridItem>

                <GridItem colSpan={6}>
                    <FormControl as="fieldset">
                        <FormLabel as="legend">De qual departamento você faz parte?</FormLabel>
                        <Controller
                            name="favoriteReunion"
                            control={control} 
                            render={({ field }) => (
                                <RadioGroup {...field}>
                                    <HStack spacing="24px">
                                        <Radio name="favoriteReunion" value="Kids">Kids</Radio>
                                        <Radio name="favoriteReunion" value="Teens">Teens</Radio>
                                        <Radio name="favoriteReunion" value="Jovens">Jovens</Radio>
                                    </HStack>
                                        <Radio name="favoriteReunion" value="Mulheres+">Mulheres+</Radio>
                                        <Radio name="favoriteReunion" value="Casais">Casais</Radio>
                                        <Radio name="favoriteReunion" value="Maturidade">Maturidade</Radio>
                                </RadioGroup>
                            )}
                        />
                    </FormControl>
                </GridItem>

                <GridItem colSpan={6}>
                    <FormControl id="courses" isInvalid={errors.courses}>
                        <FormLabel>Marque os cursos do seminários já feitos por você:</FormLabel>
                            <Flex flexWrap="wrap" justifyContent="space-evenly">
                            {
                                COURSES.map((course, i) => (
                                    <Checkbox key={i} value={course}
                                        {...register(`courses[${i}]`)} margin="10px"
                                    >
                                        {course}
                                    </Checkbox>
                                ))
                            }
                            </Flex>
                    </FormControl>
                </GridItem>

                <GridItem colSpan={6}>
                    <FormControl id="otherCourses" isInvalid={errors.otherCourses}>
                        <FormLabel>Fez outros cursos além dos acima? Escreva aqui:</FormLabel>
                        <Input id="otherCourses" type="text" {...register("otherCourses")} />
                        <FormErrorMessage>
                            {errors.otherCourses && errors.otherCourses.message}
                        </FormErrorMessage>
                    </FormControl>
                </GridItem>

            </Grid>
        </Box>
    )
}

export default SignUpStep2

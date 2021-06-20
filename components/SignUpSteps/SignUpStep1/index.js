import React from "react"
import { Box, Text, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, SimpleGrid, Grid, GridItem, RadioGroup, Stack, Radio, Select } from "@chakra-ui/react"
import { Controller, useFormContext, useFormState } from "react-hook-form";

const SignUpStep1 = props => {
    const { register, control } = useFormContext();
    const { errors } = useFormState();

    return (
        <Box>
            <Box>
            </Box>
            <Grid templateColumns={{sm: "repeat(6, 1fr)", md: "repeat(6, 1fr)", }} gap={6}>
                <GridItem colSpan={6}>
                    <FormControl id="name" isInvalid={errors.name}>
                        <FormLabel>Nome</FormLabel>
                        <Input id="name" type="text" {...register("name", {required: "Campo obrigatório", maxLength: 256})} />
                        <FormErrorMessage>
                            {errors.name && errors.name.message}
                        </FormErrorMessage>
                    </FormControl>
                </GridItem>

                <GridItem colSpan={3}>
                    <FormControl id="birthDate" isInvalid={errors.birthDate}>
                        <FormLabel>Data de Nascimento</FormLabel>
                        <Input id="birthDate" type="date" {...register("birthDate", {required: "Campo obrigatório"})} />
                        <FormErrorMessage>
                            {errors.birthDate && errors.birthDate.message}
                        </FormErrorMessage>
                    </FormControl>
                </GridItem>

                <GridItem colSpan={3}>
                    <FormControl as="fieldset">
                        <FormLabel as="legend">Sexo</FormLabel>
                        <Controller
                            name="gender"
                            control={control} 
                            render={({ field }) => (
                                <RadioGroup {...field}>
                                    <Stack spacing="24px">
                                        <Radio name="gender" value="M">Masculino</Radio>
                                        <Radio name="gender" value="F">Feminino</Radio>
                                    </Stack>
                                </RadioGroup>
                            )}
                        />
                    </FormControl>
                </GridItem>

                <GridItem colSpan={6}>
                    <FormControl id="civilState" isInvalid={errors.civilState}>
                        <FormLabel>Estado Civíl</FormLabel>
                        <Controller
                            name="civilState"
                            control={control}
                            defaultValue="Casado"
                            render={({ field }) => (
                                <Select {...field}>
                                    <option name="civilState" value="Casado">Casado</option>
                                    <option name="civilState" value="Solteiro">Solteiro</option>
                                    <option name="civilState" value="Viúvo">Viúvo</option>
                                </Select>
                            )}
                        />
                    </FormControl>
                </GridItem>

                <GridItem colSpan={6}>
                    <FormControl id="fatherName" isInvalid={errors.fatherName}>
                        <FormLabel>Nome do Pai</FormLabel>
                        <Input id="fatherName" type="text" {...register("fatherName", {maxLength: 256})} />
                        <FormErrorMessage>
                            {errors.fatherName && errors.fatherName.message}
                        </FormErrorMessage>
                    </FormControl>
                </GridItem>

                <GridItem colSpan={6}>
                    <FormControl id="motherName" isInvalid={errors.motherName}>
                        <FormLabel>Nome da Mãe</FormLabel>
                        <Input id="motherName" type="text" {...register("motherName", {required: "Campo obrigatório", maxLength: 256})} />
                        <FormErrorMessage>
                            {errors.motherName && errors.motherName.message}
                        </FormErrorMessage>
                    </FormControl>
                </GridItem>

                <GridItem colSpan={6}>
                    <FormControl id="address" isInvalid={errors.address}>
                        <FormLabel>Endereço</FormLabel>
                        <Input id="address" type="text" {...register("address", {required: "Campo obrigatório"})} />
                        <FormErrorMessage>
                            {errors.address && errors.address.message}
                        </FormErrorMessage>
                    </FormControl>
                </GridItem>

                <GridItem colSpan={1}>
                    <FormControl id="addressNumber" isInvalid={errors.addressNumber}>
                        <FormLabel>Número</FormLabel>
                        <Input id="addressNumber" type="text" {...register("addressNumber", {required: "Campo obrigatório", maxLength: 16})} />
                        <FormErrorMessage>
                            {errors.addressNumber && errors.addressNumber.message}
                        </FormErrorMessage>
                    </FormControl>
                </GridItem>

                <GridItem colSpan={5}>
                    <FormControl id="district" isInvalid={errors.district}>
                        <FormLabel>Bairro</FormLabel>
                        <Input id="district" type="text" {...register("district", {required: "Campo obrigatório", maxLength: 100})} />
                        <FormErrorMessage>
                            {errors.district && errors.district.message}
                        </FormErrorMessage>
                    </FormControl>
                </GridItem>

                <GridItem colSpan={6}>
                    <FormControl id="phone" isInvalid={errors.phone}>
                        <FormLabel>Telefone</FormLabel>
                        <Input id="phone" type="phone" {...register("phone", {required: "Campo obrigatório", maxLength: 30})} />
                        <FormErrorMessage>
                            {errors.phone && errors.phone.message}
                        </FormErrorMessage>
                    </FormControl>
                </GridItem>

                <GridItem colSpan={6}>
                    <FormControl id="email" isInvalid={errors.email}>
                        <FormLabel>Email</FormLabel>
                        <Input id="email" type="email" {...register("email", {required: "Campo obrigatório", maxLength: 256})} />
                        <FormErrorMessage>
                            {errors.email && errors.email.message}
                        </FormErrorMessage>
                    </FormControl>
                </GridItem>

                <GridItem colSpan={6}>
                    <FormControl id="socialNetwork" isInvalid={errors.socialNetwork}>
                        <FormLabel>Facebook/Instagram (@)</FormLabel>
                        <Input id="socialNetwork" type="text" {...register("socialNetwork", {required: "Campo obrigatório", maxLength: 100})} />
                        <FormErrorMessage>
                            {errors.socialNetwork && errors.socialNetwork.message}
                        </FormErrorMessage>
                    </FormControl>
                </GridItem>
            </Grid>
        </Box>
    )
}

export default SignUpStep1

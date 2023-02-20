import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Link from "next/link";

import {
  Box,
  Grid,
  Heading,
  GridItem,
  Text,
  Flex,
  Button,
} from "@chakra-ui/react";

import ReactLoading from "react-loading";
import ErrorIcon from "../../IconsAnimated/ErrorIcon";
import SuccessfulIcon from "../../IconsAnimated/SuccessfulIcon";

import { API_STATUS } from "../../../utils/constants";


function SignUpRevisionStep(props) {
  return (
    <Box
      marginTop="20px"
      height={{ sm: "100%", md: "300px" }}
      minHeight="300px"
    >
      <Flex
        textAlign="center"
        marginTop="20px"
        justifyContent="space-around"
        flexDirection="column"
        height="100%"
        minHeight="300px"
      >
        <Heading size="md" textAlign="center">
          Cadastro Finalizado
        </Heading>
        {props.status === API_STATUS.NONE && <Box />}
        {props.status === API_STATUS.LOADING && (
          <>
            <Flex justifyContent="center">
              <ReactLoading
                height="200px"
                type="spinningBubbles"
                width="200px"
                color="#123123"
              />
            </Flex>
            <Text>Enviando Dados...</Text>
          </>
        )}
        {props.status === API_STATUS.SUCCESSFUL && (
          <>
            <SuccessfulIcon />
            <Text>
              Seu cadastro foi finalizado com sucesso! Muito obrigado por
              preencher os dados!
            </Text>
            <Text>Fique ligado às novidades no site da IBCL</Text>
            <a
              href="https://www.ibcentralleste.com.br"
              target="_blank"
              rel="noreferrer"
            >
              <Button>Acessar Site</Button>
            </a>
          </>
        )}
        {props.status === API_STATUS.ERROR && (
          <>
            <ErrorIcon />
            <Text>
              Por favor, tente preencher novamente. Se o erro persistir, entre
              em contato com a secretaria da Igreja.
            </Text>
            <Button onClick={props.onClickBack}>Preencher Novamente</Button>
          </>
        )}
      </Flex>
    </Box>
  );
}

SignUpRevisionStep.propTypes = {};

export default SignUpRevisionStep;

import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";

//Third party libraries
import toast, { Toaster } from "react-hot-toast";

//Context
import { AuthContext } from "@/context/AuthContext";

//Mui components
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Skeleton from "@mui/material/Skeleton";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import DialogTitle from "@mui/material/DialogTitle";

//Formatters
import { formatCpf, formatarTelefone } from "@/helpers/utils";

//Icons
import EditIcon from "@mui/icons-material/Edit";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockResetIcon from "@mui/icons-material/LockReset";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import WarningNoDataFound from "@/components/WarningNoDataFound";

export default function Entregas() {
  const { user } = useContext(AuthContext);

  return (
    <Container>
      <Toaster position="bottom-center" reverseOrder={true} />
    </Container>
  );
}

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { login } from "../../api/authService";

type FormValues = { username: string; password: string; }

const schema = yup.object
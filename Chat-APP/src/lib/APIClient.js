import axios from "axios";
import { HOST } from "@/Utilities/Constant";
export const APIClient=axios.create({
    baseURL:HOST,
})
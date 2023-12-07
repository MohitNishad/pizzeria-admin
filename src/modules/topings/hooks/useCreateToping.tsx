import { useMutation } from "@tanstack/react-query";
import { promiseToast } from "@/lib/toast";
import axios from "@/lib/axios";
import { AxiosError } from "axios";
import { BackendError } from "@/types/Error";

async function createToping(data: any): Promise<string> {
    const promise = axios
        .post("/toping/create", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((res) => res.data);
    promiseToast(
        promise,
        "creating product",
        "successfully created toping",
        (err: AxiosError<BackendError>) => `${err.response?.data.error}`
    );
    return await promise;
}

export function useCreateToping() {
    return useMutation({
        mutationKey: ["toping", "create"],
        mutationFn:createToping,
    });
}

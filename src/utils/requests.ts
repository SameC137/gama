import axios, { AxiosResponse } from "axios";

interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
}

export interface ErrorMessage {
  message: string;
  status?: number;
}
export const handleErrors = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  requestHandler: () => Promise<AxiosResponse<any, any>>
) => {
  try {
    const response = await requestHandler();
    return response;
  } catch (error) {
    if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
      const errorMessage: ErrorMessage = {
        status: error.status,
        message: error.message,
      };
      return errorMessage;
    } else {
      console.log(error);
      return {
        message:"Error occurred"
      }
    }
  }
};


export function isError(resp: object): resp is ErrorMessage {
    return (resp as ErrorMessage).message !== undefined;
  }

export const fetchRecent = () => {
  return axios({
    method: "GET",
    headers:{
        "Content-Type":"application/json",
    },
    url: `${process.env.NEXT_PUBLIC_API_URL}/recent-movies`,
  });
};

export const fetchBoxOffice = () => {
  return axios({
    method: "GET",
    headers:{
        "Content-Type":"application/json",
    },
    url: `${process.env.NEXT_PUBLIC_API_URL}/box-office-movies`,
  });
};

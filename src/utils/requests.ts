import axios, { AxiosResponse } from "axios";


export class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message)
    this.name = 'APIError'
  }
}



export const axiosInstance=axios.create({
    baseURL:process.env.NEXT_PUBLIC_API_URL
})



export const fetcher= async(key:string)=> {
  try {
    const response = await axiosInstance.get(key)
    // await new Promise(resolve => setTimeout(resolve, 5000))
    return response.data
  } catch (error) {
    if (error instanceof APIError) {
      console.log(error)
      throw error
    }
    console.log(error)
    throw new APIError('Failed to fetch')
  }
}


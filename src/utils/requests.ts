import axios from "axios"


export const fetchRecent= ()=>{
    return axios({
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_API_URL}/recent-movies`,
      })
}

export const fetchBoxOffice= ()=>{
    return axios({
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_API_URL}/box-office-movies`,
      })
}
import axios from "axios"
import { refreshUrl } from "../variables/urls"

export const handleRequestWithAccessToken = async (method: string, url: string, data: any, access_token: string, refresh_token: string) => {
  const res = await axios({
    method,
    url,
    data,
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })
  if (res.status === 200) {
    return res.data
  }
  else {
    const _res = await axios({
      method: "POST",
      url: refreshUrl,
      headers: {
        Authorization: `Bearer ${refresh_token}`
      }
    })
  }
}
import { dataTraCau } from '@/types/typechat'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function getDictionary(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiKey = process.env.DIC_API_KEY
  const url = `https://api.tracau.vn/${apiKey}/s/'${req.body}'/en`
  console.log(url)
  try {
    const response = await fetch(url)
    let data:dataTraCau = await response.json()
  
    res.status(200).json({ data })
  } catch (error) {
    res.status(500).json({ error })
  }
}
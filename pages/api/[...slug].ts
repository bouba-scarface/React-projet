import { NextApiRequest, NextApiResponse } from "next";
export default function handler(req, res) {
    const { slug } = req.body
    res.end(`Post: ${slug.join(', ')}`)
   
  }
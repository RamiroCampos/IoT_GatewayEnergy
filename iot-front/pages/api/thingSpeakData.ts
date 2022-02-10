// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import thingSpeakApi from "../../config/axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { data } = await thingSpeakApi.get("/feeds.json?average=daily");
    const thingSpeakData: any[] = data.feeds.filter(
      (obj: any) => obj.field1 !== null
    );
    res.status(200).json({ data: thingSpeakData });
  } catch (e) {
    res.status(400).json({ error: "Erro ao buscar dados!" });
  }
}

import {getSession} from "next-auth/client";

async function handler(req, res) {
  if (req.method !== 'GET') {
    return;
  }

  const session = await getSession({req: req});
  if (!session) {
    res.status(401).json({message: 'Not authenticated!'});
    return;
  }

  res.status(200).json(
    [
      {
        code: 1,
        name: 'Product1',
        desc: 'A new product'
      },
      {
        code: 2,
        name: 'Product2',
        desc: 'A new product2'
      }
    ]);
}

export default handler;

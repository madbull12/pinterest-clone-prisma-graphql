import { ApolloServer } from 'apollo-server-micro'
import { schema } from '../../graphql/schema'
import { resolvers } from '../../graphql/resolvers'
// import Cors from 'micro-cors'
import { createContext } from '../../graphql/context'
import { NextApiRequest, NextApiResponse } from 'next'

// const cors = Cors()

const apolloServer = new ApolloServer({ schema, resolvers,context: createContext })

const startServer = apolloServer.start()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
      "Access-Control-Allow-Origin",
      "https://studio.apollographql.com"
  );
  res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Access-Control-Allow-Headers"
  );
  res.setHeader(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, PATCH, DELETE, OPTIONS, HEAD"
  );
  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};

// export default cors(async function handler(req, res) {
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.setHeader(
//       "Access-Control-Allow-Origin",
//       "https://studio.apollographql.com"
//   );
//   res.setHeader(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Access-Control-Allow-Headers"
//   );
//   res.setHeader(
//       "Access-Control-Allow-Methods",
//       "POST, GET, PUT, PATCH, DELETE, OPTIONS, HEAD"
//   );
//   if (req.method === 'OPTIONS') {
//     res.end()
//     return false
//   }
//   await startServer

//   await apolloServer.createHandler({
//     path: '/api/graphql',
//   })(req, res)
// })

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// }
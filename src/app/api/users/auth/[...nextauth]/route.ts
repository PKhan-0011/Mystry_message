import NextAuth from "next-auth";
import { authOption } from "./option";

const handler = NextAuth(authOption);

export {handler as GET, handler as POST};

// itna karne k baad hame middleware p janna chaiye okkh!...
// middleware p jate hai iske baad okkh!..




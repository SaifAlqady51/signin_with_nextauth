import { getServerSession } from "next-auth"
import {User} from '../components/User'

export default async function Home() {
  const session = await getServerSession();


  return (
    <div>
      <h1>Server Side Rendered</h1>
      {/* example of server rendering */}
      <pre>{JSON.stringify(session)}</pre>
      {/* example of client rendering*/}
      <h1>Client Side Rendered</h1>
      <User />
    </div>
  )
}

import { getServerSession } from "next-auth"
import {User} from '../components/User'

export default async function Home() {
  const session = await getServerSession();


  return (
    <div>
      <h1>Server Side Rendering</h1>
      {/* example of server rendering */}
      <pre>{JSON.stringify(session)}</pre>
      {/* example of client rendering*/}
      <User />
    </div>
  )
}

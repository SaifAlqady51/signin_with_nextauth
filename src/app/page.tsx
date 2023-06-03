import { getServerSession } from "next-auth"

export default async function Home() {
  const session = await getServerSession();


  return (
    <div>
      <h1>Server Side Rendering</h1>
      <pre>{JSON.stringify(session)}</pre>
    </div>
  )
}

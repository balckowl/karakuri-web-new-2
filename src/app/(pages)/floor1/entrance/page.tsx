import EntranceComponent from "~/app/pageComponents/floor1/entranceComponent"
import { getServerAuthSession } from "~/server/auth"

const Entrance = async () => {

  const session = await getServerAuthSession()

  return (
    <>
      {session?.user.name && (
        <EntranceComponent username={session?.user.name} userId={session.user.id} />
      )}
    </>
  )
}

export default Entrance    
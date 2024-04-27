import BathroomComponent from "~/app/pageComponents/floor1/bathroomComponent"
import { getServerAuthSession } from "~/server/auth"

const Bathroom = async () => {

  const session = await getServerAuthSession()

  return (
    <>
      {session?.user.id && (
        <BathroomComponent userId={session?.user.id} />
      )}
    </>
  )
}

export default Bathroom
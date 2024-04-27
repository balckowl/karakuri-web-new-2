import SocialroomComponent from "~/app/pageComponents/floor1/socialroomComponent"
import { getServerAuthSession } from "~/server/auth"

const Socialroom = async () => {

  const session = await getServerAuthSession()

  return (
    <>
      {session?.user.id && (
        <SocialroomComponent userId={session?.user.id} />
      )}
    </>
  )
}

export default Socialroom


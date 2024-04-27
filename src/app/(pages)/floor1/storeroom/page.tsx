import StoreroomComponent from "~/app/pageComponents/floor1/storeroomComponent"
import { getServerAuthSession } from "~/server/auth"

const Storeroom = async () => {

    const session = await getServerAuthSession()

    return (
        <>
            {session?.user.id && (
                <StoreroomComponent userId={session?.user.id} />
            )}
        </>
    )
}

export default Storeroom 
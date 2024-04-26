import CafeteriaComponent from "~/app/pageComponents/floor1/cafeteriaComponent"
import { getServerAuthSession } from "~/server/auth"


const Cafeteria = async () => {

    const session = await getServerAuthSession()

    return (
        <>
            {session?.user.id && (
                <CafeteriaComponent userId={session?.user.id} />
            )}
        </>
    )
}

export default Cafeteria
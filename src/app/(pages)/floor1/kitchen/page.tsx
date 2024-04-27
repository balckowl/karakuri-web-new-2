import KitchenComponent from "~/app/pageComponents/floor1/kitchenComponent"
import { getServerAuthSession } from "~/server/auth"

const Kitchen = async () => {

    const session = await getServerAuthSession()

    return (
        <>
            {session?.user.id && (
                <KitchenComponent userId={session?.user.id}/>
            )}
        </>
    )
}

export default Kitchen
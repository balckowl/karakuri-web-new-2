"use client"
import { useEffect } from "react";
import { usePlayerDataStore } from "~/store/playerDataStore";
import LeftArrow from "~/app/_components/elements/roomChangeArrow/leftArrow/leftArrow";
import UpArrow from "~/app/_components/elements/roomChangeArrow/upArrow/upArrow";
import NothingBase from "~/app/_components/layout/roomBase/nothingBase";
import Belongings from "~/app/_components/elements/belongings/belongings";
import Floor1Map from "~/app/_components/elements/floormap/floor1/floor1Map";

const CafeteriaComponent = ({ userId }: { userId: string }) => {
    const { setPlayerData } = usePlayerDataStore();
    // 現在位置の更新
    useEffect(() => {
        setPlayerData({ currentRoom: "cafeteria" })
    }, [setPlayerData])

    return (
        <div>
            <UpArrow floor={1} hrefProps={"kitchen"} />
            <LeftArrow floor={1} hrefProps={"entrance"} />

            <NothingBase currentRoom={"cafeteria"} />

            <Floor1Map />
            <Belongings />
        </div>
    )
}

export default CafeteriaComponent
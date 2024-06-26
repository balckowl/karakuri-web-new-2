"use client"
import React, { useEffect } from "react"
import Belongings from "~/app/_components/elements/belongings/belongings";
import Floor1Map from "~/app/_components/elements/floormap/floor1/floor1Map";
import RightArrow from "~/app/_components/elements/roomChangeArrow/rightArrow/rightArrow"
import ItemBase from "~/app/_components/layout/roomBase/itemBase"
import { usePlayerDataStore } from "~/store/playerDataStore";

const StoreroomComponent = ({ userId }: { userId: string }) => {
    const { setPlayerData } = usePlayerDataStore();
    // 現在位置の更新
    useEffect(() => {
        setPlayerData(
            {
                currentRoom: "storeroom",
            }
        )
    }, [setPlayerData])

    return (
        <div>
            <RightArrow floor={1} hrefProps={"socialroom"} />

            <ItemBase currentRoom={"storeroom"} />

            <Floor1Map />
            <Belongings />
        </div>
    )
}

export default StoreroomComponent
"use client"
import UpArrow from "~/app/_components/elements/roomChangeArrow/upArrow/upArrow"
import LeftArrow from "~/app/_components/elements/roomChangeArrow/leftArrow/leftArrow"
import RightArrow from "~/app/_components/elements/roomChangeArrow/rightArrow/rightArrow"
import ProbBase from "~/app/_components/layout/roomBase/probBase"
import Belongings from "~/app/_components/elements/belongings/belongings"
import { usePlayerDataStore } from "~/store/playerDataStore"
import { useCallback, useEffect } from "react"

import ProbClearAlert from "~/app/_components/elements/probClearAlert/probClearAlert"
import EntranceSendingText from "~/features/sendingText/entranceSendingText"
import Floor1Map from "~/app/_components/elements/floormap/floor1/floor1Map"
import { api } from "~/trpc/react"
import { useRouter } from "next/navigation"


const EntranceComponent = ({ username, userId }: { username: string, userId: string }) => {
  const router = useRouter()

  const { playerData } = usePlayerDataStore();
  const entranceData = api.entrance.getEntranceData.useQuery({ userId: userId })
  const updateCurrentRoom = api.floor.updateCurrentRoom.useMutation({ onSuccess: () => {void router.refresh()}})

  console.log(entranceData.data)
  const handleEnterRoom = () => {
    updateCurrentRoom.mutate({
      userId: userId,
      room: "entrance",
    })
  }

  // 現在位置の更新
  useCallback(() => {
    handleEnterRoom()
    // setPlayerData(
    //   {
    //     currentRoom: "entrance",
    //     entrance: {
    //       ...playerData.entrance,
    //       isFirstClear: false,
    //     }
    //   }
    // )
  }, [])

  return (
    <div>
      {entranceData.data?.entrance && <EntranceSendingText userId={userId} username={username} eventIndex={entranceData.data?.entrance?.eventIndex}/>}

      <UpArrow floor={1} hrefProps={"socialroom"} />
      <RightArrow floor={1} hrefProps={"cafeteria"} />
      <LeftArrow floor={1} hrefProps={"bathroom"} />

      <Floor1Map />
      <Belongings />
      {entranceData.data?.entrance && <ProbBase event0Finished={entranceData.data?.entrance?.event0Finished} currentRoom={"entrance"} />}

      {playerData.entrance.isFirstClear &&
        <ProbClearAlert />
      }
    </div>
  )
}

export default EntranceComponent
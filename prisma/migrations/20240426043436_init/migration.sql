-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "currentRoom" TEXT DEFAULT 'login',
    "belonging" TEXT DEFAULT '',
    "progress" INTEGER DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "MovableRoom" (
    "roomId" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "roomName" TEXT NOT NULL,

    CONSTRAINT "MovableRoom_pkey" PRIMARY KEY ("roomId")
);

-- CreateTable
CREATE TABLE "Belonging" (
    "belongingId" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "belongingName" TEXT NOT NULL,

    CONSTRAINT "Belonging_pkey" PRIMARY KEY ("belongingId")
);

-- CreateTable
CREATE TABLE "IsGetItems" (
    "isGetItemId" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "scrollBar" BOOLEAN NOT NULL DEFAULT false,
    "woodenBoard" BOOLEAN NOT NULL DEFAULT false,
    "stone" BOOLEAN NOT NULL DEFAULT false,
    "branchAndRope" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "IsGetItems_pkey" PRIMARY KEY ("isGetItemId")
);

-- CreateTable
CREATE TABLE "Elevator" (
    "elevatorId" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "eventIndex" INTEGER NOT NULL DEFAULT 0,
    "event0Finished" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Elevator_pkey" PRIMARY KEY ("elevatorId")
);

-- CreateTable
CREATE TABLE "Entrance" (
    "entranceId" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "isFitScrollbar" BOOLEAN NOT NULL DEFAULT false,
    "eventIndex" INTEGER NOT NULL DEFAULT 0,
    "event0Finished" BOOLEAN NOT NULL DEFAULT false,
    "isFirstClear" BOOLEAN NOT NULL DEFAULT false,
    "isClear" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Entrance_pkey" PRIMARY KEY ("entranceId")
);

-- CreateTable
CREATE TABLE "Bathroom" (
    "bathroomId" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "eventIndex" INTEGER NOT NULL DEFAULT 0,
    "event0Finished" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Bathroom_pkey" PRIMARY KEY ("bathroomId")
);

-- CreateTable
CREATE TABLE "Cafeteria" (
    "cafeteriaId" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "eventIndex" INTEGER NOT NULL DEFAULT 0,
    "event0Finished" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Cafeteria_pkey" PRIMARY KEY ("cafeteriaId")
);

-- CreateTable
CREATE TABLE "Kitchen" (
    "kitchenId" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "isClickRock" BOOLEAN NOT NULL DEFAULT false,
    "eventIndex" INTEGER NOT NULL DEFAULT 0,
    "event0Finished" BOOLEAN NOT NULL DEFAULT true,
    "isFirstClear" BOOLEAN NOT NULL DEFAULT false,
    "isClear" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Kitchen_pkey" PRIMARY KEY ("kitchenId")
);

-- CreateTable
CREATE TABLE "SocialRoom" (
    "socialRoomId" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "isLighting" BOOLEAN NOT NULL DEFAULT false,
    "eventIndex" INTEGER NOT NULL DEFAULT 0,
    "event0Finished" BOOLEAN NOT NULL DEFAULT false,
    "isFirstClear" BOOLEAN NOT NULL DEFAULT false,
    "isClear" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "SocialRoom_pkey" PRIMARY KEY ("socialRoomId")
);

-- CreateTable
CREATE TABLE "StoreRoom" (
    "storeRoomId" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "eventIndex" INTEGER NOT NULL DEFAULT 0,
    "event0Finished" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "StoreRoom_pkey" PRIMARY KEY ("storeRoomId")
);

-- CreateIndex
CREATE INDEX "Post_name_idx" ON "Post"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "IsGetItems_userId_key" ON "IsGetItems"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Elevator_userId_key" ON "Elevator"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Entrance_userId_key" ON "Entrance"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Bathroom_userId_key" ON "Bathroom"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Cafeteria_userId_key" ON "Cafeteria"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Kitchen_userId_key" ON "Kitchen"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SocialRoom_userId_key" ON "SocialRoom"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "StoreRoom_userId_key" ON "StoreRoom"("userId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovableRoom" ADD CONSTRAINT "MovableRoom_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Belonging" ADD CONSTRAINT "Belonging_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IsGetItems" ADD CONSTRAINT "IsGetItems_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Elevator" ADD CONSTRAINT "Elevator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entrance" ADD CONSTRAINT "Entrance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bathroom" ADD CONSTRAINT "Bathroom_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cafeteria" ADD CONSTRAINT "Cafeteria_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kitchen" ADD CONSTRAINT "Kitchen_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialRoom" ADD CONSTRAINT "SocialRoom_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreRoom" ADD CONSTRAINT "StoreRoom_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

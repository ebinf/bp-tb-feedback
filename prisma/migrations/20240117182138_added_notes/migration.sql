-- CreateTable
CREATE TABLE "Note" (
    "id" SERIAL NOT NULL,
    "group_id" INTEGER NOT NULL,
    "author_id" TEXT NOT NULL,
    "edited" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "note" TEXT NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Note_id_key" ON "Note"("id");

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

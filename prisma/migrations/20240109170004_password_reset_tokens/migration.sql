-- CreateTable
CREATE TABLE "PasswordResetTokens" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PasswordResetTokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetTokens_id_key" ON "PasswordResetTokens"("id");

-- CreateIndex
CREATE INDEX "PasswordResetTokens_user_id_idx" ON "PasswordResetTokens"("user_id");

-- AddForeignKey
ALTER TABLE "PasswordResetTokens" ADD CONSTRAINT "PasswordResetTokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "WebhookLink" (
    "id" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "bankId" INTEGER NOT NULL,

    CONSTRAINT "WebhookLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WebhookLink_link_bankId_key" ON "WebhookLink"("link", "bankId");

-- AddForeignKey
ALTER TABLE "WebhookLink" ADD CONSTRAINT "WebhookLink_bankId_fkey" FOREIGN KEY ("bankId") REFERENCES "Bank"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

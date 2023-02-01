-- DropForeignKey
ALTER TABLE "WebhookLink" DROP CONSTRAINT "WebhookLink_bankId_fkey";

-- AddForeignKey
ALTER TABLE "WebhookLink" ADD CONSTRAINT "WebhookLink_bankId_fkey" FOREIGN KEY ("bankId") REFERENCES "Bank"("id") ON DELETE CASCADE ON UPDATE CASCADE;

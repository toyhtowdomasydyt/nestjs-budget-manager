-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_bankId_fkey";

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_bankId_fkey" FOREIGN KEY ("bankId") REFERENCES "Bank"("id") ON DELETE CASCADE ON UPDATE CASCADE;

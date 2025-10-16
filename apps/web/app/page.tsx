import { Button } from "@workspace/ui/components/button";
import { db, usersTable } from "@workspace/db";

export default async function Page() {
  console.log("db", process.env.DATABASE_URL);
  const users = await db.select().from(usersTable);
  console.log("users", users);

  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello World</h1>
        <Button size="sm">Button</Button>
      </div>
    </div>
  );
}

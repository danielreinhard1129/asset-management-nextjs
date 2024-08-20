import { signOut } from "@/lib/auth";

const HomepageEmployee = () => {
  return (
    <div>
      HomepageEmployee
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/login" });
        }}
      >
        <button>Logout</button>
      </form>
    </div>
  );
};

export default HomepageEmployee;

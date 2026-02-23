import { createAccount } from "@/app/lib/actions/actions";
import { auth } from "@/app/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

async function SignUp() {
  // const [password, setPassword] = useState("");
  // const [repeatPassword, setRepatPassword] = useState("");

  const session = await auth();
  if (session) redirect("/");

  // const passwordMatch = password.length > 0 && password === repeatPassword;

  return (
    <form
      action={async (formData) => {
        "use server";
        await createAccount(formData);
        redirect("/signin");
      }}
      className="flex flex-col w-1/3 border p-6 rounded-md"
    >
      <h2 className="text-4xl font-semibold pb-6 self-center">Sign up</h2>
      <div className="flex flex-col gap-1 pb-2">
        <label htmlFor="email" className="text-sm w-fit">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          required
          className="border rounded-sm shadow-lg focus:outline-0 py-1 px-3"
        />
        {/* {state?.errors?.username && <p>{state.errors.username}</p>} */}
      </div>
      <div className="flex flex-col gap-1 pb-2">
        <label htmlFor="email" className="text-sm w-fit">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="border rounded-sm shadow-lg focus:outline-0 py-1 px-3"
        />
        {/* {state?.errors?.email && <p>{state.errors.email}</p>} */}
      </div>
      <div className="flex flex-col gap-1 pb-2">
        <label htmlFor="password" className="text-sm w-fit">
          Passowrd
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          // onChange={(e) => setPassword(e.target.value)}
          className="border rounded-sm shadow-lg focus:outline-0 py-1 px-3"
        />
        {/* {state?.errors?.password && (
          <div>
            <p>Password must: </p>
            <ul>
              {state.errors.password.map((error) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          </div>
        )} */}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="rPassword" className="text-sm w-fit">
          Repeat Password
        </label>
        <input
          type="password"
          id="rPassword"
          // onChange={(e) => setRepatPassword(e.target.value)}
          className="border rounded-sm shadow-lg focus:outline-0 py-1 px-3"
        />
      </div>
      <button
        type="button"
        className="border bg-black p-2 text-white rounded-md mt-2"
      >
        Github
      </button>

      <button
        type="submit"
        className="border rounded-md w-2/3 self-center mt-5 hover:cursor-pointer"
        // disabled={!passwordMatch}
      >
        Sign up
      </button>

      <Link href={"/signin"} className="text-sm underline self-center pt-5">
        Already have an account? Sign in
      </Link>
    </form>
  );
}

export default SignUp;

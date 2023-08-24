import { json, redirect } from "@remix-run/node"; // change this import to whatever runtime you are using
import {} from "@supabase/auth-helpers-remix";
import { useLocation, Form } from "@remix-run/react";
import index from "../style/index.css";
import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";
import { supabaseClient } from "../libs/db.server";
import {
  signin,
  signup,
  getSession,
  commitSession,
  destroySession,
} from "../libs/auth.server";
import { validateCredentials } from "../libs/user-validation";

export const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const links = () => [
  ...(index ? [{ rel: "stylesheet", href: index }] : []),
];

export default function Index() {
  const mod = useLocation().search;
  return (
    <div>
      <Form method="POST">
        <input type="text" name="mod" value="signout" hidden />
        <button>Sign out</button>
      </Form>
      {mod == "" || mod.includes("signin") ? <SignIn /> : <SignUp />}
    </div>
  );
}

export const action = async ({ request }) => {
  const formData = await request.formData();
  const userData = Object.fromEntries(formData);
  if (userData.mod == "signin") {
    const userSignIn = {
      email: userData.email,
      password: userData.password,
    };
    return signin(userSignIn);
  }
  if (userData.mod == "signup") {
    const userSignUp = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      created_at: new Date(Date.now()),
    };
    if (validateCredentials(userSignUp) == false) {
      console.log(2);
      return null;
    }
    await signup(userSignUp);

    return redirect(`/`);
  }
  if (userData.mod == "signout") {
    supabaseClient.auth.signOut();
    const session = await getSession(request.headers.get("Cookie"));
    return redirect("/", {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
  }

  return userData;
};

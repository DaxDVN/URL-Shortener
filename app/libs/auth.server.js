import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { supabaseClient } from "./db.server";
import { hash } from "bcryptjs";

const SESSION_SECRET = process.env.SESSION_SECRET;

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      secure: process.env.NODE_ENV === "production",
      secrets: [SESSION_SECRET],
      sameSite: "lax",
      maxAge: 24 * 60 * 60,
      httpOnly: true,
    },
  });

async function createUserSession(userId) {
  const session = await getSession();

  session.set("userId", userId);
  return redirect("shorten", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export async function signup(credential) {
  const { data, error } = await supabaseClient
    .from("user")
    .select()
    .eq("email", credential.email);
  if (error != null) {
    return error;
  }

  if (data[0]) {
    return "Already have";
  }

  credential.password = await hash(credential.password, 12);
  let status = await supabaseClient.auth.signUp({
    email: credential.email,
    password: credential.password,
  });
  if (!status.error) {
    try {
      // credential.authId = status.data.id;
      // await supabaseClient.from("user").insert(credential);
    } catch (error) {
      return error;
    }
  }
}

export async function signin(credential) {
  const { data, session, error } = await supabaseClient.auth.signInWithPassword(
    {
      email: credential.email,
      password: credential.password,
    }
  );
  // console.log(data);
  if (!error) {
    return await createUserSession(data.user.id);
  } else {
    console.log(error);
  }
}

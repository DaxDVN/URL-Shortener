import { Form, Link, useLoaderData } from "@remix-run/react";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

export default function SignIn() {
  // const { env } = useLoaderData();
  // const [supabase] = useState(() =>
  //   createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)
  // );
  const signIn = () => {
    // supabase.auth.signInWithPassword({
    //   email: "nguyendat.michael@gmail.com",
    //   password: "123456789",
    // });
  };
  return (
    <div className="Auth-form-container">
      {/* <button onClick={signOut}>Sign out</button> */}
      <Form className="Auth-form 1" method="POST">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <input type="text" name="mod" value="signin" hidden />
            <label>Email address</label>
            <input
              name="email"
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              name="password"
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button>Sign in</button>
          </div>

          <div className="d-grid gap-2 mt-3">
            <Link to={"?signup"}>Don't have an account?</Link>
          </div>
          <p className="forgot-password text-right mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </Form>
    </div>
  );
}

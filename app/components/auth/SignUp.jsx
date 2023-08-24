import { Form, Link, useLoaderData } from "@remix-run/react";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

export default function SignUp() {
  return (
    <div className="Auth-form-container">
      <Form className="Auth-form 2" method="POST">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="form-group mt-3">
            <input type="text" name="mod" value="signup" hidden />

            <label>Your full name</label>
            <input
              name="name"
              type="text"
              className="form-control mt-1"
              placeholder="Enter your name"
            />
          </div>
          <div className="form-group mt-3">
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
            <button>Sign up</button>
          </div>
          <div className="d-grid gap-2 mt-3">
            <Link to={"?signin"}>Already have an account?</Link>
          </div>
          <p className="forgot-password text-right mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </Form>
    </div>
  );
}

import { ApplicationPaths } from "../types";
import nookies from "nookies";
import { NextPageContext } from "next";

export const TOKEN_KEY = "@CODEBLUE_ID";
export const getToken = (ctx: any) => nookies.get(ctx, TOKEN_KEY);
export const setToken = (ctx: NextPageContext, token: string) => {
  nookies.set(ctx, TOKEN_KEY, token, {
    maxAge: 24 * 60 * 60 * 1,
  });
};
export const logout = (ctx: any) => nookies.destroy(ctx, TOKEN_KEY);

export const handleLogout = () => {
  logout(null);

  if (window.location.pathname !== ApplicationPaths.LOGIN) {
    window.location.reload();
    window.location.href = ApplicationPaths.LOGIN;
  }
};

import { putService, getService } from "src/lib/helpers/connectApi";

export const changeThemeApi = (userId: string, theme: string) => {
  return putService("/user/theme", { userId, theme });
};

export const userApi = async () => {
  const userInfo = await Promise.all([
    getService("/user/info"),
    getService("/user/profile"),
    getService("/user/preferences"),
  ]).then(([info, profile, preferences]) => {
    return {
      info,
      profile,
      preferences,
    };
  });
  return userInfo;
};

export const getInfoProfile = () => {
  return getService("/user/profile");
};

export const changeInfoBasic = (
  first_name: string,
  last_name: string,
  email: string
) => {
  return putService("/user/basic", { first_name, last_name, email });
};

export const changeInfoNotNormal = (
  company: string,
  website: string,
  location: string,
  status: string,
  skills: string,
  bio: string
) => {
  return putService("/user/profile", {
    company,
    website,
    location,
    status,
    skills,
    bio,
  });
};

export const changePassword = (oldPassWord: string, newPassWord: string) => {
  return putService("/user/password", { oldPassWord, newPassWord });
};

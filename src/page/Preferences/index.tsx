import React, { useState, useEffect, ChangeEvent } from "react";
import { AllTheme } from "src/lib/theme";
import { PreferencesWrapper } from "./styles";
import { useAppDispatch } from "src/hooks/useAppDispatch";
import { addSnackBar, changeLanguage, changeTheme } from "src/services/app";
import { ThemesName } from "src/lib/theme/types";
import clsx from "clsx";
import {
  changeInfoBasic,
  changeThemeApi,
  getInfoProfile,
  changeInfoNotNormal,
} from "../../services/app/api";
import { useAppSelector } from "src/hooks/useAppSelector";
import ChangeLangue from "./../../components/Common/ChangeLangue/index";
import i18n from "./../../i18n";
import { userApi } from "./../../services/app/api";
import { InputNormal } from "src/components/Base/Input";
import Box from "src/components/Base/Box";
import Button from "src/components/Base/Button";

interface IUserNotNormal {
  company: string;
  website: string;
  location: string;
  status: string;
  skills: string;
  bio: string;
}

interface IUserBasic {
  last_name: string;
  first_name: string;
  email: string;
}

const Preferences = () => {
  const userId = useAppSelector((state) => state.user._id);
  const theme = useAppSelector((state) => state.app.theme);
  const [dataNotNormal, setDataNotNormal] = useState<IUserNotNormal>({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    bio: "",
  });
  const [dataBasic, setDataBasic] = useState<IUserBasic>({
    last_name: "",
    first_name: "",
    email: "",
  });

  const [editBasic, setEditBasic] = useState<boolean>(false);
  const [editNormal, setEditNormal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const changeThemeMode = async (name: ThemesName) => {
    try {
      const response = await changeThemeApi(userId, name);
      if (response) {
        dispatch(changeTheme(name));
        dispatch(addSnackBar({ type: "success", message: "change color" }));
      }
    } catch (error) {
      dispatch(addSnackBar({ type: "error", message: "change erorr" }));
    }
  };
  const onChange = (lang: "vn" | "en") => {
    i18n.changeLanguage(lang);
    dispatch(changeLanguage(lang));
  };

  useEffect(() => {
    getAllUserInfo();
  }, []);

  const getAllUserInfo = async () => {
    const { user, ...profile } = await getInfoProfile();
    if (user) {
      setDataBasic(user);
    }
    if (profile) {
      setDataNotNormal(profile);
    }
  };
  const onChangeBasic = (event: ChangeEvent<HTMLInputElement>) => {
    setDataBasic({ ...dataBasic, [event.target.name]: event?.target.value });
  };
  const onChangeNotNormal = (event: ChangeEvent<HTMLInputElement>) => {
    setDataNotNormal({
      ...dataNotNormal,
      [event.target.name]: event?.target.value,
    });
  };
  const saveBasic = async () => {
    setEditBasic(!editBasic);
    if (editBasic) {
      try {
        const response = await changeInfoBasic(
          dataBasic.first_name,
          dataBasic.last_name,
          dataBasic.email
        );
        console.log("response chagne", response);
      } catch (error) {
        console.log("response error", error);
      }
    }
  };

  const saveNotNormal = async () => {
    setEditNormal(!editNormal);
    if (editBasic) {
      try {
        const response = await changeInfoNotNormal(
          dataNotNormal.company,
          dataNotNormal.website,
          dataNotNormal.location,
          dataNotNormal.status,
          dataNotNormal.skills,
          dataNotNormal.bio
        );
        console.log("response chagne", response);
      } catch (error) {
        console.log("response error", error);
      }
    }
  };

  return (
    <PreferencesWrapper>
      <div className="itemThemes">
        <div>
          <Box>
            <div className="titleEditBasic">
              <p style={{ fontSize: 18, fontWeight: "bold" }}>
                Edit Basic Info
              </p>
              <Button
                onClick={saveBasic}
                title={editBasic ? "Save" : "Edit"}
              ></Button>
            </div>
            <InputNormal
              title="first_name"
              className="viewInputNormal"
              name="first_name"
              value={dataBasic?.first_name}
              onChange={onChangeBasic}
              disable={!editBasic}
            />
            <InputNormal
              title="last_name"
              className="viewInputNormal"
              name="last_name"
              value={dataBasic?.last_name}
              onChange={onChangeBasic}
              disable={!editBasic}
            />
            <InputNormal
              title="email"
              className="viewInputNormal"
              name="email"
              value={dataBasic?.email}
              onChange={onChangeBasic}
              disable={!editBasic}
            />
          </Box>
          <Box>
            <div className="titleEditBasic">
              <p style={{ fontSize: 18, fontWeight: "bold" }}>
                Edit Not Normal Info
              </p>
              <Button
                onClick={saveNotNormal}
                title={editNormal ? "Save" : "Edit"}
              ></Button>
            </div>
            <div className="stylesBox">
              <InputNormal
                title="company"
                className="viewInputNormal"
                name="company"
                value={dataNotNormal.company}
                onChange={onChangeNotNormal}
                disable={!editNormal}
              />
              <InputNormal
                title="website"
                className="viewInputNormal"
                name="website"
                value={dataNotNormal.website}
                onChange={onChangeNotNormal}
                disable={!editNormal}
              />
              <InputNormal
                title="location"
                className="viewInputNormal"
                name="location"
                value={dataNotNormal.location}
                onChange={onChangeNotNormal}
                disable={!editNormal}
              />
              <InputNormal
                title="status"
                className="viewInputNormal"
                name="status"
                value={dataNotNormal.status}
                onChange={onChangeNotNormal}
                disable={!editNormal}
              />
              <InputNormal
                title="skill"
                className="viewInputNormal"
                name="skill"
                value={dataNotNormal.skills}
                onChange={onChangeNotNormal}
                disable={!editNormal}
              />
              <InputNormal
                className="viewInputNormal"
                title="bio"
                name="bio"
                value={dataNotNormal.bio}
                onChange={onChangeNotNormal}
                disable={!editNormal}
              />
            </div>
          </Box>
        </div>
      </div>
      <div className="itemThemes">
        <div className="textIntro">
          <p style={{ fontSize: 18, fontWeight: "bold" }}>Change Language 👉</p>
        </div>
        <div className="change-langues-option">
          <button onClick={() => onChange("vn")} className="lang_option">
            🇻🇳 Tiếng Việt
          </button>
          <button onClick={() => onChange("en")} className="lang_option">
            🇬🇧 English
          </button>
        </div>
      </div>

      <div className="itemThemes">
        <div className="textIntro">
          <p style={{ fontSize: 18, fontWeight: "bold", paddingRight: 20 }}>
            Navigation theme
          </p>
          <p style={{ paddingRight: 20 }}>
            Customize the appearance of the application header and navigation
            sidebar.
          </p>
        </div>
        <div className="itemItem">
          {AllTheme.map((item) => (
            <div
              className={clsx("listSmall", { active: theme === item.name })}
              onClick={() => changeThemeMode(item.name)}
              style={{ backgroundColor: item.color }}
            >
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </PreferencesWrapper>
  );
};

export default Preferences;

import React, { useState } from "react";
import { AllTheme } from "src/lib/theme";
import { PreferencesWrapper } from "./styles";
import { useAppDispatch } from "src/hooks/useAppDispatch";
import { addSnackBar, changeLanguage, changeTheme } from "src/services/app";
import { ThemesName } from "src/lib/theme/types";
import clsx from "clsx";
import { changeThemeApi } from "../../services/app/api";
import { useAppSelector } from "src/hooks/useAppSelector";
import ChangeLangue from "./../../components/Common/ChangeLangue/index";
import i18n from "./../../i18n";

const Preferences = () => {
  const userId = useAppSelector((state) => state.user._id);
  const theme = useAppSelector((state) => state.app.theme);
  const [isShowAvtModal, setIsShowAvtModal] = useState<boolean>(false);
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
  return (
    <PreferencesWrapper>
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
          <p style={{ fontSize: 18, fontWeight: "bold" }}>Navigation theme</p>
          <p>
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
      <div className="itemThemes">
        <div className="textIntro">
          <p style={{ fontSize: 18, fontWeight: "bold" }}>Edit Profile</p>
        </div>
        <div>
          <div className="listInput">
            <div className="showTextInput">
              <label className="labels">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="first name"
              />
            </div>
            <div className="showTextInput">
              <label className="labels">Sur Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="first name"
              />
            </div>
          </div>
          <div className="showEmail">
            <label className="labels">Email</label>
            <input
              type="text"
              className="form-control"
              placeholder="first name"
            />
            <button className="textSave">Save</button>
          </div>
        </div>
      </div>
    </PreferencesWrapper>
  );
};

export default Preferences;

import React, { useState, useEffect, ChangeEvent } from 'react';
import { AllTheme } from 'src/lib/theme';
import { PreferencesWrapper } from './styles';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { addSnackBar, changeLanguage, changeTheme } from 'src/services/app';
import { ThemesName } from 'src/lib/theme/types';
import clsx from 'clsx';
import {
  changeInfoBasic,
  changeThemeApi,
  getInfoProfile,
  changeInfoNotNormal,
  changePassword,
} from '../../services/app/api';
import { useAppSelector } from 'src/hooks/useAppSelector';
import i18n from './../../i18n';
import { InputNormal } from 'src/components/Base/Input';
import Box, { BowWithHeader } from 'src/components/Base/Box';
import Button from 'src/components/Base/Button';
import Modal from './../../components/Base/Modal/index';
import { useHistory } from 'react-router-dom';

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

interface IChangePassword {
  oldPassWord: string;
  newPassWord: string;
}

const Preferences = () => {
  const userId = useAppSelector((state) => state.user._id);
  const theme = useAppSelector((state) => state.app.theme);
  const [dataNotNormal, setDataNotNormal] = useState<IUserNotNormal>({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    bio: '',
  });
  const [dataBasic, setDataBasic] = useState<IUserBasic>({
    last_name: '',
    first_name: '',
    email: '',
  });

  const [paramChangePw, setParamChangePw] = useState<IChangePassword>({
    oldPassWord: '',
    newPassWord: '',
  });

  const [editBasic, setEditBasic] = useState<boolean>(false);
  const [editNormal, setEditNormal] = useState<boolean>(false);
  const [isShowChangPw, setIsShowChangePw] = useState<boolean>(false);
  const [showError, setShowError] = useState<string>('');

  const dispatch = useAppDispatch();
  const changeThemeMode = async (name: ThemesName) => {
    try {
      const response = await changeThemeApi(userId, name);
      if (response) {
        dispatch(changeTheme(name));
        dispatch(addSnackBar({ type: 'success', message: 'change color' }));
      }
    } catch (error) {
      dispatch(addSnackBar({ type: 'error', message: 'change erorr' }));
    }
  };
  const onChange = (lang: 'vn' | 'en') => {
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

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setParamChangePw({
      ...paramChangePw,
      [event.target.name]: event?.target.value.trim(),
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
        console.log('response chagne', response);
      } catch (error) {
        console.log('response error', error);
      }
    }
  };

  const saveNotNormal = async () => {
    setEditNormal(!editNormal);
    if (editBasic) {
      try {
        await changeInfoNotNormal(
          dataNotNormal.company,
          dataNotNormal.website,
          dataNotNormal.location,
          dataNotNormal.status,
          dataNotNormal.skills,
          dataNotNormal.bio
        );
      } catch (error) {}
    }
  };

  const saveChangePassword = async () => {
    try {
      await changePassword(
        paramChangePw.oldPassWord,
        paramChangePw.newPassWord
      );
      dispatch(addSnackBar({ type: 'success', message: 'change password' }));
      setIsShowChangePw(false);
    } catch (error) {
      setShowError(JSON.stringify(error));
    }
  };

  const history = useHistory();
  
  return (
    <PreferencesWrapper>
      <Button title="Go back" onClick={() => history.goBack()} className='goBack_btn' />
      <BowWithHeader
        title="Edit Basic Info"
        btnTitle={editBasic ? 'Save' : 'Edit'}
        handleClickBtn={saveBasic}
        className="preferences__item"
      >
        <InputNormal
          title="first_name"
          name="first_name"
          value={dataBasic?.first_name}
          onChange={onChangeBasic}
          disable={!editBasic}
        />
        <InputNormal
          title="last_name"
          name="last_name"
          value={dataBasic?.last_name}
          onChange={onChangeBasic}
          disable={!editBasic}
        />
        <InputNormal
          title="email"
          name="email"
          value={dataBasic?.email}
          onChange={onChangeBasic}
          disable={!editBasic}
        />
      </BowWithHeader>
      <BowWithHeader
        title="Do you want to change Password"
        className="preferences__item"
        btnTitle="Change Password"
        handleClickBtn={() => setIsShowChangePw(true)}
      >
        {null}
      </BowWithHeader>
      <BowWithHeader
        title="Edit Not Normal Info"
        btnTitle={editNormal ? 'Save' : 'Edit'}
        handleClickBtn={saveNotNormal}
        className="preferences__item"
      >
        <InputNormal
          title="company"
          name="company"
          value={dataNotNormal.company}
          onChange={onChangeNotNormal}
          disable={!editNormal}
        />
        <InputNormal
          title="website"
          name="website"
          value={dataNotNormal.website}
          onChange={onChangeNotNormal}
          disable={!editNormal}
        />
        <InputNormal
          title="location"
          name="location"
          value={dataNotNormal.location}
          onChange={onChangeNotNormal}
          disable={!editNormal}
        />
        <InputNormal
          title="status"
          name="status"
          value={dataNotNormal.status}
          onChange={onChangeNotNormal}
          disable={!editNormal}
        />
        <InputNormal
          title="skill"
          name="skill"
          value={dataNotNormal.skills}
          onChange={onChangeNotNormal}
          disable={!editNormal}
        />
        <InputNormal
          title="bio"
          name="bio"
          value={dataNotNormal.bio}
          onChange={onChangeNotNormal}
          disable={!editNormal}
        />
      </BowWithHeader>
      <BowWithHeader title="Change Language 👉" className="preferences__item">
        <div className="change-langues-option">
          <button onClick={() => onChange('vn')} className="lang_option">
            🇻🇳 Tiếng Việt
          </button>
          <button onClick={() => onChange('en')} className="lang_option">
            🇬🇧 English
          </button>
        </div>
      </BowWithHeader>

      <BowWithHeader
        title="Navigation theme"
        className="preferences__item listTheme"
      >
        {AllTheme.map((item) => (
          <div
            className={clsx('themeBox', { active: theme === item.name })}
            onClick={() => changeThemeMode(item.name)}
            style={{ backgroundColor: item.color }}
          >
            <span>{item.name}</span>
          </div>
        ))}
      </BowWithHeader>
      <Modal
        isShow={isShowChangPw}
        closeBtn={'Close'}
        submitBtn="Confirm"
        title="Change Password"
        onClose={() => setIsShowChangePw(false)}
        onSubmit={saveChangePassword}
      >
        <Box className="change_password">
          <InputNormal
            title="Old password"
            name="oldPassWord"
            value={paramChangePw.oldPassWord}
            onChange={onChangePassword}
          />
          <InputNormal
            title="New password"
            name="newPassWord"
            value={paramChangePw.newPassWord}
            onChange={onChangePassword}
          />
          <span>{showError}</span>
        </Box>
      </Modal>
    </PreferencesWrapper>
  );
};

export default Preferences;

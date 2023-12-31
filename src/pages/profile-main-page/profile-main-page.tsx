import React, { FC } from 'react';
import { EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, useForm } from '../../hooks';
import styles from './profile-main-page.module.css';
import { logoutRequest } from '../../services/actions/account';
import { useLanguage } from '../../utils/languageContext';

const ProfileMainPage: FC<object> = () => {
  const { user } = useSelector((store) => store.accountStore);
  const { values, handleChange } = useForm({ name: user.name, email: user.email, password: '' });
  const dispatch = useDispatch();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const handleLogout = (): void => {
    dispatch(logoutRequest());
    navigate('/', { replace: true });
  };

  return (
    <div className={styles.app}>
      <div className={styles.flex}>
        <div>
          <NavLink
            className={`${styles.menuTab} mt-30 ${styles.linkDecoration}`}
            to="/profile"
          >
            {({ isActive }) => (
              <p className={`text text_type_main-large ${(isActive && !window.location.href.includes('orders')) ? styles.activeColor : 'text_color_inactive'}`}>
                {t('profile')}
              </p>
            )}
          </NavLink>
          <NavLink
            className={`${styles.menuTab} ${styles.linkDecoration}`}
            to="/profile/orders"
          >
            {({ isActive }) => (
              <p className={`text text_type_main-large ${isActive ? styles.activeColor : 'text_color_inactive'}`}>
                {t('orderHistory')}
              </p>
            )}
          </NavLink>
          <Link onClick={handleLogout} className={`${styles.menuTab} ${styles.linkDecoration}`} to="/" replace>
            <p className="text text_type_main-large text_color_inactive">
              {t('logout')}
            </p>
          </Link>
          <div className="mt-20">
            <p className="text text_type_main-default text_color_inactive">
              {t('profilePS1')}
              <br />
              {t('profilePS2')}
            </p>
          </div>
        </div>
        <div className="mt-30 ml-15">
          <form>
            <Input
              type="text"
              placeholder={t('name')}
              onChange={handleChange}
              value={values.name}
              name="name"
              error={false}
              errorText="Ошибка"
              size="default"
              extraClass="ml-1 mt-6"
            />
            <EmailInput
              onChange={handleChange}
              value={values.email}
              name="email"
              isIcon={false}
              extraClass="ml-1 mt-6"
            />
            <PasswordInput
              placeholder={t('password')}
              value={values.password}
              name="password"
              extraClass="ml-1 mt-6"
              onChange={handleChange}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileMainPage;

import React, { FC } from 'react';
import {
  Button, Input, PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, useForm } from '../../hooks';
import styles from './reset-password-page.module.css';
// eslint-disable-next-line import/named
import { getUserRequest, resetPasswordRequest, resetPasswordReset } from '../../services/actions/account';
import { useLanguage } from '../../utils/languageContext';

const ResetPasswordPage: FC<object> = () => {
  const { values, handleChange } = useForm({ password: '', emailCode: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';
  const { success } = useSelector((store) => store.accountStore.passwordResetRequest);
  const { user } = useSelector((state) => state.accountStore);
  const { t } = useLanguage();
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    dispatch(resetPasswordRequest(values.password, values.emailCode));
  };

  React.useEffect(() => {
    dispatch(getUserRequest());
    if (user.name !== '') {
      navigate('/', { replace: true });
    } else if (from !== '/forgot-password') {
      navigate(from, { replace: true });
    } else if (success) {
      dispatch(resetPasswordReset());
      navigate('/login', { replace: true });
    }
  }, [success, navigate, dispatch, user.name, from]);
  return (
    <div className={styles.forgotPasswordWindow}>
      <div className={styles.forgotPasswordBox}>
        <div className="text text_type_main-medium">{t('resetPasswordTitle')}</div>
        <form onSubmit={handleSubmit}>
          <PasswordInput
            value={values.password}
            name="password"
            placeholder={t('enterPassword')}
            extraClass="ml-1 mt-6"
            /* eslint-disable-next-line @typescript-eslint/no-empty-function */
            onChange={handleChange}
          />
          <Input
            type="text"
            placeholder={t('enterCode')}
            /* eslint-disable-next-line @typescript-eslint/no-empty-function */
            onChange={handleChange}
            value={values.emailCode}
            name="emailCode"
            error={false}
            errorText="Ошибка"
            size="default"
            extraClass="ml-1 mt-6"
          />
          <div className={`mt-6 ${styles.resetBtn}`}>
            <Button htmlType="submit" type="primary" size="medium">
              {t('recover')}
            </Button>
          </div>
        </form>
        <div className={`mt-20 text text_type_main-default text_color_inactive ${styles.forgotPasswordLinkBox}`}>
          <div>
            {t('rememberedPassword')}
          </div>
          <Link to="/login">
            <Button htmlType="button" type="secondary" size="medium" extraClass={`${styles.secondaryButton} ml-2`}>
              {t('login')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;

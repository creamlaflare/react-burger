import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './profile-orders-page.module.css';
import AppHeader from '../../components/app-header/app-header';
import { logoutRequest } from '../../services/actions/account';

function ProfileOrdersPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('logout');
    dispatch(logoutRequest());
    navigate('/', { replace: true });
  };

  return (
    <>
      <AppHeader />
      <div className={styles.flex}>
        <div>
          <NavLink
            className={`${styles.menuTab} mt-30 ${styles.linkDecoration}`}
            to="/profile"
          >
            {({ isActive }) => (
              <p className={`text text_type_main-large ${(isActive && !window.location.href.includes('orders')) ? styles.activeColor : 'text_color_inactive'}`}>
                Профиль
              </p>
            )}
          </NavLink>
          <NavLink
            className={`${styles.menuTab} ${styles.linkDecoration}`}
            to="/profile/orders"
          >
            {({ isActive }) => (
              <p className={`text text_type_main-large ${isActive ? styles.activeColor : 'text_color_inactive'}`}>
                История заказов
              </p>
            )}
          </NavLink>
          <Link onClick={handleLogout} className={`${styles.menuTab} ${styles.linkDecoration}`} to="/" replace>
            <p className="text text_type_main-large text_color_inactive">
              Выйти
            </p>
          </Link>
        </div>
      </div>
    </>
  );
}

export default ProfileOrdersPage;
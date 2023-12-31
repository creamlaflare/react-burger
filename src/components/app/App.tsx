import React, { FC, useEffect } from 'react';
import {
  Routes, Route, useLocation, useNavigate, useMatch,
} from 'react-router-dom';
import MoonLoader from 'react-spinners/MoonLoader';
import { useSelector, useDispatch } from '../../hooks';
import styles from './App.module.css';
import { getIngredients, setCurrentItemClose } from '../../services/actions/ingredients';
import {
  MainPage, SignIn, RegisterPage, ForgotPasswordPage, ResetPasswordPage,
  NonModalIngredientPage, ProfileMainPage, ProfileOrdersPage, OrderFeedPage, NonModalOrderFeedPage,
} from '../../pages';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import ProtectedRouteElement from '../protected-route-element/protected-route-element';
import AppHeader from '../app-header/app-header';
import OrderFeedDetails from '../order-feed-details/order-feed-details';
import { useLanguage } from '../../utils/languageContext';

const App: FC<object> = () => {
  const { isLoading } = useSelector((state) => state.ingredientsStore);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { backgroundLocation?: Location };
  const profileMatch = useMatch('/profile/orders/:number')?.params.number;
  const feedMatch = useMatch('/feed/:number')?.params.number;
  const orderNumber = profileMatch || feedMatch;
  const { t } = useLanguage();

  const handleCloseModal = (): void => {
    dispatch(setCurrentItemClose());
    if (state?.backgroundLocation) {
      navigate(state.backgroundLocation.pathname);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(getIngredients());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className={styles.spinner}>
        <MoonLoader
          color="rgb(133, 133, 173, 1)"
          cssOverride={{}}
          loading
          size={100}
          speedMultiplier={1}
        />
      </div>
    );
  }

  return (
    <>
      <AppHeader />
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<ProtectedRouteElement element={<SignIn />} anonymous />} />
        <Route path="/register" element={<ProtectedRouteElement element={<RegisterPage />} anonymous />} />
        <Route path="/forgot-password" element={<ProtectedRouteElement element={<ForgotPasswordPage />} anonymous />} />
        <Route path="/reset-password" element={<ProtectedRouteElement element={<ResetPasswordPage />} anonymous />} />
        <Route path="/feed" element={<OrderFeedPage />} />
        <Route path="/feed/:number" element={<NonModalOrderFeedPage />} />
        <Route
          path="/ingredients/:id"
          element={(<NonModalIngredientPage />)}
        />
        <Route
          path="/profile/orders/:number"
          element={<NonModalOrderFeedPage />}
        />
        <Route
          path="/profile"
          element={(
            <ProtectedRouteElement element={<ProfileMainPage />} />
          )}
        />
        <Route
          path="/profile/orders"
          element={(
            <ProtectedRouteElement element={<ProfileOrdersPage />} />
          )}
        />
        <Route
          path="/profile/orders/:id"
          element={(
            <ProtectedRouteElement element={<ProfileMainPage />} />
          )}
        />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route
            path="/profile/orders/:number"
            element={(
              <ProtectedRouteElement element={(
                <Modal onClose={handleCloseModal} title={`#${orderNumber && orderNumber.padStart(6, '0')}`} className={styles.modalWidth} headerClass={`${styles.modalHeader} mt-10 ml-10 mr-10`}>
                  <OrderFeedDetails />
                </Modal>
              )}
              />
            )}
          />
          <Route
            path="/ingredients/:id"
            element={(
              <Modal onClose={handleCloseModal} defaultTitle title={t('ingredientDetails')} className={styles.modalWidth} headerClass={`${styles.modalHeader} mt-10 ml-10 mr-10`}>
                <IngredientDetails />
              </Modal>
            )}
          />
          <Route
            path="/feed/:number"
            element={(
              <Modal onClose={handleCloseModal} title={`#${orderNumber && orderNumber.padStart(6, '0')}`} className={styles.modalWidth} headerClass={`${styles.modalHeader} mt-10 ml-10 mr-10`}>
                <OrderFeedDetails />
              </Modal>
            )}
          />
        </Routes>
      )}
    </>
  );
};

export default App;

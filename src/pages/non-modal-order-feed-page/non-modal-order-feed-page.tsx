import React, { useEffect } from 'react';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';
import MoonLoader from 'react-spinners/MoonLoader';
import styles from './non-modal-order-feed-page.module.css';
import { TOrder } from '../../services/reducers/order-feed';
import { useDispatch, useSelector } from '../../hooks';
import { getOrderByID } from '../../services/actions/order-feed';
import RequestStatus from '../../types/requestStatus';
import { useLanguage } from '../../utils/languageContext';

type TCounterAcc = {
  [key: string]: number;
};

function formatDate(dateString: string) {
  const dateEn = new Date(dateString);
  const now = new Date();

  const formatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  // Check if the date is today
  if (dateEn.toDateString() === now.toDateString()) {
    return `Today, ${formatter.format(dateEn)}`;
  }

  // Check if the date is yesterday
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (dateEn.toDateString() === yesterday.toDateString()) {
    return `Yesterday, ${formatter.format(dateEn)}`;
  }

  // Format for other days
  return `${dateEn.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}, ${formatter.format(dateEn)}`;
}

const NonModalOrderFeedPage = () => {
  const { number } = useParams();
  const { ingredients } = useSelector((store) => store.ingredientsStore);
  const { orderPage } = useSelector((store) => store.orderFeedStore);
  const { orderPageStatus } = useSelector((store) => store.orderFeedStore);
  const orderData = orderPage[0];
  const dispatch = useDispatch();
  const { language, t } = useLanguage();

  const countIngredients = (ingredientsArray: string[]) => ingredientsArray
    .reduce((acc: TCounterAcc, ingredient) => {
      // eslint-disable-next-line no-underscore-dangle
      acc[ingredient] = (acc[ingredient] || 0) + 1;
      return acc;
    }, {});

  const calculateTotalPrice = (order: TOrder) => {
    // eslint-disable-next-line no-underscore-dangle
    const orderIngredients = ingredients.filter((item) => order.ingredients.includes(item._id));
    return orderIngredients.reduce((acc, item) => acc + item.price, 0);
  };

  const handleStatus = (status: string) => {
    switch (status) {
      case 'done':
        return t('done');
      case 'pending':
        return t('pending');
      case 'created':
        return t('created');
      default:
        return 'Неизвестно';
    }
  };

  const handleStatusColor = (status: string) => {
    switch (status) {
      case 'done':
        return styles.doneColor;
      case 'pending':
        return styles.pendingColor;
      case 'created':
        return styles.createdColor;
      default:
        return styles.doneColor;
    }
  };

  useEffect(() => {
    if (number !== undefined) dispatch(getOrderByID(number));
  }, [dispatch, number]);

  if (orderPageStatus !== RequestStatus.SUCCEEDED) {
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

  const uniqueIngredient = Array.from(new Set(orderData.ingredients));
  const ingredientCounts = countIngredients(orderData.ingredients);

  return (
    <div className={styles.cardFlex}>
      <div className={styles.orderNumberMargin}>
        <p className="text text_type_digits-medium">
          #
          {orderData.number}
        </p>
      </div>
      <div className="ml-10 mr-10">
        <div className="mt-10 mb-3">
          <p className="text text_type_main-medium">{language === 'en' ? orderData.nameEn : orderData.name}</p>
        </div>
        <div className="mb-15">
          <p className={`${handleStatusColor(orderData.status)} text text_type_main-default`}>{handleStatus(orderData.status)}</p>
        </div>
        <div className="mb-6">
          <p className="text text_type_main-medium">{t('ingredients')}</p>
        </div>
        <div className={styles.overflow}>
          {
            uniqueIngredient.map((item, index) => {
              // eslint-disable-next-line no-underscore-dangle
              const ingredient = ingredients.find((ingredientItem) => ingredientItem._id === item);
              const count = ingredientCounts[item];
              const multiplier = count > 1 ? `${count} x ` : '';

              return (
              // eslint-disable-next-line no-underscore-dangle
                <div key={ingredient?._id} className={`${styles.imagesContainer} ${index !== 0 ? 'mt-4' : ''}`}>
                  <div className={styles.ingredientName}>
                    <div
                      className={styles.cardImages}
                      style={{
                        backgroundImage: `url(${ingredient?.image})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                      }}
                    />
                    <p className="text text_type_main-default ml-4">{ingredient?.name ? t(ingredient.name) : null}</p>
                  </div>
                  <div className={styles.ingredientName}>
                    <p className="text text_type_digits-medium mr-2 ml-4">
                      {multiplier}
                      {ingredient?.price}
                    </p>
                    <CurrencyIcon type="primary" />
                  </div>
                </div>
              );
            })
          }
        </div>
        <div className={styles.cardFooter}>
          <div>
            <p className="text text_type_main-default text_color_inactive">
              {language === 'ru' ? <FormattedDate date={new Date(orderData.createdAt)} /> : formatDate(orderData.createdAt)}
            </p>
          </div>
          <div className={`${styles.ingredientName} mb-5`}>
            <p className="text text_type_digits-medium mr-2 ml-4">{calculateTotalPrice(orderData)}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NonModalOrderFeedPage;

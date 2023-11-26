import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-feed.module.css';
import data from '../../utils/data'; // Import data

const OrderFeed = () => {
  // Ensure data[0] and data[1] and their images exist
  const imageUrl = data[0]?.image;
  const imageUrl2 = data[1]?.image;

  return (
    <div className={`${styles.card} mt-5`}>
      <div className={styles.cardHeader}>
        <p className="text text_type_digits-default">#034535</p>
        <p className={`text text_type_main-small ${styles.date}`}>Сегодня, 16:20</p>
      </div>
      <div className="mt-6 mb-6">
        <p className="text text_type_main-medium">Death Star Starship Main бургер</p>
      </div>
      <div className={styles.cardFooter}>
        <div className={styles.imagesContainer}>
          <div
            className={styles.cardImages}
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              zIndex: 4,
            }}
          />
          <div
            className={styles.cardImages}
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              zIndex: 3,
              marginLeft: '-15px',
            }}
          />
          <div
            className={styles.cardImages}
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              zIndex: 2,
              marginLeft: '-15px',
            }}
          />
          <div
            className={styles.cardImages}
            style={{
              backgroundImage: `url(${imageUrl2})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              zIndex: 1,
              marginLeft: '-15px',
            }}
          />
        </div>
        <div className={styles.cardPrice}>
          <p className="text text_type_digits-default mr-2">480</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderFeed;
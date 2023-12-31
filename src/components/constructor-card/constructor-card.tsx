import React, { FC } from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { useSelector } from '../../hooks';
import styles from './constructor-card.module.css';
import TItemType from '../../types/ItemType';
import { TItemTypeWithUniqueId } from '../../services/actions/ingredients';
import { useLanguage } from '../../utils/languageContext';

type TConstructorCardProp = {
  item: TItemType;
  className?: string;
  price: number;
  onClick: (item: { data: TItemType }) => void;
}

const ConstructorCard: FC<TConstructorCardProp> = ({
  item, className, price, onClick,
}) => {
  const { t } = useLanguage();
  const ingredientCount = useSelector((store) => {
    if (item.type !== 'bun') {
      return store.ingredientsStore.constructorIngredients
        .filter(
          // eslint-disable-next-line no-underscore-dangle
          (el: { ingredient: TItemTypeWithUniqueId }) => el.ingredient._id === item._id,
        ).length;
    }
    return store.ingredientsStore.bunData === item ? 1 : 0;
  });

  const [, dragBunRef] = useDrag({
    type: 'bun',
    item,
  });
  const [, dragSauceRef] = useDrag({
    type: 'sauce',
    item,
  });

  function customClick(): void {
    onClick({ data: item });
  }

  return (
    // eslint-disable-next-line max-len
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div className={`${styles.card} ${className}`} data-cy="draggable-ingredient" onClick={customClick} ref={item.type === 'bun' ? dragBunRef : dragSauceRef}>
      <img className="pl-4 pr-4" src={item.image} alt={item.name} />
      <div className={`${styles.flex} mt-1`}>
        <p className="text text_type_digits-default mr-1">
          {price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`text text_type_main-default mt-1 ${styles.textCenter}`}>
        {t(item.name)}
      </p>
      { ingredientCount > 0 ? <Counter count={ingredientCount} size="default" extraClass="m-1" /> : null }
    </div>
  );
};

ConstructorCard.defaultProps = {
  className: '',
};
export default ConstructorCard;

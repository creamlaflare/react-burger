import { DndProvider } from 'react-dnd';
import React, { FC } from 'react';
import ModifiedBackend from '../../utils/DndContext';
import styles from './main-page.module.css';
import withModalControl from '../../hocs/with-modal-control';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import { useSelector } from '../../hooks';

const BurgerIngredientsWithModal = withModalControl(BurgerIngredients);
const BurgerConstructorWithModal = withModalControl(BurgerConstructor);

const MainPage: FC<object> = () => {
  const { onConstructorMobile } = useSelector((store) => store.ingredientsStore);
  return (
    <>
      { /* eslint-disable-next-line react/jsx-no-constructed-context-values */}
      <div className={styles.app}>
        <DndProvider backend={ModifiedBackend}>
          <main>
            <div className={`${styles.tabWidth} ${onConstructorMobile ? styles.mobileNone : null}`}>
              <BurgerIngredientsWithModal />
            </div>
            <div className={`${styles.tabWidth} ${!onConstructorMobile ? styles.mobileNone : null}`}>
              <BurgerConstructorWithModal
                className={`mt-25 ml-10 ${styles.flexColumn}`}
              />
            </div>
          </main>
        </DndProvider>
      </div>
    </>
  );
};

export default MainPage;

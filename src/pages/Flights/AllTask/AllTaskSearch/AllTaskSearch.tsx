import React from 'react';
import { Transition } from 'react-transition-group';
import gsap from 'gsap';
import { useDropdown } from 'react-lib';
import AllTaskSearchForm from '@pages/Flights/AllTask/AllTaskSearch/AllTaskSearchForm';

// Styles
import styles from './SearchForm.module.scss';

const AllTaskSearch = () => {
  const trigger = React.useRef<any>();

  const { Dropdown, isOpen, open, close } = useDropdown({
    ref: trigger,
    position: 'bottom right',
    closeOnClickOutside: false,
  });

  const renderContent = () => (
    <div>
      <AllTaskSearchForm handleClose={close} />
    </div>
  );

  return (
    <>
      <span ref={trigger} onClick={open} className={styles.iconSetting}>
        <i className='icon-setting' />
      </span>
      <Transition
        in={isOpen}
        timeout={200}
        mountOnEnter
        unmountOnExit
        addEndListener={(node, done) => {
          gsap.to(node, 200 / 1000, {
            autoAlpha: isOpen ? 1 : 0,
            y: isOpen ? 6 : 0,
            onComplete: done,
          });
        }}
      >
        <Dropdown
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: 518,
            padding: 15,
            borderRadius: 4,
            backgroundColor: '#fff',
            boxShadow:
              '0 0 14.7754px rgba(17, 82, 99, 0.075), 0 0 7.84712px rgba(17, 82, 99, 0.0605839), 0 0 3.26536px rgba(17, 82, 99, 0.0421718)',
          }}
        >
          {renderContent()}
        </Dropdown>
      </Transition>
    </>
  );
};

export default AllTaskSearch;

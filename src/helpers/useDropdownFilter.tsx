import React from 'react';
import { Transition } from 'react-transition-group';
import gsap from 'gsap';
import { useDropdown } from 'react-lib';

export default function useDropdownFilter(
  trigger: React.RefObject<any>,
  pos: any = 'bottom right',
) {
  const { Dropdown, isOpen, open, close } = useDropdown({
    ref: trigger,
    position: pos,
    closeOnClickOutside: true,
  });

  const toggle = () => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  };

  const DropdownView = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
    return (
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
            width: 500,
            marginTop: '1rem',
            padding: 20,
            borderRadius: 4,
            backgroundColor: '#fff',
            zIndex: 12,
            boxShadow:
              '0 0 14.7754px rgba(17, 82, 99, 0.075), 0 0 7.84712px rgba(17, 82, 99, 0.0605839), 0 0 3.26536px rgba(17, 82, 99, 0.0421718)',
          }}
        >
          <div>{children}</div>
        </Dropdown>
      </Transition>
    );
  };

  return {
    open,
    close,
    isOpen,
    DropdownView,
    toggle,
  };
}

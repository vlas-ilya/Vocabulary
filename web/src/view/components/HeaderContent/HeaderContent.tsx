import './HeaderContent.styles.css';
import { KeyboardEventHandler, useCallback, useState } from 'react';
import cm from 'classnames';
import { ReactComponent as Menu } from '../../icons/menu.svg';

export const HeaderContent = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = useCallback(() => setShowMenu(!showMenu), [showMenu, setShowMenu]);

  const toggleMenuOnKeyDown = useCallback<KeyboardEventHandler<HTMLDivElement>>(
    (e) => e.code === 'Enter' && toggleMenu(),
    [toggleMenu],
  );

  return (
    <div className="HeaderContent">
      <div className="HeaderContent_Icon" tabIndex={1} />
      <div className="HeaderContent_Title">Vocabulary</div>
      <div className="HeaderContent_Account" tabIndex={2}>
        IV
      </div>
      <div
        className={cm('HeaderContent_Burger', {
          HeaderContent_Burger_active: showMenu,
        })}
        role="menubar"
        onKeyDown={toggleMenuOnKeyDown}
        onClick={toggleMenu}
        tabIndex={1}
      >
        <Menu />
      </div>
      <div
        className={cm('HeaderContent_Content', {
          HeaderContent_Content_active: showMenu,
        })}
      >
        <div className="HeaderContent_Item">
          <a href="#" className="HeaderContent_Link" tabIndex={1}>
            Words
          </a>
        </div>
        <div className="HeaderContent_Item">
          <a href="#" className="HeaderContent_Link" tabIndex={1}>
            Students
          </a>
        </div>
        <div className="HeaderContent_Item">
          <a href="#" className="HeaderContent_Link" tabIndex={1}>
            Lessons
          </a>
        </div>
        <div className="HeaderContent_Item">
          <a href="#" className="HeaderContent_Link" tabIndex={1}>
            Trainings
          </a>
        </div>
      </div>
    </div>
  );
};

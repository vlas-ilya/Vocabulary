import './HeaderContent.styles.css';
import { KeyboardEventHandler, useCallback, useState } from 'react';
import cm from 'classnames';
import { ReactComponent as Menu } from '../../icons/menu.svg';
import {Link, useLocation} from 'react-router-dom';

export const HeaderContent = () => {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

  const toggleMenu = useCallback(() => setShowMenu(!showMenu), [showMenu, setShowMenu]);

  const toggleMenuOnKeyDown = useCallback<KeyboardEventHandler<HTMLDivElement>>(
    (e) => e.code === 'Enter' && toggleMenu(),
    [toggleMenu],
  );

  return (
    <div className="HeaderContent">
      <Link to="/" className="HeaderContent_Icon" tabIndex={1} />
      <div className="HeaderContent_Title">Vocabulary</div>
      <Link to="/student" className="HeaderContent_Account" tabIndex={2}>
        IV
      </Link>
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
          <Link
            to="/words"
            className={cm('HeaderContent_Link', {
              HeaderContent_Link_active: location.pathname.startsWith('/words'),
            })}
            tabIndex={1}
            data-text="Words"
          >
            Words
          </Link>
        </div>
        <div className="HeaderContent_Item">
          <Link
            to="/teacher/students"
            className={cm('HeaderContent_Link', {
              HeaderContent_Link_active: location.pathname.startsWith('/teacher/students'),
            })}
            tabIndex={1}
            data-text="Students"
          >
            Students
          </Link>
        </div>
        <div className="HeaderContent_Item">
          <Link
            to="/lessons"
            className={cm('HeaderContent_Link', {
              HeaderContent_Link_active: location.pathname.startsWith('/lessons'),
            })}
            tabIndex={1}
            data-text="Lessons"
          >
            Lessons
          </Link>
        </div>
        <div className="HeaderContent_Item">
          <Link
            to="/trainings"
            className={cm('HeaderContent_Link', {
              HeaderContent_Link_active: location.pathname.startsWith('/trainings'),
            })}
            tabIndex={1}
            data-text="Trainings"
          >
            Trainings
          </Link>
        </div>
      </div>
    </div>
  );
};

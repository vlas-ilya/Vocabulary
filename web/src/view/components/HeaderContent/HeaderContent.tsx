import './HeaderContent.styles.css';
import { KeyboardEventHandler, useCallback, useState } from 'react';
import cm from 'classnames';
import { ReactComponent as Menu } from '../../icons/menu.svg';
import {Link} from "react-router-dom";

export const HeaderContent = () => {
  const [showMenu, setShowMenu] = useState(false);

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
          <Link to="/words" className="HeaderContent_Link" tabIndex={1}>
            Words
          </Link>
        </div>
        <div className="HeaderContent_Item">
          <Link to="/teacher/students" className="HeaderContent_Link" tabIndex={1}>
            Students
          </Link>
        </div>
        <div className="HeaderContent_Item">
          <Link to="/lessons" className="HeaderContent_Link" tabIndex={1}>
            Lessons
          </Link>
        </div>
        <div className="HeaderContent_Item">
          <Link to="/trainings" className="HeaderContent_Link" tabIndex={1}>
            Trainings
          </Link>
        </div>
      </div>
    </div>
  );
};

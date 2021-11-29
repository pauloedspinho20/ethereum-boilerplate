import { useEffect } from 'react';
import Logo from 'components/Logo/Logo';
import PageContainer from 'components/Page/Container';
// import Wallet from 'components/Wallet/Wallet';
import Account from 'components/Account';
import Chains from 'components/Chains';
import NativeBalance from 'components/NativeBalance';
import NavigationItems from './Items';
// import MenuItems from './components/MenuItems';

import './Navigation.scss';

const Navigation = () => {
  // Sticky Header
  useEffect(() => {
    const handler = () => {
      if (window.pageYOffset >= 60) {
        document.body.classList.add('header-is-sticky');
      }
      else {
        document.body.classList.remove('header-is-sticky');
      }
    };

    window.addEventListener('scroll', handler);

    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header id="main-header">
      <PageContainer>
        <div className="row">
          <div className="col">
            <h1 className="main-logo">
              <Logo />
            </h1>

            <nav id="main-nav" className="d-inline-flex">
              <ul className="d-inline-flex">
                <NavigationItems />
              </ul>
              <div className="d-inline-flex">
                <Chains />
                <NativeBalance />
                <Account />
              </div>
            </nav>
            <button
              className="mobile-menu-btn"
              onClick={ () => document.body.classList.toggle('mobile-nav-is-active') }
              type="button"
            >
              <i className="line" />
            </button>
          </div>
        </div>
      </PageContainer>
    </header>
  );
};

export default Navigation;

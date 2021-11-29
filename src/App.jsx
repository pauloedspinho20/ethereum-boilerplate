import { useEffect } from 'react';
import { useMoralis } from 'react-moralis';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import Account from 'components/Account';
import Chains from 'components/Chains';
import ERC20Balance from 'components/ERC20Balance';
import ERC20Transfers from 'components/ERC20Transfers';
import Logo from 'components/Logo/Logo';
import NFTCollection from 'pages/NFTCollection';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import NativeBalance from 'components/NativeBalance';
import './style.css';
import Contract from 'pages/Contract/Contract';
import Text from 'antd/lib/typography/Text';
import MenuItems from './components/MenuItems';

const { Header, Footer } = Layout;

const styles = {
  content: {
    display: 'flex',
    justifyContent: 'center',
    fontFamily: 'Roboto, sans-serif',
    color: '#041836',
    marginTop: '130px',
    padding: '10px',
  },
  header: {
    position: 'fixed',
    zIndex: 1,
    width: '100%',
    background: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: 'Roboto, sans-serif',
    borderBottom: '2px solid rgba(0, 0, 0, 0.06)',
    padding: '0 10px',
    boxShadow: '0 1px 10px rgb(151 164 175 / 10%)',
  },
  headerRight: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    fontSize: '15px',
    fontWeight: '600',
  },
};
const App = () => {
  const {
    isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading,
  } = useMoralis();

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ isAuthenticated, isWeb3Enabled ]);

  return (
    <Layout style={ { height: '100vh', overflow: 'auto' } }>
      <Router>
        <Header style={ styles.header }>
          <Logo />
          <MenuItems />
          <div style={ styles.headerRight }>
            <Chains />
            <NativeBalance />
            <Account />
          </div>
        </Header>

        <div style={ styles.content }>
          { !isAuthenticated ? (
            <>Please login using the Authenticate button</>
          ) : (
            <Switch>
              <Route path="/wallet">
                <ERC20Balance />
                <ERC20Transfers />
              </Route>
              <Route path="/collection">
                <NFTCollection />
              </Route>
              <Route path="/contract">
                <Contract />
              </Route>
              <Route path="/nonauthenticated">
                <>Please login using the Authenticate button</>
              </Route>
            </Switch>
          ) }
        </div>
      </Router>
      <Footer style={ { textAlign: 'center' } }>
        <Text style={ { display: 'block' } }>
          { process.env.REACT_APP_CONTRACT_ADDRESS }
        </Text>
      </Footer>
    </Layout>
  );
};

export default App;

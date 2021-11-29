import { useNativeBalance } from 'react-moralis';

function NativeBalance(props) {
  const { data: balance } = useNativeBalance(props);

  return <div>{ balance.formatted }</div>;
}

export default NativeBalance;

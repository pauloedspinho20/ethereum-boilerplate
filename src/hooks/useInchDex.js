import { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { useMoralisDapp } from 'providers/MoralisDappProvider/MoralisDappProvider';

const useInchDex = chain => {
  const { Moralis } = useMoralis();
  const { walletAddress } = useMoralisDapp();
  const [ tokenList, setTokenlist ] = useState();

  useEffect(() => {
    if (!Moralis?.Plugins?.oneInch) return null;
    Moralis.Plugins.oneInch
      .getSupportedTokens({ chain })
      .then(tokens => setTokenlist(tokens.tokens));

    return () => {};
  }, [ Moralis, chain ]);

  const getQuote = params => Moralis.Plugins.oneInch.quote({
    chain: params.chain, // The blockchain  you want to use (eth/bsc/polygon)
    fromTokenAddress: params.fromToken.address, // The token you want to swap
    toTokenAddress: params.toToken.address, // The token you want to receive
    amount: Moralis.Units.Token(
      params.fromAmount,
      params.fromToken.decimals,
    ).toString(),
  });

  function doSwap(params) {
    return Moralis.Plugins.oneInch.swap({
      chain: params.chain, // The blockchain you want to use (eth/bsc/polygon)
      fromTokenAddress: params.fromToken.address, // The token you want to swap
      toTokenAddress: params.toToken.address, // The token you want to receive
      amount: Moralis.Units.Token(
        params.fromAmount,
        params.fromToken.decimals,
      ).toString(),
      fromAddress: walletAddress, // Your wallet address
      slippage: 1,
    });
  }

  async function trySwap(params) {
    const { fromToken, fromAmount, chain } = params;
    const amount = Moralis.Units.Token(
      fromAmount,
      fromToken.decimals,
    ).toString();
    if (fromToken.address !== '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
      await Moralis.Plugins.oneInch
        .hasAllowance({
          chain, // The blockchain you want to use (eth/bsc/polygon)
          fromTokenAddress: fromToken.address, // The token you want to swap
          fromAddress: walletAddress, // Your wallet address
          amount,
        })
        .then(async allowance => {
          console.log(allowance);
          if (!allowance) {
            await Moralis.Plugins.oneInch.approve({
              chain, // The blockchain you want to use (eth/bsc/polygon)
              tokenAddress: fromToken.address, // The token you want to swap
              fromAddress: walletAddress, // Your wallet address
            });
          }
        })
        .catch(e => console.log(e.message));
    }

    await doSwap(params)
      .then(receipt => {
        if (receipt.statusCode !== 400) {
          console.log('Swap Complete');
        }
        console.log(receipt);
      })
      .catch(e => console.log(e.message));
  }

  return { getQuote, trySwap, tokenList };
};

export default useInchDex;

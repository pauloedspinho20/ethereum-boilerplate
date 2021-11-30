import { useRef, useState } from 'react';
import Button from 'components/Button/Button';
import Canvas from './Canvas';

const MintCanvas = () => {
  const elementRef = useRef();

  const colors = [
    { name: 'yellow', code: '#ffbf46' }, // Maximum Yellow Red
    { name: 'orage', code: '#ff6542' }, // Portland Orange
  ];
  const getRandomNumber = (min, max) => Math.floor((Math.random() * (max - min)) + min);

  const getRandomColor = () => {
    const random = getRandomNumber(0, colors?.length);
    const randomColor = colors?.splice(random, 1)[0];
    return randomColor.code;
  };
  const background = getRandomColor();

  const [ name, setName ] = useState('');
  const [ description, setDescription ] = useState('');
  /* const [ loading, setLoading ] = useState(false);
  const [ status, setStatus ] = useState(''); */

  const clearCanvas = () => {
    const canvasEl = elementRef.current;
    canvasEl.clear();
  };

  /* const mint = _uri => {
      blockchain.smartContract.methods
      .mint(blockchain.account, _uri)
      .send({ from: blockchain.account })
      .once('error', err => {
        console.log(err);
        setLoading(false);
        setStatus('Error');
      })
      .then(receipt => {
        console.log(receipt);
        setLoading(false);
        clearCanvas();
        dispatch(fetchData(blockchain.account));
        setStatus('Successfully minting your NFT');
      });
  }; */

  /*   const createMetaDataAndMint = async (_name, _des, _imgBuffer) => {
    setLoading(true);
    setStatus('Uploading to IPFS');
    try {
      const addedImage = await ipfsClient.add(_imgBuffer);
      const metaDataObj = {
        name: _name,
        description: _des,
        image: ipfsBaseUrl + addedImage.path,
      };
      const addedMetaData = await ipfsClient.add(JSON.stringify(metaDataObj));
      console.log(ipfsBaseUrl + addedMetaData.path);
      mint(ipfsBaseUrl + addedMetaData.path);
    }
    catch (err) {
      console.log(err);
      setLoading(false);
      setStatus('Error');
    }
  };
 */

  const getImageData = () => {
    const canvasEl = elementRef.current;
    const dataUrl = canvasEl.toDataURL('image/png');
    const buffer = Buffer.from(dataUrl.split(',')[1], 'base64');
    return buffer;
  };

  const startMintingProcess = () => {
    console.log(getImageData());
    // createMetaDataAndMint(name, description, getImageData());
  };

  return (
    <div className="canvas">
      <div className="d-flex justify-content-center mb-4">
        { background && (
        <Canvas
          elementRef={ elementRef }
          background={ background }
        />
        ) }
      </div>
      <div className="row justify-content-center">
        <div className="col-6">
          <label htmlFor="nft-name" className="form-label">NFT Name</label>
          <div className="input-group mb-3">
            <input
              id="nft-name"
              type="text"
              value={ name }
              className="form-control"
              placeholder="NFT name"
              aria-label="NFT name"
              onChange={ ({ target: { value } }) => {
                setName(value);
              } }

            />
          </div>

          <label htmlFor="nft-description" className="form-label">NFT Description</label>
          <div className="input-group mb-3">
            <input
              id="nft-description"
              type="text"
              value={ description }
              className="form-control"
              placeholder="NFT description"
              aria-label="NFT description"
              onChange={ ({ target: { value } }) => {
                setDescription(value);
              } }

            />
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <Button
          theme="blue"
          size="s"
          onClick={ e => {
            e.preventDefault();
            clearCanvas();
          } }
          className="me-4"
        >
          Clear
        </Button>
        <Button
          theme="orange"
          size="s"
          onClick={ e => {
            e.preventDefault();
            startMintingProcess();
          } }
        >
          Mint
        </Button>
      </div>
    </div>

  );
};

export default MintCanvas;

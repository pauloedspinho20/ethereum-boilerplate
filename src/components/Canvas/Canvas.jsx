import { shape, string } from 'prop-types';
import SignatureCanvas from 'react-signature-canvas';

const Canvas = ({ elementRef, background }) => {
  if (background !== '' !== '') {
    return (
      <SignatureCanvas
        backgroundColor={ background }
        penColor="#37393a"
        canvasProps={ { width: 512, height: 512 } }
        ref={ elementRef }
      />
    );
  }
  return null;
};

Canvas.propTypes = {
  background: string,
  elementRef: shape({}),
};

Canvas.defaultProps = {
  background: '',
  elementRef: null,
};
export default Canvas;

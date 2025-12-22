// import { colors } from "../../../assets/constants/colors";
// import { PictureIcon } from "../../../assets/svg/PictureIcon";

import { ImageIcon } from 'lucide-react';
import { colors } from '../../../assets/constant/colors';

type tUploadProps = {
  getRootProps: any;
  getInputProps: any;
  isDragActive: any;
  imgUploaded?: any;
  height?: string | number;
  width?: string | number;
  is_one?: boolean;
  onDrop?: (file: File[]) => void;
};

export const Upload = ({
  getRootProps,
  getInputProps,
  isDragActive,
  imgUploaded,
  height = 200,
  width = '100%',
  is_one = false,
  onDrop = () => {},
}: tUploadProps) => {
  return (
    <div
      {...getRootProps()}
      className='flex-col-center-center w-full upload'
      style={{
        borderColor: isDragActive ? colors.dark[500] : colors.dark[500],
        width,
        height,
        gap: '1rem',
      }}
    >
      {!isDragActive && !imgUploaded && (
        <>
          <input {...getInputProps()} />
          <ImageIcon />
          <p className='upload--title'>
            Glisser déposer {is_one ? 'une image' : 'des images (4 images max)'}{' '}
            ici, ou cliquez pour ajouter{' '}
            {is_one ? 'une image' : 'des images (4 images max)'} <br />
          </p>
        </>
      )}
      {isDragActive && (
        <p className='upload--title'>Déposez le document ici...</p>
      )}
    </div>
  );
};

import { Trash2Icon } from 'lucide-react';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { colors } from '../../../assets/constant/colors';

interface ReadPictureProps {
  picture: string | File | ImageData;
  index?: number;
  handleDelete?: (index: number) => void;
  height?: string | number;
  width?: string | number;
  status?: string;
  isLoading?: boolean;
}

export const ReadPicture: React.FC<ReadPictureProps> = ({
  picture,
  index,
  handleDelete,
  height,
  width,
  status,
  isLoading,
}) => {
  const [imageError, setImageError] = React.useState<boolean>(false);

  return (
    <>
      {isLoading ? (
        <Skeleton count={1} width={100} height={'100%'} />
      ) : (
        <div className='readPicture' style={{ height, width }}>
          {picture && status !== 'accepted' && (
            <button
              style={{ right: '.5rem' }}
              className='readPicture--btn'
              onClick={() => handleDelete?.(index as number)}
              aria-label='Delete image'
            >
              <Trash2Icon size={18} color={colors.blue['300']} />
            </button>
          )}

          <div className='readPicture--img'>
            {!imageError ? (
              <img
                src={
                  typeof picture === 'string'
                    ? picture
                    : URL.createObjectURL(picture as File)
                }
                alt={
                  typeof picture !== 'string' && picture instanceof File
                    ? picture.name
                    : 'Uploaded image'
                }
                onError={() => setImageError(true)}
                crossOrigin='anonymous'
              />
            ) : (
              <div className='error-message'>Failed to load image</div>
            )}
            {typeof picture !== 'string' && picture instanceof File && (
              <p>{picture.name}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

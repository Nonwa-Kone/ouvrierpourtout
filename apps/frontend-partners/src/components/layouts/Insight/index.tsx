import { ChartNoAxesColumn } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Insight = () => {
  return (
    <div className='insight'>
      <div className='insight-item'>
        <div className='insight-item-content'>
          <div className='insight-item-content-column'>
            <p className='insight-item-content-column-label'>
              Demande en attente
            </p>
            <h1 className='insight-item-content-column-value'>0</h1>
          </div>
          <div className='insight-item-content-column'>
            <span>
              <ChartNoAxesColumn className='stats-icon' />
            </span>
          </div>
        </div>
        <div className='insight-item-detail'>
          <span>+5%</span>
          <span>
            <Link to='/demandes'>
              <span>Voir plus</span>
            </Link>
          </span>
        </div>
      </div>
      <div className='insight-item'>
        <div className='insight-item-content'>
          <div className='insight-item-content-column'>
            <p className='insight-item-content-column-label'>
              Demande acceptée
            </p>
            <h1 className='insight-item-content-column-value'>0</h1>
          </div>
          <div className='insight-item-content-column'>
            <span>
              <ChartNoAxesColumn className='stats-icon' />
            </span>
          </div>
        </div>
        <div className='insight-item-detail'>
          <span>+3%</span>
          <span>
            <Link to='/demandes'>
              <span>Voir plus</span>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

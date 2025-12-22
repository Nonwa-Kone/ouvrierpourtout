import { withOnlineLayout } from '../../../hoc/withOnlineLayout';

export const Partners = withOnlineLayout(() => {
  return (
    <div className='partnersPage'>
      <div className='partnersPage-block--partners'>
        <div className='partnersPage-block--partners-title'>
          <h3>Partenaires</h3>
        </div>
        <div className='partnersPage-block--partners-body'></div>
      </div>
    </div>
  );
});

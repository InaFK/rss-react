import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { unselectAll } from '../../features/selectedItemsSlice';
import { saveAs } from 'file-saver';
import './SelectedItemsFlyout.css';

const SelectedItemsFlyout = () => {
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector((state) => state.selectedItems.items);

  if (selectedItems.length === 0) {
    return null;
  }

  const handleUnselectAll = () => {
    dispatch(unselectAll());
  };

  const handleDownload = () => {
    const csvContent = `id,name,description,detailsUrl\n${selectedItems
      .map(item => `${item.id},${item.name},${item.description},${item.detailsUrl}`)
      .join('\n')}`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${selectedItems.length}_items.csv`);
  };

  return (
    <div className="flyout">
      <p>{selectedItems.length} item(s) selected</p>
      <div className='button-set'>
        <button onClick={handleUnselectAll}>Unselect All</button>
        <button onClick={handleDownload}>Download</button>
      </div>
    </div>
  );
};

export default SelectedItemsFlyout;

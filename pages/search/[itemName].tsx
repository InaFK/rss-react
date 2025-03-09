import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { wrapper } from '@/store'; // adj
import { useGetItemByNameQuery } from '@/features/api'; // adj
import { selectItem } from '@/features/selectedItemsSlice'; // adj
import DetailsPanel from '@/components/DetailsPanel/DetailsPanel'; // adj

const ItemDetailsPage = ({ initialData }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { itemName, page = '1' } = router.query;
  const currentPage = parseInt(page as string, 10);

  const { data: itemData, isLoading, error } = useGetItemByNameQuery(itemName as string, {
    skip: !itemName || !!initialData,
  });

  useEffect(() => {
    if (itemName) {
      const item = initialData || itemData;
      if (item) {
        dispatch(selectItem({ id: item.name, name: item.name, description: `Height: ${item.height}, Weight: ${item.weight}`, detailsUrl: `/search/${itemName}?page=${currentPage}` }));
      }
    }
  }, [itemName, currentPage, initialData, itemData, dispatch]);

  return (
    <DetailsPanel
      item={initialData || itemData}
      loading={isLoading}
      error={error || initialData?.error}
    />
  );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { itemName, page = '1' } = context.params as { itemName: string; page?: string };
    const currentPage = parseInt(page, 10);

    let itemData = null;
    let error = null;

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${itemName}`);
      if (response.ok) {
        itemData = await response.json();
      } else {
        error = 'Item not found';
      }
    } catch (err) {
      error = err.message;
    }

    return {
      props: {
        initialData: itemData ? { ...itemData, error } : { error },
      },
    };
  }
);

export default ItemDetailsPage;
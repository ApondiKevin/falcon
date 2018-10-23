import React, { MouseEventHandler } from 'react';
import { NetworkStatus } from 'apollo-client';
import {
  themed,
  H1,
  Text,
  Divider,
  Icon,
  Button,
  Box,
  FlexLayout,
  Dropdown,
  DropdownLabel,
  DropdownMenu,
  DropdownMenuItem
} from '@deity/falcon-ui';
import { ProductsList } from '../Product/Products';

const CategoryLayout = themed({
  tag: 'div',

  defaultTheme: {
    productsCategory: {
      display: 'grid',
      gridGap: 'md',
      my: 'lg',
      css: {
        textAlign: 'center'
      }
    }
  }
});

export const SortOrderDropdown: React.SFC<any> = ({ sortOrders, onChange }) => {
  const activeSortOrder = sortOrders.filter((sortOrder: any) => sortOrder.active)[0];

  return (
    <Box display="flex">
      <Dropdown width="100%" onChange={onChange}>
        <DropdownLabel>{activeSortOrder.name}</DropdownLabel>

        <DropdownMenu>
          {sortOrders.map((sortOrder: any) => (
            <DropdownMenuItem key={sortOrder.name} value={sortOrder}>
              {sortOrder.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </Box>
  );
};
export const CategoryToolbar: React.SFC<{ translations: { showingOutOf: string }; sortOrders: any }> = ({
  translations,

  sortOrders
}) => (
  <FlexLayout justifyContent="space-between" alignItems="center">
    <Text>{translations.showingOutOf}</Text>
    <FlexLayout alignItems="center">
      <Text mr="md">Sort by</Text>
      <SortOrderDropdown sortOrders={sortOrders} />
    </FlexLayout>
  </FlexLayout>
);

export const ShowMore: React.SFC<{ text: string; onClick?: MouseEventHandler; loading: boolean }> = ({
  text,
  onClick,
  loading
}) => (
  <Box my="lg" onClick={onClick || (() => {})}>
    <Button variant="secondary">
      {text}
      {loading && <Icon src="loader" ml="sm" size={16} />}
    </Button>
  </Box>
);

export const Category: React.SFC<{
  category: { name: string };
  products: any;
  sortOrders: any[];
  translations: any;
  fetchMore: any;
  networkStatus: NetworkStatus;
}> = ({ category, products, sortOrders, translations, fetchMore, networkStatus }) => {
  const { pagination, items } = products;

  return (
    <CategoryLayout>
      <H1>{category.name}</H1>
      <CategoryToolbar
        sortOrders={sortOrders}
        translations={{ showingOutOf: translations.category.pagination.showingOutOf }}
      />
      <Divider />
      <ProductsList products={items} />
      <Divider />

      {pagination.nextPage && (
        <ShowMore
          text={translations.category.pagination.showMore}
          onClick={fetchMore}
          loading={networkStatus === NetworkStatus.fetchMore}
        />
      )}
    </CategoryLayout>
  );
};

import gql from 'graphql-tag';
import { Query } from '@deity/falcon-data';
import { Address } from '@deity/falcon-shop-extension';

export type AddressListResponse = {
  addresses: {
    items: Address[];
  };
};

export const GET_ADDRESS_LIST = gql`
  query Addresses {
    addresses {
      items {
        id
        firstname
        lastname
        telephone
        street
        city
        postcode
        region
        regionId
        countryId
        company
        defaultBilling
        defaultShipping
      }
    }
  }
`;

export class AddressListQuery extends Query<AddressListResponse> {
  static defaultProps = {
    query: GET_ADDRESS_LIST
  };
}
import priceBindIndex from './bid/pBidIndex'
import priceOfferIndex from './offer/pOfferIndex'
import priceOfferEdit from './offer/pOfferEdit'

export default [
  //FIXME 报价管理
  {
    path: 'priceBindIndex',
    name: 'priceBindIndex',
    component: priceBindIndex
  },
  {
    path: 'priceOfferIndex',
    name: 'priceOfferIndex',
    component: priceOfferIndex
  },
  {
    path: 'priceOfferEdit',
    name: 'priceOfferEdit',
    component: priceOfferEdit
  },
];

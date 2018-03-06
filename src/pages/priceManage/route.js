const priceBindIndex =()=>import( './bid/pBidIndex')
const priceOfferIndex =()=>import( './offer/pOfferIndex')
const priceOfferEdit =()=>import( './offer/pOfferEdit')

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
    path: 'priceOfferEdit/:id',
    name: 'priceOfferEdit',
    component: priceOfferEdit
  },
];

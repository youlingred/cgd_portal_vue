const priceBindIndex =()=>import( './bid/pBidIndex')
const priceOfferIndex =()=>import( './offer/pOfferIndex')
const priceOfferDetail =()=>import( './offer/pOfferDetail')

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
    path: 'priceOfferDetail/:type/:id',
    name: 'priceOfferDetail',
    component: priceOfferDetail
  },
];

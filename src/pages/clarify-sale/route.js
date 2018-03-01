const saleClarifyOfferIndex =()=>import( './offer/saleClarifyOfferIndex')
const saleClarifyOfferEdit =()=>import( './offer/saleClarifyOfferEdit')
const saleClarifyOfferDetailSend =()=>import( './offer/saleClarifyOfferDetailSend')
const saleClarifyOfferDetailReceive =()=>import( './offer/saleClarifyOfferDetailReceive')
const saleClarifyReviewIndex =()=>import( './review/saleClarifyReviewIndex')
const saleClarifyReviewEdit =()=>import( './review/saleClarifyReviewEdit')
const saleClarifyReviewDetailReply =()=>import( './review/saleClarifyReviewDetailReply')
const saleClarifyReviewDetailReceive =()=>import( './review/saleClarifyReviewDetailReceive')

export default [
   //FIXME 澄清管理
    {
      path: 'saleClarifyOfferIndex',
      name: 'saleClarifyOfferIndex',
      component: saleClarifyOfferIndex
    },
    {
      path: 'saleClarifyOfferEdit',
      name: 'saleClarifyOfferEdit',
      component: saleClarifyOfferEdit
    },
    {
      path: 'saleClarifyOfferDetailSend/:id',
      name: 'saleClarifyOfferDetailSend',
      component: saleClarifyOfferDetailSend
    },
    {
      path: 'saleClarifyOfferDetailReceive/:id',
      name: 'saleClarifyOfferDetailReceive',
      component: saleClarifyOfferDetailReceive
    },
    {
      path: 'saleClarifyReviewIndex',
      name: 'saleClarifyReviewIndex',
      component: saleClarifyReviewIndex
    },
    {
      path: 'saleClarifyReviewEdit/:id',
      name: 'saleClarifyReviewEdit',
      component: saleClarifyReviewEdit
    },
    {
      path: 'saleClarifyReviewDetailReply/:id',
      name: 'saleClarifyReviewDetailReply',
      component: saleClarifyReviewDetailReply
    },
    {
      path: 'saleClarifyReviewDetailReceive/:id',
      name: 'saleClarifyReviewDetailReceive',
      component: saleClarifyReviewDetailReceive
    },
];

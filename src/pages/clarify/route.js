const clarifyOfferIndex =()=>import( './offer/clarifyOfferIndex')
const clarifyOfferEdit =()=>import( './offer/clarifyOfferEdit')
const clarifyOfferDetailSend =()=>import( './offer/clarifyOfferDetailSend')
const clarifyOfferDetailReceive =()=>import( './offer/clarifyOfferDetailReceive')
const clarifyReviewIndex =()=>import( './review/clarifyReviewIndex')
const clarifyReviewEdit =()=>import( './review/clarifyReviewEdit')
const clarifyReviewDetailReply =()=>import( './review/clarifyReviewDetailReply')
const clarifyReviewDetailReceive =()=>import( './review/clarifyReviewDetailReceive')

export default [
   //FIXME 澄清管理
    {
      path: 'clarifyOfferIndex',
      name: 'clarifyOfferIndex',
      component: clarifyOfferIndex
    },
    {
      path: 'clarifyOfferEdit',
      name: 'clarifyOfferEdit',
      component: clarifyOfferEdit
    },
    {
      path: 'clarifyOfferDetailSend/:id',
      name: 'clarifyOfferDetailSend',
      component: clarifyOfferDetailSend
    },
    {
      path: 'clarifyOfferDetailReceive/:id',
      name: 'clarifyOfferDetailReceive',
      component: clarifyOfferDetailReceive
    },
    {
      path: 'clarifyReviewIndex',
      name: 'clarifyReviewIndex',
      component: clarifyReviewIndex
    },
    {
      path: 'clarifyReviewEdit',
      name: 'clarifyReviewEdit',
      component: clarifyReviewEdit
    },
    {
      path: 'clarifyReviewDetailReply/:id',
      name: 'clarifyReviewDetailReply',
      component: clarifyReviewDetailReply
    },
    {
      path: 'clarifyReviewDetailReceive/:id',
      name: 'clarifyReviewDetailReceive',
      component: clarifyReviewDetailReceive
    },
];

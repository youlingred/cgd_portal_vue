import clarifyOfferIndex from './/offer/clarifyOfferIndex'
import clarifyOfferEdit from './/offer/clarifyOfferEdit'
import clarifyOfferDetailSend from './/offer/clarifyOfferDetailSend'
import clarifyOfferDetailReceive from './/offer/clarifyOfferDetailReceive'
import clarifyReviewIndex from './/review/clarifyReviewIndex'
import clarifyReviewEdit from './/review/clarifyReviewEdit'
import clarifyReviewDetailReply from './/review/clarifyReviewDetailReply'
import clarifyReviewDetailReceive from './/review/clarifyReviewDetailReceive'

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
      path: 'clarifyOfferDetailSend',
      name: 'clarifyOfferDetailSend',
      component: clarifyOfferDetailSend
    },
    {
      path: 'clarifyOfferDetailReceive',
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
      path: 'clarifyReviewDetailReply',
      name: 'clarifyReviewDetailReply',
      component: clarifyReviewDetailReply
    },
    {
      path: 'clarifyReviewDetailReceive',
      name: 'clarifyReviewDetailReceive',
      component: clarifyReviewDetailReceive
    },
];

const getters = {
  // getCount: state => state.count,
  companyName:state=>state.userInfo.companyName,
  companyId:state=>state.userInfo.companyId,
  userName:state=>state.userInfo.userName
}

export default getters

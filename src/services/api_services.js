import axios from "axios"
import { useSelector } from "react-redux"
const baseURL = 'https://api.anastomosys.com/user'
const ChatBaseURL='https://api.anastomosys.com/chat'
const ImagebaseURL = 'https://api.anastomosys.com/upload'


const DocumentURL = 'https://api.anastomosys.com/upload'
const VedioUpload='https://api.anastomosys.com/upload/Upload_Video'



const user = JSON.parse(sessionStorage.getItem('user_data') || "{}");
const pubNub = JSON.parse(sessionStorage.getItem('Pub_Nub') || "{}");

 export  const userDetails = {
    userID: !sessionStorage.key('user_data') ? null : user.USERID,
    sessionID: !sessionStorage.key('user_data')  ? null : user.All_Device_Sessions[user.All_Device_Sessions.length - 1].SessionID,
    ApiKey: "TESTING123",
    publishKey:pubNub.publishKey,
    subscribeKey:pubNub.subscribeKey,
    secretKey:pubNub.secretKey
}
// console.log("pubNub api service",pubNub)
// console.log("pubNub api service user",user)
//login section
export const Services = {
    splashScreenUrl: `${baseURL}/Application_Splash_Screen`,
    validuserUrl: `${baseURL}/Validate_User_Credentials`,
    userProfileInfoUrl: `${baseURL}/Fetch_User_Complete_Information`,
    updateUserInfoUrl: `${baseURL}/Update_Profile_Information`,
    uploadImgUrl: `${ImagebaseURL}/Upload_Image`,
    uploadGifImgUrl: `${ImagebaseURL}/Upload_GIF`,
    uploadVedioUrl:`${VedioUpload}`,
    uploadDocUrl: `${DocumentURL}/Upload_Document`,
    updateUserImgUrl: `${baseURL}/Update_Image_Information`,
    updateUserCoverImgUrl: `${baseURL}/Update_Cover_Picture`,
    filterDeptListUrl: `${baseURL}/Filter_All_Departments`,
    filterspecialisationUrl: `${baseURL}/Filter_All_Specialisations`,
    UpdateProfessionalDetailsUrl: `${baseURL}/Update_Professional_Details`,
    allFollowersUserUrl: `${baseURL}/Fetch_All_Follower_Users`,
    allFollowingUserUrl: `${baseURL}/Fetch_All_Following_Users`,
    selectedUserinfoUrl:`${baseURL}/Fetch_Selected_User_Complete_Information`,
    selectedUserFollowing:`${baseURL}/Fetch_All_Selected_User_Following_Users`,
    selectedUserPostUrl:`${baseURL}/Fetch_All_Selected_User_Regular_Posts`,
    selectedUserFollowers:`${baseURL}/Fetch_All_Selected_User_Follower_Users`,
    selectedUserEducationUrl:`${baseURL}/Filter_All_Education_Other_User`,
    FetchAllSelectedUserRegularPostsUrl:`${baseURL}/Fetch_All_Selected_User_Regular_Posts`,
    selectedUserExperienceUrl:`${baseURL}/Filter_All_Experience_Other_User`,
    unFollowUrl:`${baseURL}/Unfollow_User`,
    FollowUserUrl:`${baseURL}/Follow_User`,
    blockUserUrl:`${baseURL}/Block_User`,
    FetchAllHomeTrendingRegularPostsUrl:`${baseURL}/Fetch_All_Home_Trending_Regular_Posts`,
    FetchAllHomeForYouRegularPosts:`${baseURL}/Fetch_All_Home_For_You_Regular_Posts`,
    Filter_All_Created_Regualar_PostsUrl:`${baseURL}/Filter_All_Created_Regualar_Posts`,
    CreateRegularPostUrl:`${baseURL}/Create_Regular_Post`,
    InnerShareRegularPostUrl:`${baseURL}/Inner_Share_Regular_Post`,
    giveLikeToPostUrl :`${baseURL}/Give_Like_To_Post`,
    removeLikeFromPostUrl:`${baseURL}/Remove_Like_From_Post`,
    AddPostCommentUrl:`${baseURL}/Add_Post_Comment`,
    filterAllCommentUrl:`${baseURL}/Filter_All_Post_Comments`,
    deletePostComemtUrl:`${baseURL}/Remove_Post_Comment`,
    savePostUrl:`${baseURL}/Save_Post`,
    unSavePostUrl:`${baseURL}/Un_Save_Post`,
    FilterAllRegularSavedPostsUrl:`${baseURL}/Filter_All_Regular_Saved_Posts`,
    FetchRegularPostCompleteInfoUrl:`${baseURL}/Fetch_Regular_Post_Complete_Information`,
    removeRegularPost:`${baseURL}/Remove_Regular_Post`,
    editRegularPostUrl:`${baseURL}/Edit_Regular_Post`,
    filterAllReportUrl:`${baseURL}/Fetch_All_Reports`,
    reportOnPostUrl:`${baseURL}/Report_Post`,
    reportOnUserUrl:`${baseURL}/Report_Profile_User`,
    fetchAllUserReportUrl:`${baseURL}/Fetch_All_Profile_Reports`,
    editPostCommentUrl:`${baseURL}/Edit_Post_Comment`,
    filterAllMyResearchUrl:`${baseURL}/Filter_All_My_Publications`,
    myResearchReviewerUrl:`${baseURL}/Filter_All_Reviewers`,
    EditPublicationUrl:`${baseURL}/Edit_Publication`,
    sendReviewRequestUrl:`${baseURL}/Send_Review_Request`,
    sendQuotesUrl :`${baseURL}/Send_Quote`,
    acceptQoutUrl :`${baseURL}/Accept_Quote`,
    rejectQoutUrl :`${baseURL}/Reject_Quote`,
    PublishPaperUrl: `${baseURL}/Publish_Paper`,
    ReviewPublicationSuccessfullyUrl:`${baseURL}/Review_Publication_Successfully`,
    FilterAllReceivedReviewRequestsUrl:`${baseURL}/Filter_All_Received_Review_Requests`,
    fetchReviewRequestDetailsUrl:`${baseURL}/Fetch_Review_Request_Complete_Information`,
    FiltersendReviewRequestsUrl:`${baseURL}/Filter_All_My_Sent_Review_Requests`,
    myResearchDetailsUrl:`${baseURL}/Fetch_Publication_Complete_Information`,
    cretaeMyResearchUrl:`${baseURL}/Create_Publication`,
    removeMyResearchUrl:`${baseURL}/Remove_Publication`,
    fillterUserPublicationUrl:`${baseURL}/Filter_User_Publications`,
    selectedUserInfoUrl:`${baseURL}/Fetch_Selected_User_Complete_Information`,
    FilterAllEducationSelfUrl:`${baseURL}/Filter_All_Education_Self`,
    filterAllUniversityUrl:`${baseURL}/Filter_All_Universities`,
    filterAllExperienceUrl:`${baseURL}/Filter_All_Experience_Self`,
    removeExperienceUrl:`${baseURL}/Remove_Experience`,
    EditExperienceUrl:`${baseURL}/Edit_Existing_Experience_Detail`,
    FilterAllCreatedRegualarPosts:`{baseURL}/Filter_All_Created_Regualar_Posts`,
    filterAllCompaniesUrl :`${baseURL}/Filter_All_Companies`,
    removeMyEducationUrl:`${baseURL}/Remove_Education`,
    createMyEducationUrl:`${baseURL}/Create_Education`,
    EditMyEducationUrl:`${baseURL}/Edit_Existing_Education_Detail`,
    CreateExperienceUrl :`${baseURL}/Create_Experience`,
    SearchAllUsersUrl :`${baseURL}/Search_All_Users`,
    SearchOnlyUsersUrl :`${baseURL}/Search_Only_Users`,
    SearchPostUrl :`${baseURL}/Search_Posts`,
    SearchOnlyReviewersUrl :`${baseURL}/Search_Only_Reviewers`,
    SubmitUserReviewerRequestUrl :`${baseURL}/Submit_User_Reviewer_Request`,
    FetchAllBlockedUserUrl :`${baseURL}/Fetch_All_Blocked_Users`,
    UnBlockUserUrl :`${baseURL}/UnBlock_User`,
    FilterAllTrendingReviewers:`${baseURL}/Filter_All_Trending_Reviewers`,
    FilterAllTrendingUsers:`${baseURL}/Filter_All_Trending_Users`,
    FilterAllEventsUrl:`${baseURL}/Filter_All_Events`,
    FetchEventCompleteInfoUrl:`${baseURL}/Fetch_Event_Complete_Information`,
    FilterMyEventsUrl:`${baseURL}/Filter_My_Events`,
    RemoveEventUrl:`${baseURL}/Remove_Event`,
    CancelEventUrl:`${baseURL}/Cancel_Event`,
    CreateEventUrl:`${baseURL}/Create_Event`,
    EditEventUrl:`${baseURL}/Edit_Event`,
    BookEventUrl : `${baseURL}/Book_Event`,
    FilterAllEventJoineesUrl : `${baseURL}/Filter_All_Event_Joinees`,
    FetchEventBookingInformationUrl : `${baseURL}/Fetch_Event_Booking_Complete_Information`,
    FilterAllMyBookedEventUrl : `${baseURL}/Filter_All_My_Booked_Events`,
    CancelEventBookingUrl : `${baseURL}/Cancel_Event_Booking`,
    FetchRegularPostBasicInfoUrl: `${baseURL}/Fetch_Regular_Post_Basic_Information`,
    FetchPubnubInformationUrl: `${baseURL}/Fetch_Pubnub_Information`,

    //chat url
    CreateFetchIndividualChatroomUrl:`${ChatBaseURL}/Create_Fetch_Individual_Chatroom`,
    FilterAllChatroomUrl:`${ChatBaseURL}/Filter_All_Chatrooms`,
    FilterAllChatroomUrl:`${ChatBaseURL}/Filter_All_Chatrooms`,
    FilterAllNewChatroomRequestUrl:`${ChatBaseURL}/Filter_All_New_Chatroom_Requests`,
    ApproveChatRequestUrl:`${ChatBaseURL}/Approve_Chat_Request`,
    RejectChatRequestUrl:`${ChatBaseURL}/Reject_Chat_Request`,
    SearchAllChatroomsUrl:`${ChatBaseURL}/Search_All_Chatrooms`,
    FilterAllChatroomChatUrl:`${ChatBaseURL}/Filter_All_Chatroom_Chats`,
    ChatroomPostChatUrl:`${ChatBaseURL}/Chatroom_Post_Chat`,
    RemoveOneChatPostSelfUrl:`${ChatBaseURL}/Remove_One_Chat_Post_Self`,
    RemoveSelfChatPostforAllUrl:`${ChatBaseURL}/Remove_Self_Chat_Post_for_All`,
    RemoveAllChatPostSelfUrl:`${ChatBaseURL}/Remove_All_Chat_Post_Self`,
    MuteChatroomUrl:`${ChatBaseURL}/Mute_Chatroom`,
    UnmuteChatroomUrl:`${ChatBaseURL}/Unmute_Chatroom`,
    RemoveChatroomUrl: `${ChatBaseURL}/Remove_Chatroom`,



}

//login
export const SplashScreen = async (body) => {
    const splash = await axios.post(Services.splashScreenUrl, body)
    return splash
}
export const FetchPubnubInformation = async (body) => {
    const pubNub = await axios.post(Services.FetchPubnubInformationUrl, body)
    return pubNub
}
export const validUser = async (body) => {
    const user = await axios.post(Services.validuserUrl, body)
    return user
}

// user profile
export const userProfileInfo = async (body) => {
    const info = await axios.post(Services.userProfileInfoUrl, body)
    return info
}
export const SubmitUserReviewerRequest = async (body) => {
    const review = await axios.post(Services.SubmitUserReviewerRequestUrl, body)
    return review
}
export const UpateUserInfo = async (body) => {
    const update = await axios.post(Services.updateUserInfoUrl, body)
    return update
}
export const UploadUserImage = async (body) => {
    const upload = await axios.post(Services.uploadImgUrl, body)
    return upload
}
export const UpdateUserImage = async (body) => {
    const update = await axios.post(Services.updateUserImgUrl, body)
    return update
}
export const UpdateUserCoverImage = async (body) => {
    const cover = await axios.post(Services.updateUserCoverImgUrl, body)
    return cover
}
export const filterAllDepartment = async (body) => {
    const dept = await axios.post(Services.filterDeptListUrl, body)
    return dept
}
export const filterAllspecialisation = async (body) => {
    const dept = await axios.post(Services.filterspecialisationUrl, body)
    return dept
}
export const UpdateProfessionDetails = async (body) => {
    const profession = await axios.post(Services.UpdateProfessionalDetailsUrl, body)
    return profession
}

export const FilterAllMyResearchPublic = async (body) => {
    const research = await axios.post(Services.filterAllMyResearchUrl, body)
    return research
}
export const myAllEducation = async (body) => {
    const edu = await axios.post(Services.FilterAllEducationSelfUrl, body)
    return edu
}
export const FilterAllUniversity = async (body) => {
    const university = await axios.post(Services.filterAllUniversityUrl, body)
    return university
}
export const FilterAlMyExperience = async (body) => {
    const exe = await axios.post(Services.filterAllExperienceUrl, body)
    return exe
}
export const EditMyExperience = async (body) => {
    const edit = await axios.post(Services.EditExperienceUrl, body)
    return edit
}
export const RemoveMyExperience = async (body) => {
    const remove = await axios.post(Services.removeExperienceUrl, body)
    return remove
}
export const RemoveMyEducation = async (body) => {
    const remove = await axios.post(Services.removeMyEducationUrl, body)
    return remove
}
export const CreatemyEducation = async (body) => {
    const create = await axios.post(Services.createMyEducationUrl, body)
    return create
}
export const EditmyEducationDetails = async (body) => {
    const edit = await axios.post(Services.EditMyEducationUrl, body)
    return edit
}
export const FilterAllCompany = async (body) => {
    const company = await axios.post(Services.filterAllCompaniesUrl, body)
    return company
}
export const AddMyExperience = async (body) => {
    const exp = await axios.post(Services.CreateExperienceUrl, body)
    return exp
}

//my network
export const AllFollowersuser = async (body) => {
    const follower = await axios.post(Services.allFollowersUserUrl, body)
    return follower
}
export const AllFollowinguser = async (body) => {
    const following = await axios.post(Services.allFollowingUserUrl, body)
    return following
}

export const SelectedUserInfo = async (body) => {
    const selectUser = await axios.post(Services.selectedUserinfoUrl, body)
    return selectUser
}
export const SelectedUserRegularAllPost = async (body) => {
    const selectUserPost = await axios.post(Services.selectedUserPostUrl, body)
    return selectUserPost
}
export const SelectedUserFollowings = async (body) => {
    const selectUser = await axios.post(Services.selectedUserFollowing, body)
    return selectUser
}
export const SelectedUserFollowers = async (body) => {
    const selectUser = await axios.post(Services.selectedUserFollowers, body)
    return selectUser
}
export const UnFollow = async (body) => {
    const unfollow = await axios.post(Services.unFollowUrl, body)
    return unfollow
}
export const FollowUser = async (body) => {
    const follow = await axios.post(Services.FollowUserUrl, body)
    return follow
}
export const BlockUser = async (body) => {
    const block = await axios.post(Services.blockUserUrl, body)
    return block
}
export const SelectedUserPublication = async (body) => {
    const pub = await axios.post(Services.fillterUserPublicationUrl, body)
    return pub
}
export const SelectedUserInformation = async (body) => {
    const user = await axios.post(Services.selectedUserInfoUrl, body)
    return user
}
export const SelectedUserEducations = async (body) => {
    const edu = await axios.post(Services.selectedUserEducationUrl, body)
    return edu
}
export const FetchAllSelectedUserRegularPosts = async (body) => {
    const post = await axios.post(Services.FetchAllSelectedUserRegularPostsUrl, body)
    return post
}
export const SelectedUserExperience = async (body) => {
    const exp = await axios.post(Services.selectedUserExperienceUrl, body)
    return exp
}
//user post
export const FetchAllHomeForYouRegularPost = async (body) => {
    const allhomePost = await axios.post(Services.FetchAllHomeForYouRegularPosts, body)
    return allhomePost
}
export const FetchAllHomeTrendingRegularPosts = async (body) => {
    const alltrendPost = await axios.post(Services.FetchAllHomeTrendingRegularPostsUrl, body)
    return alltrendPost
}
export const FilterAllCreatedRegualarPosts = async (body) => {
    const allPost = await axios.post(Services.Filter_All_Created_Regualar_PostsUrl, body)
    return allPost
}
export const CreateRegularPost=async (body)=>{
    const post=await axios.post(Services.CreateRegularPostUrl,body)
    return post
}
export const ShareInnerRegularPost=async (body)=>{
    const share=await axios.post(Services.InnerShareRegularPostUrl,body)
    return share
}
export const EditRegularPosts=async (body)=>{
    const edit=await axios.post(Services.editRegularPostUrl,body)
    return edit
}
export const RemoveRegularPost=async (body)=>{
    const remove=await axios.post(Services.removeRegularPost,body)
    return remove
}
export const UploadPostVedio = async (body) => {
    const uploadVedio = await axios.post(Services.uploadVedioUrl, body)
    return uploadVedio
}
export const UploadPostGif = async (body) => {
    const postGif = await axios.post(Services.uploadGifImgUrl, body)
    return postGif
}
export const GiveLikePost = async (body) => {
    const like = await axios.post(Services.giveLikeToPostUrl, body)
    return like
}
export const RemoveLikePost = async (body) => {
    const remove = await axios.post(Services.removeLikeFromPostUrl, body)
    return remove
}
export const AddPostComment = async (body) => {
    const commet = await axios.post(Services.AddPostCommentUrl, body)
    return commet
}
export const EditPostComments = async (body) => {
    const edit = await axios.post(Services.editPostCommentUrl, body)
    return edit
}
export const FilterAllComment = async (body) => {
    const showcomment = await axios.post(Services.filterAllCommentUrl, body)
    return showcomment
}

export const DeleteComments = async (body) => {
    const del = await axios.post(Services.deletePostComemtUrl, body)
    return del
}
export const SavePost = async (body) => {
    const save = await axios.post(Services.savePostUrl, body)
    return save
}
export const UnSavePost = async (body) => {
    const unsave = await axios.post(Services.unSavePostUrl, body)
    return unsave
}
export const filterAllRegularSavePost = async (body) => {
    const save = await axios.post(Services.FilterAllRegularSavedPostsUrl, body)
    return save
}
export const FilterAllTrendingUsers = async (body) => {
    const user = await axios.post(Services.FilterAllTrendingUsers, body)
    return user
}
export const FilterAllTrendingReviewers = async (body) => {
    const reviewer = await axios.post(Services.FilterAllTrendingReviewers, body)
    return reviewer
}
export const FetchRegularPostCompleteInfo = async (body) => {
    const save = await axios.post(Services.FetchRegularPostCompleteInfoUrl, body)
    return save
}
export const FetchRegularPostBasicInfo = async (body) => {
    const post = await axios.post(Services.FetchRegularPostBasicInfoUrl, body)
    return post
}
export const filterAllReport = async (body) => {
    const report = await axios.post(Services.filterAllReportUrl, body)
    return report
}
export const filterAllUserReport = async (body) => {
    const UserReport = await axios.post(Services.fetchAllUserReportUrl, body)
    return UserReport
}
export const ReportPost = async (body) => {
    const report = await axios.post(Services.reportOnPostUrl, body)
    return report
}
export const ReportUserProfile = async (body) => {
    const report = await axios.post(Services.reportOnUserUrl, body)
    return report
}
//my research 
export const FilterAllReviwer = async (body) => {
    const reviewer = await axios.post(Services.myResearchReviewerUrl, body)
    return reviewer
}
export const SendReviewRequest = async (body) => {
    const send = await axios.post(Services.sendReviewRequestUrl, body)
    return send
}
export const MyResearchDetails = async (body) => {
    const details = await axios.post(Services.myResearchDetailsUrl, body)
    return details
}
export const CretaeMyResearch = async (body) => {
    const create = await axios.post(Services.cretaeMyResearchUrl, body)
    return create
}
export const EditMyResearch = async (body) => {
    const edit = await axios.post(Services.EditPublicationUrl, body)
    return edit
}
export const RemoveMyResearch = async (body) => {
    const del = await axios.post(Services.removeMyResearchUrl, body)
    return del
}
export const Uploadocument = async (body) => {
    const doc = await axios.post(Services.uploadDocUrl, body)
    return doc
}
//menu review request
export const FilterAllReceivedReviewRequests = async (body) => {
    const request = await axios.post(Services.FilterAllReceivedReviewRequestsUrl, body)
    return request
}
export const MySendReviewRequests = async (body) => {
    const request = await axios.post(Services.FiltersendReviewRequestsUrl, body)
    return request
}
export const ReviewRequestsDetail = async (body) => {
    const request = await axios.post(Services.fetchReviewRequestDetailsUrl, body)
    return request
}
export const SendQoutes = async (body) => {
    const quote = await axios.post(Services.sendQuotesUrl, body)
    return quote
}
export const AcceptQoutesRequest = async (body) => {
    const accept = await axios.post(Services.acceptQoutUrl, body)
    return accept
}
export const RejectQoutesRequest = async (body) => {
    const reject = await axios.post(Services.rejectQoutUrl, body)
    return reject
}
export const ReviewPublicationSuccessfully = async (body) => {
    const success = await axios.post(Services.ReviewPublicationSuccessfullyUrl, body)
    return success
}
export const PublishPaper= async (body) => {
    const publish = await axios.post(Services.PublishPaperUrl, body)
    return publish
}
//searcing
export const SearchAllUsers= async (body) => {
    const search = await axios.post(Services.SearchAllUsersUrl, body)
    return search
}
export const SearchOnlyUsers= async (body) => {
    const search = await axios.post(Services.SearchOnlyUsersUrl, body)
    return search
}
export const SearchPosts= async (body) => {
    const search = await axios.post(Services.SearchPostUrl, body)
    return search
}
export const SearchReviewerUsers= async (body) => {
    const search = await axios.post(Services.SearchOnlyReviewersUrl, body)
    return search
}
//block user
export const FetchAllBlockedUser= async (body) => {
    const block = await axios.post(Services.FetchAllBlockedUserUrl, body)
    return block
}
export const UnBlockUser= async (body) => {
    const block = await axios.post(Services.UnBlockUserUrl, body)
    return block
}

//event section
export const FilterAllEvent= async (body) => {
    const event = await axios.post(Services.FilterAllEventsUrl, body)
    return event
}
export const FilterMyEvent= async (body) => {
    const event = await axios.post(Services.FilterMyEventsUrl, body)
    return event
}
export const FetchEventCompleteData= async (body) => {
    const event = await axios.post(Services.FetchEventCompleteInfoUrl, body)
    return event
}
export const RemoveEvent= async (body) => {
    const event = await axios.post(Services.RemoveEventUrl, body)
    return event
}
export const CancelEvent= async (body) => {
    const event = await axios.post(Services.CancelEventUrl, body)
    return event
}
export const CreateEvents= async (body) => {
    const event = await axios.post(Services.CreateEventUrl, body)
    return event
}
export const EditEvents= async (body) => {
    const event = await axios.post(Services.EditEventUrl, body)
    return event
}
export const BookEvents= async (body) => {
    const event = await axios.post(Services.BookEventUrl, body)
    return event
}
export const FilterAllEventJoinees= async (body) => {
    const event = await axios.post(Services.FilterAllEventJoineesUrl, body)
    return event
}
export const FetchEventBookingInformation= async (body) => {
    const event = await axios.post(Services.FetchEventBookingInformationUrl, body)
    return event
}
export const FilterAllMyBookedEvent= async (body) => {
    const event = await axios.post(Services.FilterAllMyBookedEventUrl, body)
    return event
}

export const CancelEventBooking= async (body) => {
    const event = await axios.post(Services.CancelEventBookingUrl, body)
    return event
}

//chats section
export const CreateFetchIndividualChatroom= async (body) => {
    const chat = await axios.post(Services.CreateFetchIndividualChatroomUrl, body)
    return chat
}
export const FilterAllChatroom= async (body) => {
    const chatroom = await axios.post(Services.FilterAllChatroomUrl, body)
    return chatroom
}
export const FilterAllNewChatroomRequest= async (body) => {
    const chatroom = await axios.post(Services.FilterAllNewChatroomRequestUrl, body)
    return chatroom
}
export const ApproveChatRequest= async (body) => {
    const accept = await axios.post(Services.ApproveChatRequestUrl, body)
    return accept
}
export const SearchAllChatroomList= async (body) => {
    const search = await axios.post(Services.SearchAllChatroomsUrl, body)
    return search
}
export const FilterAllChatroomChat= async (body) => {
    const chats = await axios.post(Services.FilterAllChatroomChatUrl, body)
    return chats
}
export const ChatroomPostChat= async (body) => {
    const chats = await axios.post(Services.ChatroomPostChatUrl, body)
    return chats
}
export const RemoveOneChatPostSelf= async (body) => {
    const remove = await axios.post(Services.RemoveOneChatPostSelfUrl, body)
    return remove
}
export const RemoveSelfChatPostforAll= async (body) => {
    const remove = await axios.post(Services.RemoveSelfChatPostforAllUrl, body)
    return remove
}
export const RemoveAllChatPostSelf= async (body) => {
    const removeAll = await axios.post(Services.RemoveAllChatPostSelfUrl, body)
    return removeAll
}
export const MuteChatroom= async (body) => {
    const mute = await axios.post(Services.MuteChatroomUrl, body)
    return mute
}
export const UnmuteChatroomUrl= async (body) => {
    const Unmute = await axios.post(Services.UnmuteChatroomUrl, body)
    return Unmute
}
export const RemoveChatrooms= async (body) => {
    const remove = await axios.post(Services.RemoveChatroomUrl, body)
    return remove
}
export const RejectChatRequest= async (body) => {
    const remove = await axios.post(Services.RejectChatRequestUrl, body)
    return remove
}
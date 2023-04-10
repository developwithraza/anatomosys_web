import { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import LoginPage from './authentication/LoginPage';
import SignUpPage from './authentication/SignUpPage';
import MainContent from './component/mainContent/MainContent';
import ContentPreference from './pages/preference/ContentPreference';
import ProfileDetails from './pages/profile/ProfileDetails';
import Event from './pages/event/Event'
import EventDetails from './pages/event/EventDetails'
import MessagingPage from './pages/messaging/MessagingPage'
import MyNetwork from './pages/myNetwork/MyNetwork'
import Notifications from './pages/notification/Notifications'
import ResearchPage from './pages/research/ResearchPage'
import ViewProfile from './pages/profile/ViewProfile'
import QuoteListReviewer from './pages/reviewRequest/QuoteListReviewer'
import QuoteRequestList from './pages/reviewRequest/QuoteRequestList'
import StatusQuoteReview from './pages/reviewRequest/StatusQuoteReview'
import ViewQuoteList from './pages/reviewRequest/ViewQuoteList'

import ReviewRequestSend from './pages/research/ReviewRequestSend'
import ReviewRequest from './pages/reviewRequest/ReviewRequest'
import Navbar from './component/navbar/Navbar';
import { Scrollbar } from 'react-scrollbars-custom';
import { useUserAuth } from './context/AuthUserContect';
import SelectedFollowingUser from './pages/myNetwork/myFollowing/SelectedFollowingUser';
import SelectedFollowersUser from './pages/myNetwork/myFollowers/SelectedFollowersUser';
import SelectedUserOfFollowing from './pages/myNetwork/SelectedUserOfFollowing';
import SelectedUserOfFollowers from './pages/myNetwork/SelectedUserOfFollowers';
import SaveRegularPostList from './component/feed/SaveRegularPostList';
import ReviewRequestDetails from './pages/research/ReviewRequestDetails';
import SelectedUserAllResearchView from './pages/myNetwork/SelectedUserAllResearchView';
import SendMyReviewRequestList from './pages/research/SendMyReviewRequestList';
import ViewAllMyPost from './pages/profile/ViewAllMyPost';
import SelectedUserRegularPost from './pages/myNetwork/myFollowing/SelectedUserRegularPost';
import RequestForReview from './pages/profile/RequestForReview';
import ProfessionDetails from './pages/profile/ProfessionDetails';
import BlockLists from './pages/blockList/BlockLists';
import NotFound from './pages/notFound/NotFound';
import ProtectedRoute from './authentication/ProtectRoute';
import SendReviewDetials from './pages/reviewRequest/SendReviewDetials';
import PublicationDetails from './pages/research/PublicationDetails';
import EventMyDetails from './pages/event/EventMyDetails';
import EventJoineeList from './pages/event/EventJoineeList';
import EventBookDetails from './pages/event/EventBookDetails';
import PostComplateInfo from './component/feed/PostComplateInfo';
import { useSelector } from 'react-redux';
import AddMyResearchPublication from './pages/research/AddMyResearchPublication';
import EditReserchPublication from './pages/research/EditReserchPublication';


function App() {
  let location = useLocation();
  const { user, isLogged } = useUserAuth()
  const getUSerData = useSelector((state) => state.LoginReducer.auth_user)


  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }

    return children
  };

  return (
    <>
      {/* <Scrollbar style={{ width: '100%', height: '100vh', padding: '0', margin: '0' }}> */}
      
      <div className="App">
        {user && 
          <div className="container-flude navbar_section">
            <Navbar />
          </div>
        }

        <Routes>
          <Route path="/" element={<Navigate to="/login_page" />} />
          <Route path='/login_page' element={<LoginPage />} />
          <Route path='/signup_page' element={<SignUpPage />} />
          <Route path='/preference' element={<ContentPreference />} />
          <Route path='/Profile_details' element={<ProfileDetails />} />
          <Route path='/profession_details' element={<ProfessionDetails />} />
          {/* <Route path='/main' element={<MainContent />} /> */}
          <Route path='/main' element={<ProtectedRoute ><MainContent /></ProtectedRoute>} />
          <Route path='/view_profile' element={<ViewProfile />} />
          <Route path='/blocked_user' element={<BlockLists />} />
          <Route path='/event_page' element={<Event />} />
          <Route path='/event_details/:id' element={<EventDetails />} />
          <Route path='/my_event_details/:id' element={<EventMyDetails />} />
          <Route path='/event_joinee_list/:id' element={<EventJoineeList />} />
          <Route path='/event_book_details/:id' element={<EventBookDetails />} />
          <Route path='/review_request_send/:id' element={<ReviewRequestSend />} />
          <Route path='/all_research' element={<ResearchPage />} />
          <Route path='/add_my_research' element={<AddMyResearchPublication />} />
          <Route path='/edit_my_research/:id' element={<EditReserchPublication />} />
          <Route path='/publish_details/:id' element={<PublicationDetails />} />
          <Route path='/messingin_page' element={<MessagingPage />} />
          <Route path='/notification' element={<Notifications />} />
          <Route path='/review_request_details/:id' element={<ReviewRequestDetails />} />
          <Route path='/review_request' element={<ReviewRequest />} />
          <Route path='/request_for_review' element={<RequestForReview />} />
          <Route path='/send_review_reviewer_list/:id' element={<SendMyReviewRequestList />} />
          <Route path='/send_review_details/:id' element={<SendReviewDetials />} />

          <Route path='/quote_request' element={<QuoteRequestList />} />
          <Route path='/view_qoute_request' element={<ViewQuoteList />} />
          <Route path='/status_quote_review' element={<StatusQuoteReview />} />
          <Route path='/quote_reviewer_list' element={<QuoteListReviewer />} />
          <Route path='/Send_Review_Detials/:id' element={<SendReviewDetials />} />
          <Route path='/my_network' element={<MyNetwork />} />
          <Route path='/save_regular_post' element={<SaveRegularPostList />} />
          <Route path='/post_complete_Info/:id' element={<PostComplateInfo />} />
          <Route path='/view_all_my_post' element={<ViewAllMyPost />} />

          <Route path='/select_following_user/:id' element={<SelectedFollowingUser />} />
          <Route path='/select_followers_user/:id' element={<SelectedFollowersUser />} />
          <Route path='/select_user_regular_post/:id' element={<SelectedUserRegularPost />} />
          <Route path='/selected_user_of_following/:id' element={<SelectedUserOfFollowing />} />
          <Route path='/selected_user_of_followers/:id' element={<SelectedUserOfFollowers />} />
          <Route path='/selected_user_research_all_view/:id' element={<SelectedUserAllResearchView />} />


          <Route path='*' element={<NotFound />} />
        </Routes>

      </div>
      {/* </Scrollbar> */}

    </>

  );
}

export default App;
